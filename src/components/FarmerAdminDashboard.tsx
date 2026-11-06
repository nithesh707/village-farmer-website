import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FarmProduct, OrderStatus, ProductCategory } from '../types';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  Power,
  Plus,
  Trash2,
  Edit3,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  RefreshCw,
  LogOut,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Flame,
  Sparkles,
} from 'lucide-react';

export const FarmerAdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    stats,
    toggleProductStock,
    updateProduct,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    logout,
    resetDemoData,
    setActiveView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('products');
  const [orderFilter, setOrderFilter] = useState<string>('All');
  const [productCatFilter, setProductCatFilter] = useState<string>('All');

  // New Product Modal
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    teluguName: '',
    category: 'Homemade Podis' as ProductCategory,
    description: '',
    processType: 'Stone-Pounded' as FarmProduct['processType'],
    cutTiming: '',
    cutBatch: '',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80',
    variant1Label: '100g Pack',
    variant1Price: 95,
    variant2Label: '250g Jar',
    variant2Price: 220,
    stockLeft: 30,
    totalBatchStock: 50,
    unit: 'packs' as 'packs' | 'kg',
    isAvailable: true,
  });

  const categories = [
    'All',
    'Homemade Podis',
    "Today's Cut Vegetables",
  ];

  const filteredProducts = products.filter((p) => {
    if (productCatFilter === 'All') return true;
    return p.category === productCatFilter;
  });

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'All') return true;
    return o.orderStatus === orderFilter;
  });

  // Extract unique customers
  const customersList = orders.map((o) => ({
    name: o.customerName,
    phone: o.phone,
    email: o.email || 'N/A',
    address: `${o.deliveryAddress}, ${o.city}, ${o.state} - ${o.pincode}`,
    city: o.city,
    totalSpent: o.totalAmount,
    lastOrder: o.createdAt,
    orderId: o.id,
    orderStatus: o.orderStatus,
  }));

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const variants = [
      { label: productForm.variant1Label, price: Number(productForm.variant1Price) },
      { label: productForm.variant2Label, price: Number(productForm.variant2Price) },
    ];

    if (editingProductId) {
      await updateProduct(editingProductId, {
        name: productForm.name,
        teluguName: productForm.teluguName,
        category: productForm.category,
        description: productForm.description,
        processType: productForm.processType,
        cutTiming: productForm.cutTiming || undefined,
        cutBatch: productForm.cutBatch || undefined,
        image: productForm.image,
        variants,
        stockLeft: Number(productForm.stockLeft),
        totalBatchStock: Number(productForm.totalBatchStock),
        unit: productForm.unit,
        isAvailable: productForm.isAvailable,
      });
    } else {
      await addProduct({
        name: productForm.name,
        teluguName: productForm.teluguName || productForm.name,
        category: productForm.category,
        description: productForm.description,
        processType: productForm.processType,
        cutTiming: productForm.cutTiming || undefined,
        cutBatch: productForm.cutBatch || undefined,
        image: productForm.image,
        variants,
        stockLeft: Number(productForm.stockLeft),
        totalBatchStock: Number(productForm.totalBatchStock),
        unit: productForm.unit,
        isAvailable: productForm.isAvailable,
      });
    }
    setIsAddProductOpen(false);
    setEditingProductId(null);
  };

  const openEditModal = (p: FarmProduct) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      teluguName: p.teluguName,
      category: p.category,
      description: p.description,
      processType: p.processType,
      cutTiming: p.cutTiming || '',
      cutBatch: p.cutBatch || '',
      image: p.image,
      variant1Label: p.variants[0]?.label || '100g Pack',
      variant1Price: p.variants[0]?.price || 95,
      variant2Label: p.variants[1]?.label || '250g Jar',
      variant2Price: p.variants[1]?.price || 220,
      stockLeft: p.stockLeft,
      totalBatchStock: p.totalBatchStock || 50,
      unit: p.unit,
      isAvailable: p.isAvailable,
    });
    setIsAddProductOpen(true);
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      teluguName: '',
      category: 'Homemade Podis',
      processType: 'Stone-Pounded',
      description: '',
      cutTiming: '',
      cutBatch: '',
      image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80',
      variant1Label: '100g Pack',
      variant1Price: 95,
      variant2Label: '250g Jar',
      variant2Price: 220,
      stockLeft: 30,
      totalBatchStock: 50,
      unit: 'packs',
      isAvailable: true,
    });
    setIsAddProductOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7EF] dark:bg-[#121915] py-8 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Card */}
        <div className="bg-white dark:bg-[#1A261F] p-5 rounded-2xl border border-[#49382C]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white flex items-center justify-center text-2xl shadow-xs">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                  Village Farmer Admin Portal
                </h1>
                <span className="text-[10px] bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Live Farm Control
                </span>
              </div>
              <p className="text-xs text-[#49382C]/70 dark:text-white/60">
                Ravela Village Farm, Tadikonda Mandal, Guntur &middot; Orders, Customer Roster &amp; Stock Availability Switch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('store')}
              className="px-3.5 py-2 text-xs font-bold rounded-lg border border-[#1E3F2D] dark:border-white/30 text-[#1E3F2D] dark:text-[#FAF7EF] hover:bg-[#1E3F2D]/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              &larr; View Storefront
            </button>
            <button
              onClick={resetDemoData}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[#49382C]/15 dark:border-white/15 text-[#49382C] dark:text-[#FAF7EF] hover:bg-stone-50 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer"
              title="Reset Sample Data"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#5E7A4A] dark:text-[#9FB789]" />
              <span className="hidden sm:inline">Reset Batch</span>
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/15 text-[#49382C] dark:text-[#FAF7EF] flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#49382C]/10 dark:border-white/10 pb-2">
          {[
            { id: 'products', label: `Products & Stock Switch (${products.length})`, icon: Package },
            { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'customers', label: `Customer Details (${customersList.length})`, icon: Users },
            { id: 'overview', label: 'Analytics & Sales', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] shadow-xs'
                    : 'text-[#49382C] dark:text-[#D1C9BC] hover:bg-white dark:hover:bg-white/10 hover:text-[#1E3F2D] dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#8DA472] dark:text-white' : 'text-[#5E7A4A] dark:text-[#9FB789]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRODUCTS & CRITICAL ON / OFF STOCK SWITCH */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1A261F] p-4 rounded-xl border border-[#49382C]/10 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#1E3F2D] dark:text-[#FAF7EF] flex items-center gap-2">
                  <Power className="w-4 h-4 text-[#C3633D] dark:text-[#E28965]" />
                  <span>Product Stock Availability &mdash; On / Off Control</span>
                </h3>
                <p className="text-xs text-[#49382C]/70 dark:text-white/60 mt-0.5">
                  Click the <strong>ON / OFF Switch</strong> below on any podi or vegetable. Turning it <strong>OFF</strong> immediately marks the item <em>"Sold Out"</em> on the customer website and disables checkout.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={openAddModal}
                  className="px-4 py-2 bg-[#1E3F2D] hover:bg-[#142C1F] dark:bg-[#5E7A4A] dark:hover:bg-[#4E663C] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#8DA472] dark:text-white" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-white dark:bg-white/5 rounded-lg border border-[#49382C]/10 dark:border-white/10 w-fit">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setProductCatFilter(c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md cursor-pointer ${
                    productCatFilter === c
                      ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white font-bold'
                      : 'text-[#49382C] dark:text-[#D1C9BC] hover:bg-stone-50 dark:hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Product Table with prominent ON/OFF Toggle */}
            <div className="bg-white dark:bg-[#1A261F] rounded-2xl border border-[#49382C]/10 dark:border-white/10 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF7EF] dark:bg-black/30 text-[#49382C]/70 dark:text-white/60 uppercase text-[10px] tracking-wider border-b border-[#49382C]/10 dark:border-white/10">
                    <tr>
                      <th className="py-3 px-4">Podi / Vegetable Details</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Cut Timing / Craft</th>
                      <th className="py-3 px-3">Variants &amp; Prices</th>
                      <th className="py-3 px-3 text-center">Remaining Stock</th>
                      <th className="py-3 px-4 text-center">
                        <span className="text-[#C3633D] dark:text-[#E28965] font-bold">Stock Switch (ON / OFF)</span>
                      </th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                    {filteredProducts.map((p) => {
                      const isOutOfStock = !p.isAvailable || p.stockLeft <= 0;
                      return (
                        <tr
                          key={p.id}
                          className={`hover:bg-[#FAF7EF]/40 dark:hover:bg-white/5 transition-colors ${
                            isOutOfStock ? 'bg-red-50/20 dark:bg-red-950/20' : ''
                          }`}
                        >
                          {/* Image & Title */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded-lg object-cover bg-stone-100 dark:bg-stone-800 shrink-0 border border-[#49382C]/10 dark:border-white/10"
                              />
                              <div>
                                <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF] text-xs leading-snug">{p.name}</p>
                                <p className="text-[11px] font-semibold text-[#C3633D] dark:text-[#E28965]">{p.teluguName}</p>
                                <span className="text-[10px] text-[#49382C]/60 dark:text-white/50">{p.processType}</span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-3">
                            <span className="text-xs text-[#49382C] dark:text-[#D1C9BC] font-medium">{p.category}</span>
                          </td>

                          {/* Cut Timing */}
                          <td className="py-3 px-3">
                            {p.cutTiming ? (
                              <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                                <Clock className="w-3.5 h-3.5 shrink-0" />
                                <span>{p.cutTiming}</span>
                              </div>
                            ) : (
                              <span className="text-[11px] text-[#49382C]/60 dark:text-white/50">Stone-pounded</span>
                            )}
                          </td>

                          {/* Variants */}
                          <td className="py-3 px-3">
                            <div className="space-y-0.5">
                              {p.variants.map((v) => (
                                <div key={v.label} className="text-[11px] text-[#49382C]/80 dark:text-white/70 flex gap-2">
                                  <span className="font-medium">{v.label}:</span>
                                  <span className="font-bold text-[#1E3F2D] dark:text-[#9FB789] tabular-nums">₹{v.price}</span>
                                </div>
                              ))}
                            </div>
                          </td>

                          {/* Stock Left */}
                          <td className="py-3 px-3 text-center">
                            <div className="inline-flex flex-col items-center">
                              <span
                                className={`font-bold text-xs tabular-nums ${
                                  p.stockLeft < 10 && p.stockLeft > 0
                                    ? 'text-amber-600 dark:text-amber-400 font-black flex items-center gap-0.5'
                                    : p.stockLeft === 0
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-[#1E3F2D] dark:text-[#FAF7EF]'
                                }`}
                              >
                                {p.stockLeft < 10 && p.stockLeft > 0 && <Flame className="w-3 h-3 text-amber-500" />}
                                {p.stockLeft} {p.unit}
                              </span>
                              <span className="text-[9px] text-[#49382C]/50 dark:text-white/40">of {p.totalBatchStock} {p.unit}</span>
                            </div>
                          </td>

                          {/* CRITICAL ON / OFF BUTTON */}
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex flex-col items-center">
                              <button
                                onClick={() => toggleProductStock(p.id)}
                                className={`group relative inline-flex h-8 w-24 items-center justify-between rounded-full p-1 transition-colors cursor-pointer shadow-xs ${
                                  p.isAvailable ? 'bg-emerald-600' : 'bg-red-600'
                                }`}
                                title={p.isAvailable ? 'Click to Mark Out of Stock' : 'Click to Mark In Stock'}
                              >
                                <span
                                  className={`text-[10px] font-bold text-white uppercase tracking-wider px-2 ${
                                    p.isAvailable ? 'text-left' : 'text-right w-full pr-1'
                                  }`}
                                >
                                  {p.isAvailable ? 'ON' : 'OFF'}
                                </span>
                                <span
                                  className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center text-[10px] font-bold ${
                                    p.isAvailable
                                      ? 'translate-x-16 text-emerald-700'
                                      : 'translate-x-0 text-red-700'
                                  }`}
                                >
                                  <Power className="w-3 h-3" />
                                </span>
                              </button>

                              <span
                                className={`text-[10px] font-bold mt-1 ${
                                  p.isAvailable ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
                                }`}
                              >
                                {p.isAvailable ? 'In Stock (Active)' : 'Out of Stock (Disabled)'}
                              </span>
                            </div>
                          </td>

                          {/* Action edit/delete */}
                          <td className="py-3 px-3 text-right space-x-1">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-1.5 hover:bg-stone-100 dark:hover:bg-white/10 rounded text-[#1E3F2D] dark:text-[#9FB789] cursor-pointer"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${p.name}?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/40 rounded text-red-600 dark:text-red-400 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                  Customer Orders ({orders.length})
                </h3>
                <p className="text-xs text-[#49382C]/70 dark:text-white/60">
                  Update dispatch status, review ordered items, and contact customers directly via WhatsApp/Phone.
                </p>
              </div>

              {/* Status filter */}
              <div className="flex flex-wrap gap-1 p-1 bg-white dark:bg-white/5 rounded-lg border border-[#49382C]/10 dark:border-white/10">
                {['All', 'New Order', 'Confirmed', 'Preparing', 'Shipped', 'Delivered', 'Cancelled'].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md cursor-pointer ${
                        orderFilter === st
                          ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white font-bold'
                          : 'text-[#49382C] dark:text-[#D1C9BC] hover:bg-stone-100 dark:hover:bg-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-[#1A261F] rounded-2xl border border-dashed border-[#49382C]/20 dark:border-white/20 text-xs text-[#49382C]/70 dark:text-white/60">
                No orders under status "{orderFilter}".
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white dark:bg-[#1A261F] p-5 rounded-2xl border border-[#49382C]/10 dark:border-white/10 shadow-2xs space-y-4"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#49382C]/10 dark:border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF] text-base">{ord.id}</span>
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-bold rounded ${
                              ord.orderStatus === 'New Order'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : ord.orderStatus === 'Confirmed'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                                : ord.orderStatus === 'Preparing'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                                : ord.orderStatus === 'Shipped'
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                                : ord.orderStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                            }`}
                          >
                            {ord.orderStatus}
                          </span>
                          <span className="text-[10px] text-[#49382C]/50 dark:text-white/40 font-mono">
                            {new Date(ord.createdAt).toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Customer details in order card */}
                        <div className="mt-2 text-xs text-[#49382C]/85 dark:text-[#D1C9BC] flex flex-wrap gap-x-4 gap-y-1">
                          <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                            Customer: {ord.customerName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#5E7A4A] dark:text-[#9FB789]" />
                            <a href={`tel:${ord.phone}`} className="hover:underline font-medium">
                              {ord.phone}
                            </a>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C3633D] dark:text-[#E28965]" />
                            <span>
                              {ord.deliveryAddress}, {ord.city}, {ord.state} - {ord.pincode}
                            </span>
                          </span>
                        </div>

                        {ord.orderNotes && (
                          <div className="mt-2 p-2 bg-[#FAF7EF] dark:bg-black/20 rounded text-[11px] text-[#C3633D] dark:text-[#E28965] italic">
                            Customer Instructions: "{ord.orderNotes}"
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums block">
                          ₹{ord.totalAmount}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#49382C]/70 dark:text-white/60">
                          {ord.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid via Razorpay'}
                        </span>
                      </div>
                    </div>

                    {/* Ordered items list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {ord.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-[#FAF7EF] dark:bg-white/5 rounded-xl border border-[#49382C]/10 dark:border-white/10 flex items-center justify-between text-xs"
                        >
                          <div className="truncate mr-2">
                            <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF] truncate">{it.name}</p>
                            <p className="text-[10px] text-[#49382C]/70 dark:text-white/60">
                              {it.selectedVariant} &times; {it.quantity}
                            </p>
                          </div>
                          <span className="font-bold text-[#1E3F2D] dark:text-[#9FB789] tabular-nums shrink-0">
                            ₹{it.subtotal}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order status changer bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#49382C]/10 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Update Status:</span>
                        <div className="flex flex-wrap gap-1">
                          {(
                            ['New Order', 'Confirmed', 'Preparing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]
                          ).map((st) => (
                            <button
                              key={st}
                              disabled={ord.orderStatus === st}
                              onClick={() => {
                                updateOrderStatus(
                                  ord.id,
                                  st,
                                  `Village Farmer admin updated status to ${st} at ${new Date().toLocaleTimeString()}`
                                );
                              }}
                              className={`px-2.5 py-1 text-[11px] font-bold rounded transition-colors cursor-pointer ${
                                ord.orderStatus === st
                                  ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white opacity-80 cursor-default'
                                  : 'bg-stone-100 dark:bg-white/10 hover:bg-[#FAF7EF] text-[#49382C] dark:text-[#FAF7EF] border border-[#49382C]/15 dark:border-white/10'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${ord.phone.replace(/\D/g, '')}?text=Namaste%20${encodeURIComponent(
                          ord.customerName
                        )},%20this%20is%20Village%20Farmer%20regarding%20your%20farm%20order%20${ord.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>WhatsApp Customer</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOMER DETAILS (Roster of all customers & addresses) */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1A261F] p-4 rounded-xl border border-[#49382C]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                  Customer Directory &amp; Addresses ({customersList.length})
                </h3>
                <p className="text-xs text-[#49382C]/70 dark:text-white/60 mt-0.5">
                  Complete customer records, delivery addresses, and purchase totals.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A261F] rounded-2xl border border-[#49382C]/10 dark:border-white/10 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF7EF] dark:bg-black/30 text-[#49382C]/70 dark:text-white/60 uppercase text-[10px] tracking-wider border-b border-[#49382C]/10 dark:border-white/10">
                    <tr>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-3">Phone &amp; Contact</th>
                      <th className="py-3 px-4">Full Delivery Address</th>
                      <th className="py-3 px-3">City / State</th>
                      <th className="py-3 px-3">Total Spend</th>
                      <th className="py-3 px-3">Latest Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                    {customersList.map((c, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF7EF]/30 dark:hover:bg-white/5">
                        <td className="py-3 px-4 font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                          {c.name}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-semibold text-[#49382C] dark:text-[#FAF7EF]">{c.phone}</p>
                          <p className="text-[10px] text-[#49382C]/60 dark:text-white/50">{c.email}</p>
                        </td>
                        <td className="py-3 px-4 text-[#49382C]/85 dark:text-[#D1C9BC] max-w-xs leading-relaxed">
                          {c.address}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-[#1E3F2D] dark:text-[#9FB789]">{c.city}</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums">
                          ₹{c.totalSpent}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-mono text-[11px] text-[#C3633D] dark:text-[#E28965] block">{c.orderId}</span>
                          <span className="text-[10px] text-[#5E7A4A] dark:text-[#9FB789] font-semibold">{c.orderStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#1A261F] p-5 rounded-2xl border border-[#49382C]/10 dark:border-white/10">
                <span className="text-xs text-[#49382C]/70 dark:text-white/60 block font-semibold">Total Orders</span>
                <span className="text-3xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums mt-1 block">
                  {stats.totalOrders}
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">All time farm orders</span>
              </div>

              <div className="bg-white dark:bg-[#1A261F] p-5 rounded-2xl border border-[#49382C]/10 dark:border-white/10">
                <span className="text-xs text-[#49382C]/70 dark:text-white/60 block font-semibold">Today's Orders</span>
                <span className="text-3xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums mt-1 block">
                  {stats.todayOrders}
                </span>
                <span className="text-[11px] text-[#5E7A4A] dark:text-[#9FB789]">Morning 5 AM cut batch</span>
              </div>

              <div className="bg-white dark:bg-[#1A261F] p-5 rounded-2xl border border-[#49382C]/10 dark:border-white/10">
                <span className="text-xs text-[#49382C]/70 dark:text-white/60 block font-semibold">Gross Farm Sales</span>
                <span className="text-3xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums mt-1 block">
                  ₹{stats.totalSales}
                </span>
                <span className="text-[11px] text-[#C3633D] dark:text-[#E28965]">Direct farmer revenue</span>
              </div>

              <div className="bg-white dark:bg-[#1A261F] p-5 rounded-2xl border border-[#49382C]/10 dark:border-white/10">
                <span className="text-xs text-[#49382C]/70 dark:text-white/60 block font-semibold">Products In Stock</span>
                <span className="text-3xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums mt-1 block">
                  {stats.activeInStockProducts} / {stats.totalProducts}
                </span>
                <span className="text-[11px] text-red-600 dark:text-red-400 font-semibold">
                  {stats.outOfStockProducts} Disabled by Switch
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7EF] dark:bg-[#16221A] text-[#49382C] dark:text-[#FAF7EF] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#49382C]/15 dark:border-white/15 p-6 space-y-4 my-8 animate-fade-in">
            <h3 className="text-lg font-bold text-[#1E3F2D] dark:text-[#FAF7EF] border-b border-[#49382C]/10 dark:border-white/10 pb-3">
              {editingProductId ? 'Edit Village Farm Item' : 'Add New Farm Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#49382C] dark:text-white block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Authentic Andhra Karapodi"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-[#49382C] dark:text-white block mb-1">Telugu Name (తెలుగు పేరు) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ఆంధ్ర కారప్పొడి"
                  value={productForm.teluguName}
                  onChange={(e) => setProductForm({ ...productForm, teluguName: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#49382C] dark:text-white block mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => {
                      const newCat = e.target.value as ProductCategory;
                      setProductForm({
                        ...productForm,
                        category: newCat,
                        unit: newCat === "Today's Cut Vegetables" ? 'kg' : 'packs',
                        processType: newCat === "Today's Cut Vegetables" ? 'Dawn Harvested' : 'Stone-Pounded',
                        variant1Label: newCat === "Today's Cut Vegetables" ? '1 kg' : '100g Pack',
                        variant2Label: newCat === "Today's Cut Vegetables" ? '2 kg' : '250g Jar',
                      });
                    }}
                    className="w-full px-3 py-2 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                  >
                    <option value="Homemade Podis">Homemade Podis</option>
                    <option value="Today's Cut Vegetables">Today's Cut Vegetables</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#49382C] dark:text-white block mb-1">Stock Left ({productForm.unit})</label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.stockLeft}
                    onChange={(e) => setProductForm({ ...productForm, stockLeft: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                  />
                </div>
              </div>

              {/* Cut timing if vegetable */}
              {productForm.category === "Today's Cut Vegetables" && (
                <div className="grid grid-cols-2 gap-3 p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <div>
                    <label className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                      Vegetable Cut Timing *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5:15 AM Today"
                      value={productForm.cutTiming}
                      onChange={(e) => setProductForm({ ...productForm, cutTiming: e.target.value })}
                      className="w-full px-2 py-1.5 bg-white dark:bg-black/40 border border-emerald-300 rounded text-xs text-[#49382C] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                      Harvest Batch Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sunrise Dew Harvest"
                      value={productForm.cutBatch}
                      onChange={(e) => setProductForm({ ...productForm, cutBatch: e.target.value })}
                      className="w-full px-2 py-1.5 bg-white dark:bg-black/40 border border-emerald-300 rounded text-xs text-[#49382C] dark:text-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-[#49382C] dark:text-white block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#49382C] dark:text-white block mb-1">Variant 1 Label &amp; Price</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={productForm.variant1Label}
                      onChange={(e) => setProductForm({ ...productForm, variant1Label: e.target.value })}
                      className="w-1/2 px-2 py-1.5 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                    />
                    <input
                      type="number"
                      value={productForm.variant1Price}
                      onChange={(e) => setProductForm({ ...productForm, variant1Price: Number(e.target.value) })}
                      className="w-1/2 px-2 py-1.5 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                      placeholder="₹"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#49382C] dark:text-white block mb-1">Variant 2 Label &amp; Price</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={productForm.variant2Label}
                      onChange={(e) => setProductForm({ ...productForm, variant2Label: e.target.value })}
                      className="w-1/2 px-2 py-1.5 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                    />
                    <input
                      type="number"
                      value={productForm.variant2Price}
                      onChange={(e) => setProductForm({ ...productForm, variant2Price: Number(e.target.value) })}
                      className="w-1/2 px-2 py-1.5 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                      placeholder="₹"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#49382C] dark:text-white block mb-1">Image URL</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#49382C] dark:text-white"
                />
              </div>

              {/* In stock on/off check in modal */}
              <div className="pt-2 flex items-center justify-between bg-white dark:bg-white/5 p-3 rounded-lg border border-[#49382C]/10 dark:border-white/10">
                <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Initial Availability Switch:</span>
                <button
                  type="button"
                  onClick={() => setProductForm({ ...productForm, isAvailable: !productForm.isAvailable })}
                  className={`px-3 py-1 text-xs font-bold rounded cursor-pointer ${
                    productForm.isAvailable ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                  }`}
                >
                  {productForm.isAvailable ? 'ON (Available)' : 'OFF (Out of Stock)'}
                </button>
              </div>

              <div className="pt-3 border-t border-[#49382C]/10 dark:border-white/10 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-2 text-center border border-[#49382C]/20 dark:border-white/20 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-center bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white font-bold rounded-lg cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
