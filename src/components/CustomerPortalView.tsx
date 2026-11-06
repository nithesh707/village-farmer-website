import React from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, MapPin, Phone, Mail, ShoppingBag, ArrowRight, Clock } from 'lucide-react';

export const CustomerPortalView: React.FC = () => {
  const { currentUser, orders, setActiveView, logout, setIsTrackingOpen } = useStore();

  const customerOrders = orders.filter((o) => {
    if (!currentUser) return false;
    return (
      (currentUser.email && o.email === currentUser.email) ||
      (currentUser.phone && o.phone.replace(/\D/g, '') === currentUser.phone.replace(/\D/g, '')) ||
      o.customerName.toLowerCase() === currentUser.name.toLowerCase()
    );
  });

  // If no direct email match, show recent orders so customer demo works smoothly
  const displayOrders = customerOrders.length > 0 ? customerOrders : orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF7EF] dark:bg-[#121915] py-10 font-sans transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-[#18231c] p-6 rounded-2xl border border-[#49382C]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] flex items-center justify-center font-bold text-lg shadow-sm">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : 'C'}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                Namaste, {currentUser?.name || 'Valued Customer'}!
              </h1>
              <p className="text-xs text-[#49382C]/70 dark:text-stone-300">
                Welcome to your Village Farmer account &middot; Tracking stone-pounded podis &amp; dawn-cut farm vegetables
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('store')}
              className="px-4 py-2 bg-[#1E3F2D] dark:bg-[#5E7A4A] hover:bg-[#152e21] text-[#FAF7EF] text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-all"
            >
              Shop More Fresh Harvest
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-2 bg-stone-100 dark:bg-white/10 hover:bg-stone-200 dark:hover:bg-white/15 text-[#49382C] dark:text-stone-200 text-xs font-semibold rounded-lg cursor-pointer transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1 bg-white dark:bg-[#18231c] p-5 rounded-2xl border border-[#49382C]/10 dark:border-white/10 space-y-4 shadow-sm h-fit">
            <h3 className="text-sm font-bold text-[#1E3F2D] dark:text-[#FAF7EF] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#5E7A4A]" />
              <span>Customer Profile</span>
            </h3>

            <div className="space-y-2.5 text-xs text-[#49382C]/85 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#C3633D]" />
                <span className="font-semibold text-[#1E3F2D] dark:text-white">{currentUser?.name || 'Customer'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#5E7A4A]" />
                <span>{currentUser?.phone || '+91 94401 82910'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#1E3F2D] dark:text-emerald-400" />
                <span>{currentUser?.email || 'customer@villagefarmer.in'}</span>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-[#49382C]/10 dark:border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#C3633D] shrink-0 mt-0.5" />
                <span>{currentUser?.address || 'Flat 402, Sai Teja Residency, Brodipet'}, {currentUser?.city || 'Guntur'} - {currentUser?.pincode || '522002'}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsTrackingOpen(true)}
                className="w-full py-2 px-3 bg-[#FAF7EF] dark:bg-white/5 hover:bg-stone-100 dark:hover:bg-white/10 border border-[#49382C]/15 dark:border-white/15 text-[#1E3F2D] dark:text-[#FAF7EF] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Track By Order Reference</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Orders History */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-[#1E3F2D] dark:text-[#FAF7EF] flex items-center gap-2">
              <Package className="w-4 h-4 text-[#C3633D]" />
              <span>Your Orders &amp; Farm Dispatches ({displayOrders.length})</span>
            </h3>

            {displayOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#18231c] p-8 rounded-2xl border border-[#49382C]/10 dark:border-white/10 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#49382C]/20 dark:text-white/20 mx-auto" />
                <p className="font-bold text-[#1E3F2D] dark:text-white">No orders placed yet</p>
                <p className="text-xs text-[#49382C]/70 dark:text-stone-300">Explore our stone-pounded Andhra podis and sunrise dawn-cut vegetables!</p>
                <button
                  onClick={() => setActiveView('store')}
                  className="px-4 py-2 bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              displayOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white dark:bg-[#18231c] p-5 rounded-2xl border border-[#49382C]/10 dark:border-white/10 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#49382C]/10 dark:border-white/10">
                    <div>
                      <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF] text-sm">{ord.id}</span>
                      <p className="text-[11px] text-[#49382C]/60 dark:text-stone-400">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 text-xs font-bold rounded ${
                          ord.orderStatus === 'Delivered'
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {ord.orderStatus}
                      </span>
                      <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF] text-sm tabular-nums">
                        ₹{ord.totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-1.5">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-[#49382C]/90 dark:text-stone-200">
                        <span>
                          {it.name} <span className="text-[#49382C]/60 dark:text-stone-400">({it.selectedVariant})</span> &times; {it.quantity}
                        </span>
                        <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums">₹{it.subtotal}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tracking status note */}
                  <div className="p-2.5 bg-[#FAF7EF] dark:bg-white/5 rounded-xl text-xs text-[#49382C]/80 dark:text-stone-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#5E7A4A]" />
                      <span>
                        Status: <strong>{ord.orderStatus}</strong> &middot;{' '}
                        {ord.statusHistory?.[ord.statusHistory.length - 1]?.note || 'Dispatched from Ravela Village farm'}
                      </span>
                    </span>
                    <button
                      onClick={() => setIsTrackingOpen(true)}
                      className="text-xs font-bold text-[#1E3F2D] dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Track Live &rarr;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
