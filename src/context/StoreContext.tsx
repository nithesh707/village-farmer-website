import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  FarmProduct,
  CustomerOrder,
  CartItem,
  UserAccount,
  DashboardStats,
  OrderStatus,
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/initialData';

interface StoreContextType {
  products: FarmProduct[];
  orders: CustomerOrder[];
  cart: CartItem[];
  currentUser: UserAccount | null;
  stats: DashboardStats;
  isLoading: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeView: 'store' | 'admin' | 'customer-portal' | 'tracking';
  setActiveView: (view: 'store' | 'admin' | 'customer-portal' | 'tracking') => void;
  selectedProductForDetail: FarmProduct | null;
  setSelectedProductForDetail: (product: FarmProduct | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authDefaultTab: 'admin' | 'customer';
  setAuthDefaultTab: (tab: 'admin' | 'customer') => void;
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Cart actions
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => { success: boolean; message?: string };
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryCharges: number;
  cartTotal: number;
  cartItemsCount: number;

  // Order actions
  placeOrder: (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    city: string;
    state?: string;
    pincode: string;
    orderNotes?: string;
    paymentMethod: 'cod' | 'razorpay';
  }) => Promise<{ success: boolean; order?: CustomerOrder; message?: string }>;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => Promise<boolean>;

  // CRITICAL ADMIN ON / OFF TOGGLE & PRODUCT ACTIONS
  toggleProductStock: (productId: string) => Promise<boolean>;
  updateProduct: (id: string, updates: Partial<FarmProduct>) => Promise<boolean>;
  addProduct: (product: Omit<FarmProduct, 'id'>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;

  // Auth actions
  login: (email: string, password: string, role: 'admin' | 'customer') => Promise<{ success: boolean; message?: string }>;
  signup: (userData: Partial<UserAccount> & { password?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  resetDemoData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS = 'village_farmer_products_v3';
const LOCAL_STORAGE_ORDERS = 'village_farmer_orders_v3';
const LOCAL_STORAGE_CART = 'village_farmer_cart_v3';
const LOCAL_STORAGE_USER = 'village_farmer_user_v3';
const LOCAL_STORAGE_THEME = 'village_farmer_theme_v3';

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_THEME, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('Failed saving theme', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [products, setProducts] = useState<FarmProduct[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'store' | 'admin' | 'customer-portal' | 'tracking'>('store');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<FarmProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'admin' | 'customer'>('admin');
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Failed saving products to local storage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed saving orders to local storage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed saving cart to local storage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER);
      }
    } catch (e) {
      console.warn('Failed saving user to local storage', e);
    }
  }, [currentUser]);

