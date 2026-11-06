import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerOrder, OrderStatus } from '../types';
import { X, Search, Clock, CheckCircle2, AlertCircle, ShoppingBag, Sprout } from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, orders } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<CustomerOrder | null>(
    orders.length > 0 ? orders[0] : null
  );
  const [hasSearched, setHasSearched] = useState(false);

  if (!isTrackingOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchTerm.trim().toLowerCase();
    if (!cleaned) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === cleaned ||
        o.phone.replace(/\D/g, '').includes(cleaned.replace(/\D/g, '')) ||
        o.customerName.toLowerCase().includes(cleaned)
    );
    setSearchedOrder(found || null);
  };

  const statusSteps: OrderStatus[] = ['New Order', 'Confirmed', 'Preparing', 'Shipped', 'Delivered'];

  const getStepIndex = (status: OrderStatus): number => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="relative bg-[#FAF7EF] dark:bg-[#18231c] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#49382C]/15 dark:border-white/10 my-6 animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#49382C]/10 dark:border-white/10 bg-white dark:bg-[#1f2d24] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white flex items-center justify-center text-lg">
              <Sprout className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                Track Village Farmer Order
              </h3>
              <p className="text-[11px] text-[#49382C]/70 dark:text-stone-300">
                Live dispatch timeline from Ravela Village Farm, Guntur
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTrackingOpen(false)}
            className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-white/10 text-[#49382C] dark:text-stone-300 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. VF-2026-1042) or Phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E3F2D] text-[#49382C] dark:text-white"
              />
              <Search className="w-3.5 h-3.5 text-[#49382C]/40 dark:text-white/40 absolute left-2.5 top-3" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] text-xs font-bold rounded-lg hover:bg-[#152e21] transition-colors cursor-pointer"
            >
              Track
            </button>
          </form>

          {/* Result view */}
          {searchedOrder ? (
            <div className="space-y-5">
              {/* Top card */}
              <div className="bg-white dark:bg-[#1f2d24] p-4 rounded-xl border border-[#49382C]/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#49382C]/60 dark:text-stone-400 uppercase tracking-wider block font-bold">
                    Order Reference
                  </span>
                  <span className="text-lg font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                    {searchedOrder.id}
                  </span>
                  <p className="text-[11px] text-[#49382C]/70 dark:text-stone-300 mt-0.5">
                    Customer: <strong className="text-[#1E3F2D] dark:text-white">{searchedOrder.customerName}</strong> ({searchedOrder.city})
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-bold rounded ${
                      searchedOrder.orderStatus === 'Delivered'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : searchedOrder.orderStatus === 'Cancelled'
                        ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                        : 'bg-[#FAF7EF] dark:bg-white/10 text-[#1E3F2D] dark:text-amber-400 border border-[#1E3F2D]/20 dark:border-white/20'
                    }`}
                  >
                    {searchedOrder.orderStatus}
                  </span>
                  <p className="text-[10px] text-[#49382C]/60 dark:text-stone-400 mt-1 font-mono">
                    {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              {/* Progress Stepper */}
              {searchedOrder.orderStatus !== 'Cancelled' ? (
                <div className="bg-white dark:bg-[#1f2d24] p-4 rounded-xl border border-[#49382C]/10 dark:border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3F2D] dark:text-[#FAF7EF] mb-4">
                    Live Dispatch Progress
                  </h4>
                  <div className="relative flex items-center justify-between">
                    {/* Background Line */}
                    <div className="absolute left-3 right-3 top-3.5 h-0.5 bg-[#49382C]/15 dark:bg-white/15 -z-0" />
                    {/* Active Line */}
                    <div
                      className="absolute left-3 top-3.5 h-0.5 bg-[#1E3F2D] dark:bg-emerald-500 -z-0 transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          0,
                          (getStepIndex(searchedOrder.orderStatus) / (statusSteps.length - 1)) * 95
                        )}%`,
                      }}
                    />

                    {statusSteps.map((step, idx) => {
                      const currentIndex = getStepIndex(searchedOrder.orderStatus);
                      const isCompleted = idx <= currentIndex;
                      const isCurrent = idx === currentIndex;

                      return (
                        <div key={step} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isCompleted
                                ? 'bg-[#1E3F2D] dark:bg-emerald-600 text-[#FAF7EF] ring-4 ring-[#FAF7EF] dark:ring-[#1f2d24]'
                                : 'bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] mt-2 whitespace-nowrap text-center ${
                              isCurrent
                                ? 'font-bold text-[#1E3F2D] dark:text-amber-400'
                                : isCompleted
                                ? 'text-[#49382C] dark:text-stone-300'
                                : 'text-[#49382C]/40 dark:text-stone-500'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Status Notes */}
                  {searchedOrder.statusHistory && searchedOrder.statusHistory.length > 0 && (
                    <div className="mt-5 pt-3 border-t border-[#49382C]/10 dark:border-white/10 space-y-1.5 text-xs text-[#49382C]/80 dark:text-stone-300">
                      <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Farm Dispatch Log:</p>
                      {searchedOrder.statusHistory.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px]">
                          <Clock className="w-3 h-3 text-[#5E7A4A] dark:text-emerald-400 mt-0.5 shrink-0" />
                          <span>
                            <strong>{h.status}:</strong> {h.note || 'Processed at farm'} &middot;{' '}
                            <span className="text-[#49382C]/50 dark:text-stone-400">
                              {new Date(h.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>This order has been cancelled. For help, contact Village Farmer care.</span>
                </div>
              )}

              {/* Items in order */}
              <div className="bg-white dark:bg-[#1f2d24] p-4 rounded-xl border border-[#49382C]/10 dark:border-white/10 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3F2D] dark:text-[#FAF7EF] mb-2 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C3633D] dark:text-amber-400" />
                  <span>Items in This Order ({searchedOrder.items.length})</span>
                </h4>

                <div className="space-y-1.5">
                  {searchedOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1 text-xs border-b border-stone-100 dark:border-white/5 last:border-0"
                    >
                      <div>
                        <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">{it.name}</span>
                        <span className="text-[#49382C]/60 dark:text-stone-400 text-[11px] ml-1.5">
                          ({it.selectedVariant}) &times; {it.quantity}
                        </span>
                      </div>
                      <span className="font-bold tabular-nums text-[#1E3F2D] dark:text-white">₹{it.subtotal}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#49382C]/10 dark:border-white/10 text-xs font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                  <span>Total Amount Paid / Payable</span>
                  <span className="text-sm tabular-nums">₹{searchedOrder.totalAmount}</span>
                </div>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="text-center py-8 bg-white/60 dark:bg-white/5 rounded-xl border border-dashed border-[#49382C]/20 dark:border-white/20 text-xs text-[#49382C]/70 dark:text-stone-300">
              <p className="font-bold text-[#1E3F2D] dark:text-white text-sm">No order found</p>
              <p className="mt-1">
                We couldn't find an order matching "{searchTerm}". Please check your Order ID from your confirmation screen or enter your 10-digit mobile number.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
