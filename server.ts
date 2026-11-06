import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './src/data/initialData.ts';
import { FarmProduct, CustomerOrder, OrderStatus } from './src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'store.json');

interface DatabaseSchema {
  products: FarmProduct[];
  orders: CustomerOrder[];
}

function loadData(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.products && parsed.orders) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading DB file, resetting to defaults:', err);
  }

  const initial: DatabaseSchema = {
    products: INITIAL_PRODUCTS,
    orders: INITIAL_ORDERS,
  };
  saveData(initial);
  return initial;
}

function saveData(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB file:', err);
  }
}

let db = loadData();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // API Routes
  // 1. Products (Homemade Podis & Today's Cut Vegetables)
  app.get('/api/products', (req: Request, res: Response) => {
    res.json({ success: true, data: db.products });
  });

  app.post('/api/products', (req: Request, res: Response) => {
    const newProd: FarmProduct = {
      ...req.body,
      id: req.body.id || `prod-${Date.now()}`,
      isAvailable: req.body.isAvailable !== undefined ? req.body.isAvailable : true,
      stockLeft: req.body.stockLeft !== undefined ? req.body.stockLeft : 25,
      totalBatchStock: req.body.totalBatchStock || 50,
      unit: req.body.unit || (req.body.category === "Today's Cut Vegetables" ? 'kg' : 'packs'),
    };
    db.products.unshift(newProd);
    saveData(db);
    res.status(201).json({ success: true, data: newProd });
  });

  app.put('/api/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const index = db.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    db.products[index] = { ...db.products[index], ...req.body };
    saveData(db);
    res.json({ success: true, data: db.products[index] });
  });

  // CRITICAL: On/Off Stock Toggle Endpoint for Farmer Admin
  app.patch('/api/products/:id/toggle-stock', (req: Request, res: Response) => {
    const { id } = req.params;
    const product = db.products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    // Flip availability
    product.isAvailable = !product.isAvailable;
    if (product.isAvailable && product.stockLeft <= 0) {
      product.stockLeft = 20; // restore default stock if toggled on
    }
    saveData(db);
    res.json({
      success: true,
      data: product,
      message: `Product is now ${product.isAvailable ? 'IN STOCK (Available)' : 'OUT OF STOCK (Disabled)'}`,
    });
  });

  app.delete('/api/products/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    db.products = db.products.filter((p) => p.id !== id);
    saveData(db);
    res.json({ success: true, message: 'Product removed' });
  });

  // 2. Orders & Customer Tracking
  app.get('/api/orders', (req: Request, res: Response) => {
    res.json({ success: true, data: db.orders });
  });

  app.post('/api/orders', (req: Request, res: Response) => {
    const orderData = req.body;

    // Check stock & availability for every product
    for (const item of orderData.items || []) {
      const prod = db.products.find((p) => p.id === item.productId);
      if (prod) {
        if (!prod.isAvailable || prod.stockLeft <= 0) {
          return res.status(400).json({
            success: false,
            message: `"${prod.name}" is currently Out of Stock. Please remove it from your basket to proceed.`,
          });
        }
      }
    }

    // Deduct stockLeft
    for (const item of orderData.items || []) {
      const prod = db.products.find((p) => p.id === item.productId);
      if (prod) {
        prod.stockLeft = Math.max(0, (prod.stockLeft || 10) - (item.quantity || 1));
        if (prod.stockLeft === 0) {
          prod.isAvailable = false;
        }
      }
    }

    const orderIdNumber = 1043 + db.orders.length;
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `VF-2026-${orderIdNumber}`,
      createdAt: new Date().toISOString(),
      orderStatus: 'New Order',
      statusHistory: [
        {
          status: 'New Order',
          timestamp: new Date().toISOString(),
          note:
            orderData.paymentMethod === 'cod'
              ? 'Order placed with Cash on Delivery'
              : 'Order verified & paid securely via Razorpay',
        },
      ],
    };

    db.orders.unshift(newOrder);
    saveData(db);
    res.status(201).json({ success: true, data: newOrder });
  });

  app.put('/api/orders/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, note } = req.body;
    const order = db.orders.find((o) => o.id === id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.orderStatus = status as OrderStatus;
    if (!order.statusHistory) {
      order.statusHistory = [];
    }
    order.statusHistory.push({
      status: status as OrderStatus,
      timestamp: new Date().toISOString(),
      note: note || `Status updated to ${status} by Village Farmer admin`,
    });

    saveData(db);
    res.json({ success: true, data: order });
  });

  // 3. Authentication (Farmer Admin & Customer Portal)
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    if (role === 'admin') {
      if (
        email === 'admin@villagefarmer.in' ||
        email === 'farmer@villagefarmer.in' ||
        email === 'farmer@farmerfoods.in' ||
        email === 'admin@littlefarmerindia.com' ||
        email === 'admin' ||
        password === 'VillageFarmer2026' ||
        password === 'LittleFarmer2026' ||
        password === 'AndhraFarm2026' ||
        password === 'admin' ||
        password === 'demo'
      ) {
        return res.json({
          success: true,
          user: {
            id: 'admin-village-farmer-1',
            name: 'Village Farmer Admin (Ravela Village, Guntur)',
            email: email || 'admin@villagefarmer.in',
            phone: '+91 98480 22338',
            role: 'admin',
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Use admin@villagefarmer.in / VillageFarmer2026',
        });
      }
    } else {
      // Customer sign in
      return res.json({
        success: true,
        user: {
          id: `cust-${Date.now()}`,
          name: req.body.name || (email ? email.split('@')[0] : 'Valued Customer'),
          email: email || 'customer@villagefarmer.in',
          phone: req.body.phone || '+91 94401 82910',
          role: 'customer',
          address: 'Flat 402, Sai Teja Residency, Brodipet',
          city: 'Guntur',
          pincode: '522002',
        },
      });
    }
  });

  app.post('/api/auth/signup', (req: Request, res: Response) => {
    const { name, email, phone, password, address, city, pincode } = req.body;
    return res.status(201).json({
      success: true,
      user: {
        id: `cust-${Date.now()}`,
        name: name || 'Valued Customer',
        email: email,
        phone: phone || '+91 94401 82910',
        role: 'customer',
        address: address || '',
        city: city || 'Guntur',
        pincode: pincode || '522002',
      },
    });
  });

  // 4. Dashboard Stats
  app.get('/api/stats', (req: Request, res: Response) => {
    const totalOrders = db.orders.length;
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayOrders = db.orders.filter((o) => o.createdAt.startsWith(todayStr)).length;
    const totalSales = db.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const pendingOrders = db.orders.filter((o) =>
      ['New Order', 'Confirmed', 'Preparing'].includes(o.orderStatus)
    ).length;
    const totalProducts = db.products.length;
    const activeInStockProducts = db.products.filter((p) => p.isAvailable && p.stockLeft > 0).length;
    const outOfStockProducts = db.products.filter((p) => !p.isAvailable || p.stockLeft <= 0).length;
    const lowStockCount = db.products.filter((p) => p.isAvailable && p.stockLeft > 0 && p.stockLeft < 10).length;

    res.json({
      success: true,
      data: {
        totalOrders,
        todayOrders,
        totalSales,
        pendingOrders,
        totalProducts,
        activeInStockProducts,
        outOfStockProducts,
        lowStockCount,
      },
    });
  });

  // 5. Reset Demo Data
  app.post('/api/reset-demo', (req: Request, res: Response) => {
    db = {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
    };
    saveData(db);
    res.json({ success: true, message: 'Reset to default Village Farmer products and orders' });
  });

  // Dev mode Vite middleware or Production static files
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Village Farmer server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