  // Initial fetch from backend if available
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [prodRes, ordersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.data && prodData.data.length > 0) {
            setProducts(prodData.data);
          }
        }
        if (ordersRes.ok) {
          const ordData = await ordersRes.json();
          if (ordData.data && ordData.data.length > 0) {
            setOrders(ordData.data);
          }
        }
      } catch (err) {
        console.log('Client-side storage active', err);
      }
    };
    fetchBackendData();
  }, []);

  // Cart computations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryCharges = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 40;
  const cartTotal = cartSubtotal + deliveryCharges;
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Cart actions
  const addToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    // Check if product is available (On/Off check and stock check)
    const product = products.find((p) => p.id === item.productId);
    if (!product || !product.isAvailable || product.stockLeft <= 0) {
      return {
        success: false,
        message: `Sorry! "${item.name}" has been marked Out of Stock by the farmer.`,
      };
    }

    const cartItemId = `${item.productId}-${item.selectedVariant}`;

    setCart((prev) => {
      const idx = prev.findIndex((c) => c.cartItemId === cartItemId);
      if (idx > -1) {
        const updated = [...prev];
        const newQty = updated[idx].quantity + item.quantity;
        if (newQty > product.stockLeft) {
          // Cap at stockLeft
          updated[idx] = { ...updated[idx], quantity: product.stockLeft };
        } else {
          updated[idx] = { ...updated[idx], quantity: newQty };
        }
        return updated;
      } else {
        return [...prev, { ...item, cartItemId }];
      }
    });

    return { success: true };
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const product = products.find((p) => p.id === item.productId);
            const maxAllowed = product ? product.stockLeft : 99;
            const newQty = item.quantity + delta;
            if (newQty > maxAllowed) return item;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Place order
  const placeOrder = async (orderData: {
    customerName: string;
    phone: string;
    email?: string;
    deliveryAddress: string;
    city: string;
    state?: string;
    pincode: string;
    orderNotes?: string;
    paymentMethod: 'cod' | 'razorpay';
  }): Promise<{ success: boolean; order?: CustomerOrder; message?: string }> => {
    if (cart.length === 0) {
      return { success: false, message: 'Your shopping basket is empty.' };
    }

    // Verify all cart items are currently available (Admin ON) and in stock
    for (const item of cart) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod && (!prod.isAvailable || prod.stockLeft <= 0)) {
        return {
          success: false,
          message: `"${prod.name}" is currently Out of Stock. Please remove it from your basket to proceed.`,
        };
      }
    }

    const orderPayload = {
      customerName: orderData.customerName,
      phone: orderData.phone,
      email: orderData.email || '',
      deliveryAddress: orderData.deliveryAddress,
      city: orderData.city,
      state: orderData.state || 'Andhra Pradesh',
      pincode: orderData.pincode,
      orderNotes: orderData.orderNotes || '',
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        teluguName: item.teluguName,
        category: item.category,
        selectedVariant: item.selectedVariant,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        subtotal: item.unitPrice * item.quantity,
        image: item.image,
      })),
      subtotal: cartSubtotal,
      deliveryCharges,
      totalAmount: cartTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'razorpay' ? ('paid' as const) : ('pending_cod' as const),
      paymentId: orderData.paymentMethod === 'razorpay' ? `pay_RZP${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const result = await res.json();
        const createdOrder: CustomerOrder = result.data;
        setOrders((prev) => [createdOrder, ...prev]);

        // Deduct stockLeft locally
        setProducts((prev) =>
          prev.map((prod) => {
            const inOrder = cart.find((c) => c.productId === prod.id);
            if (inOrder) {
              const newStock = Math.max(0, prod.stockLeft - inOrder.quantity);
              return {
                ...prod,
                stockLeft: newStock,
                isAvailable: newStock > 0 ? prod.isAvailable : false,
              };
            }
            return prod;
          })
        );

        clearCart();
        return { success: true, order: createdOrder };
      }
    } catch {
      // Fallback
    }

    const fallbackId = `VF-2026-${1043 + orders.length}`;
    const newOrder: CustomerOrder = {
      ...orderPayload,
      id: fallbackId,
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

    setOrders((prev) => [newOrder, ...prev]);
    setProducts((prev) =>
      prev.map((prod) => {
        const inOrder = cart.find((c) => c.productId === prod.id);
        if (inOrder) {
          const newStock = Math.max(0, prod.stockLeft - inOrder.quantity);
          return {
            ...prod,
            stockLeft: newStock,
            isAvailable: newStock > 0 ? prod.isAvailable : false,
          };
        }
        return prod;
      })
    );
    clearCart();
    return { success: true, order: newOrder };
  };

  // Order status update (Farmer Admin)
  const updateOrderStatus = async (orderId: string, status: OrderStatus, note?: string): Promise<boolean> => {
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note }),
      });
    } catch {
      // silent
    }

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const history = order.statusHistory || [];
          return {
            ...order,
            orderStatus: status,
            statusHistory: [
              ...history,
              {
                status,
                timestamp: new Date().toISOString(),
                note: note || `Status updated to ${status} by Village Farmer admin`,
              },
            ],
          };
        }
        return order;
      })
    );
    return true;
  };

  // ==========================================
  // CRITICAL ADMIN ON / OFF TOGGLE FOR STOCK
  // ==========================================
  const toggleProductStock = async (productId: string): Promise<boolean> => {
    try {
      await fetch(`/api/products/${productId}/toggle-stock`, { method: 'PATCH' });
    } catch {
      // silent
    }

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextAvailability = !p.isAvailable;
          const updatedStock = nextAvailability && p.stockLeft <= 0 ? 20 : p.stockLeft;
          return {
            ...p,
            isAvailable: nextAvailability,
            stockLeft: updatedStock,
          };
        }
        return p;
      })
    );
    return true;
  };

  const updateProduct = async (id: string, updates: Partial<FarmProduct>): Promise<boolean> => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch {
      // silent
    }

    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    return true;
  };

  const addProduct = async (product: Omit<FarmProduct, 'id'>): Promise<boolean> => {
    const id = `prod-${Date.now()}`;
    const newProd: FarmProduct = {
      ...product,
      id,
      stockLeft: product.stockLeft !== undefined ? product.stockLeft : 25,
      totalBatchStock: product.totalBatchStock || 50,
      unit: product.unit || (product.category === "Today's Cut Vegetables" ? 'kg' : 'packs'),
    };

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd),
      });
    } catch {
      // silent
    }

    setProducts((prev) => [newProd, ...prev]);
    return true;
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch {
      // silent
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  // Authentication
  const login = async (
    email: string,
    password: string,
    role: 'admin' | 'customer'
  ): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setIsLoading(false);
        setIsAuthOpen(false);
        if (role === 'admin') {
          setActiveView('admin');
        } else {
          setActiveView('customer-portal');
        }
        return { success: true };
      } else {
        const error = await res.json();
        setIsLoading(false);
        return { success: false, message: error.message || 'Login failed' };
      }
    } catch {
      setIsLoading(false);
      // Local fallback
      if (role === 'admin') {
        const adminUser: UserAccount = {
          id: 'admin-village-farmer-1',
          name: 'Village Farmer Admin (Ravela Village, Guntur)',
          email: 'admin@villagefarmer.in',
          phone: '+91 98480 22338',
          role: 'admin',
        };
        setCurrentUser(adminUser);
        setIsAuthOpen(false);
        setActiveView('admin');
        return { success: true };
      } else {
        const customerUser: UserAccount = {
          id: `cust-${Date.now()}`,
          name: email.split('@')[0] || 'Valued Customer',
          email,
          phone: '+91 94401 82910',
          role: 'customer',
          address: 'Flat 402, Sai Teja Residency, Brodipet',
          city: 'Guntur',
          pincode: '522002',
        };
        setCurrentUser(customerUser);
        setIsAuthOpen(false);
        setActiveView('customer-portal');
        return { success: true };
      }
    }
  };

  const signup = async (userData: Partial<UserAccount> & { password?: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        setIsLoading(false);
        setIsAuthOpen(false);
        setActiveView('customer-portal');
        return { success: true };
      }
    } catch {
      // silent
    }
    const customerUser: UserAccount = {
      id: `cust-${Date.now()}`,
      name: userData.name || 'Valued Customer',
      email: userData.email || 'customer@villagefarmer.in',
      phone: userData.phone || '+91 94401 82910',
      role: 'customer',
      address: userData.address || '',
      city: userData.city || 'Guntur',
      pincode: userData.pincode || '522002',
    };
    setCurrentUser(customerUser);
    setIsLoading(false);
    setIsAuthOpen(false);
    setActiveView('customer-portal');
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('store');
  };

  const resetDemoData = async () => {
    try {
      await fetch('/api/reset-demo', { method: 'POST' });
    } catch {
      // silent
    }
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
  };

  // Dashboard calculations
  const totalOrders = orders.length;
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayOrders = orders.filter((o) => o.createdAt.startsWith(todayStr)).length;
  const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) =>
    ['New Order', 'Confirmed', 'Preparing'].includes(o.orderStatus)
  ).length;
  const totalProducts = products.length;
  const activeInStockProducts = products.filter((p) => p.isAvailable && p.stockLeft > 0).length;
  const outOfStockProducts = products.filter((p) => !p.isAvailable || p.stockLeft <= 0).length;
  const lowStockCount = products.filter((p) => p.isAvailable && p.stockLeft > 0 && p.stockLeft < 10).length;

  const stats: DashboardStats = {
    totalOrders,
    todayOrders,
    totalSales,
    pendingOrders,
    totalProducts,
    activeInStockProducts,
    outOfStockProducts,
    lowStockCount,
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        currentUser,
        stats,
        isLoading,
        theme,
        toggleTheme,
        activeView,
        setActiveView,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        authDefaultTab,
        setAuthDefaultTab,
        isTrackingOpen,
        setIsTrackingOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        deliveryCharges,
        cartTotal,
        cartItemsCount,
        placeOrder,
        updateOrderStatus,
        toggleProductStock,
        updateProduct,
        addProduct,
        deleteProduct,
        login,
        signup,
        logout,
        resetDemoData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
