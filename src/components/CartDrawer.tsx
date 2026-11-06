import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Check } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryCharges,
    cartTotal,
    cartItemsCount,
  } = useStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end font-sans">
        <div className="w-full max-w-md bg-[#FAF7EF] dark:bg-[#18231c] h-full shadow-2xl flex flex-col justify-between border-l border-[#49382C]/15 dark:border-white/10 animate-slide-left">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#49382C]/10 dark:border-white/10 bg-white dark:bg-[#1f2d24] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                  Your Village Farmer Basket
                </h3>
                <p className="text-[11px] text-[#49382C]/70 dark:text-stone-300">
                  {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-white/10 text-[#49382C] dark:text-stone-300 transition-colors cursor-pointer"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery threshold bar */}
          <div className="bg-[#FAF7EF] dark:bg-[#121915] p-3.5 border-b border-[#49382C]/10 dark:border-white/10 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-semibold text-[#49382C] dark:text-stone-200">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#5E7A4A] dark:text-emerald-400" />
                {amountNeededForFreeDelivery === 0 ? (
                  <span className="text-[#1E3F2D] dark:text-emerald-300 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Unlocked FREE Farm-to-Home Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#C3633D] dark:text-amber-400">₹{amountNeededForFreeDelivery}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="font-mono text-[11px]">{Math.round(deliveryProgress)}%</span>
            </div>
            <div className="w-full bg-[#49382C]/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#1E3F2D] dark:bg-[#5E7A4A] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#49382C]/70 dark:text-stone-400">
                <ShoppingBag className="w-12 h-12 text-[#49382C]/20 dark:text-white/20 mb-3" />
                <p className="text-base font-bold text-[#1E3F2D] dark:text-white">Your basket is empty</p>
                <p className="text-xs text-[#49382C]/70 dark:text-stone-300 mt-1 max-w-xs leading-relaxed">
                  Add traditional stone-pounded karapodis or dawn-cut fresh vegetables harvested from our fields.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-4 py-2 bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] text-xs font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Explore Fresh Produce
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white dark:bg-[#1f2d24] p-3.5 rounded-xl border border-[#49382C]/10 dark:border-white/10 flex items-center gap-3 shadow-2xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0 border border-[#49382C]/10 dark:border-white/10"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#1E3F2D] dark:text-[#FAF7EF] truncate">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#49382C]/40 dark:text-white/40 hover:text-red-600 dark:hover:text-red-400 transition-colors p-0.5 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#C3633D] dark:text-amber-400 font-semibold">
                      Pack / Size: {item.selectedVariant}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-[#49382C]/20 dark:border-white/20 rounded bg-[#FAF7EF] dark:bg-[#121915] overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="px-2 py-0.5 hover:bg-black/5 dark:hover:bg-white/10 text-[#49382C] dark:text-stone-300 cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold tabular-nums text-[#1E3F2D] dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="px-2 py-0.5 hover:bg-black/5 dark:hover:bg-white/10 text-[#49382C] dark:text-stone-300 cursor-pointer"
                          aria-label="Increase"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white dark:bg-[#1f2d24] border-t border-[#49382C]/10 dark:border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs text-[#49382C]/80 dark:text-stone-300">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#49382C] dark:text-white tabular-nums">₹{cartSubtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery (Direct Farm Dispatch)</span>
                  <span className="font-bold tabular-nums text-[#49382C] dark:text-white">
                    {deliveryCharges === 0 ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      `₹${deliveryCharges}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#49382C]/10 dark:border-white/10 text-sm font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                  <span>Total Amount</span>
                  <span className="text-lg tabular-nums text-[#1E3F2D] dark:text-[#FAF7EF]">₹{cartTotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={clearCart}
                  className="px-3 py-3 text-xs text-[#49382C]/60 dark:text-stone-400 hover:text-red-700 dark:hover:text-red-400 border border-[#49382C]/15 dark:border-white/15 rounded-lg cursor-pointer"
                  title="Clear basket"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="flex-1 py-3 px-4 bg-[#1E3F2D] dark:bg-[#5E7A4A] hover:bg-[#152e21] text-[#FAF7EF] text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            setIsCheckoutOpen(false);
            setIsCartOpen(false);
          }}
        />
      )}
    </>
  );
};
