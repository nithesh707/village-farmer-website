export interface ProductVariant {
  label: string; // e.g. "100g Pack", "250g Jar", "500g Value Pack" or "1 kg", "2 kg", "5 kg Crate"
  price: number;
  mrp?: number;
}

export type ProductCategory = 'Homemade Podis' | 'Today\'s Cut Vegetables';

export interface FarmProduct {
  id: string;
  name: string;
  teluguName: string;
  category: ProductCategory;
  description: string;
  processType: 'Stone-Pounded' | 'Dawn Harvested' | 'Clay-Roasted';
  cutTiming?: string; // e.g. "5:15 AM Today" - TIMINGS OF VEGETABLE CUT
  cutBatch?: string; // e.g. "Morning Dew Cut Batch"
  spiceLevel?: 'Mild' | 'Medium' | 'Fiery';
  shelfLife?: string;
  variants: ProductVariant[];
  image: string;
  isAvailable: boolean; // ADMIN ON/OFF SWITCH
  stockLeft: number; // REMAINING STOCK FOR INDIVIDUAL PRODUCT
  totalBatchStock: number;
  unit: 'kg' | 'packs';
  ingredients?: string[];
  benefits?: string[];
  pairsWith?: string;
  featured?: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  teluguName?: string;
  category: ProductCategory;
  selectedVariant: string;
  unitPrice: number;
  quantity: number;
  image: string;
  stockLeft: number;
}

export type OrderStatus =
  | 'New Order'
  | 'Confirmed'
  | 'Preparing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  teluguName?: string;
  category: ProductCategory;
  selectedVariant: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  image: string;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharges: number;
  totalAmount: number;
  paymentMethod: 'cod' | 'razorpay';
  paymentStatus: 'paid' | 'pending_cod';
  paymentId?: string;
  orderStatus: OrderStatus;
  createdAt: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'customer';
  address?: string;
  city?: string;
  pincode?: string;
}

export interface DashboardStats {
  totalOrders: number;
  todayOrders: number;
  totalSales: number;
  pendingOrders: number;
  totalProducts: number;
  activeInStockProducts: number;
  outOfStockProducts: number;
  lowStockCount: number;
}
