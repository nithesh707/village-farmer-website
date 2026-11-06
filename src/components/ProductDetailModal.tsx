import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types';
import { X, Check, ShoppingBag, Plus, Minus, AlertCircle, ShieldCheck, Clock, Package, Flame, Sparkles } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, setSelectedProductForDetail, addToCart } = useStore();
  const [selectedVariantLabel, setSelectedVariantLabel] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!selectedProductForDetail) return null;

  const prod = selectedProductForDetail;
  const isOutOfStock = !prod.isAvailable || prod.stockLeft <= 0;
  const isLowStock = !isOutOfStock && prod.stockLeft < 10;

  const currentVariant: ProductVariant =
    prod.variants.find((v) => v.label === selectedVariantLabel) || prod.variants[0];
  const totalPrice = currentVariant.price * quantity;

  const handleAdd = () => {
    if (isOutOfStock) return;
    const res = addToCart({
      productId: prod.id,
      name: prod.name,
      teluguName: prod.teluguName,
      category: prod.category,
      selectedVariant: currentVariant.label,
      unitPrice: currentVariant.price,
      quantity,
      image: prod.image,
      stockLeft: prod.stockLeft,
    });

    if (res.success) {
      setAddedNotice(true);
      setTimeout(() => {
        setAddedNotice(false);
        setSelectedProductForDetail(null);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="relative bg-[#FAF7EF] dark:bg-[#16221A] text-[#49382C] dark:text-[#FAF7EF] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#49382C]/15 dark:border-white/15 my-6 animate-fade-in">
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-black/60 text-[#49382C] dark:text-white hover:text-[#1E3F2D] flex items-center justify-center shadow-xs cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square sm:aspect-auto sm:h-full bg-stone-100 dark:bg-black/40">
            <img
              src={prod.image}
              alt={prod.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#FAF7EF]/90 dark:bg-black/70 px-2 py-0.5 rounded text-[10px] font-bold text-[#1E3F2D] dark:text-[#9FB789] border border-white/20">
              {prod.processType}
            </div>
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <span className="bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow-lg flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>Out of Stock (Turned Off by Farmer)</span>
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C3633D] dark:text-[#E28965]">
                  {prod.category}
                </span>
                {prod.spiceLevel && (
                  <span className="text-[10px] bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 font-bold px-2 py-0.5 rounded">
                    Spice: {prod.spiceLevel}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] mt-1 leading-snug">
                {prod.name}
              </h3>
              <p className="text-xs font-bold text-[#C3633D] dark:text-[#E28965] mt-0.5">{prod.teluguName}</p>

              {/* Cut timing badge */}
              {prod.cutTiming ? (
                <div className="mt-2.5 p-2 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-lg flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                  <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>
                    <strong>Cut:</strong> {prod.cutTiming} &middot; {prod.cutBatch || 'Morning Dew Harvest'}
                  </span>
                </div>
              ) : (
                <div className="mt-2.5 p-2 bg-[#FAF7EF] dark:bg-white/5 border border-[#49382C]/10 dark:border-white/10 rounded-lg flex items-center gap-2 text-xs text-[#5E7A4A] dark:text-[#9FB789] font-semibold">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Handcrafted &amp; Stone-Pounded in Small Batches</span>
                </div>
              )}

              {/* Stock Indicator */}
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#49382C]/70 dark:text-white/60">
                  <Package className="w-3.5 h-3.5 text-[#5E7A4A] dark:text-[#9FB789]" />
                  <span>Remaining Stock:</span>
                </span>
                <span
                  className={`font-bold tabular-nums ${
                    isOutOfStock
                      ? 'text-red-600 dark:text-red-400'
                      : isLowStock
                      ? 'text-amber-600 dark:text-amber-400 flex items-center gap-1'
                      : 'text-[#1E3F2D] dark:text-[#9FB789]'
                  }`}
                >
                  {isLowStock && <Flame className="w-3 h-3 text-amber-500" />}
                  {isOutOfStock ? '0 (Out of stock)' : `${prod.stockLeft} ${prod.unit} available`}
                </span>
              </div>

              <p className="text-xs text-[#49382C]/80 dark:text-[#D1C9BC] mt-2.5 leading-relaxed">
                {prod.description}
              </p>

              {/* Health Benefits */}
              {prod.benefits && prod.benefits.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#49382C]/10 dark:border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E3F2D] dark:text-[#FAF7EF] flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5E7A4A] dark:text-[#9FB789]" />
                    <span>Pure Benefits:</span>
                  </h4>
                  <ul className="space-y-1 text-[11px] text-[#49382C]/85 dark:text-[#D1C9BC]">
                    {prod.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#5E7A4A] dark:text-[#9FB789] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pairs with */}
              {prod.pairsWith && (
                <div className="mt-2 text-[11px] text-[#49382C]/80 dark:text-white/70">
                  <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Best paired with: </span>
                  <span>{prod.pairsWith}</span>
                </div>
              )}

              {/* Ingredients */}
              {prod.ingredients && prod.ingredients.length > 0 && (
                <div className="mt-2 text-[11px] text-[#49382C]/80 dark:text-white/70">
                  <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Ingredients: </span>
                  <span>{prod.ingredients.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Variants & Purchase */}
            <div className="pt-3 border-t border-[#49382C]/10 dark:border-white/10 space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#49382C]/70 dark:text-white/60 block mb-1">
                  Choose Variant / Size:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {prod.variants.map((v) => (
                    <button
                      key={v.label}
                      onClick={() => setSelectedVariantLabel(v.label)}
                      className={`p-2 rounded text-xs border text-center transition-all cursor-pointer ${
                        currentVariant.label === v.label
                          ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white border-[#1E3F2D] font-bold'
                          : 'bg-white dark:bg-white/5 text-[#49382C] dark:text-[#FAF7EF] border-[#49382C]/15 dark:border-white/15 hover:border-[#1E3F2D]'
                      }`}
                    >
                      <div className="text-[11px]">{v.label}</div>
                      <div className="font-bold tabular-nums">₹{v.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Button */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div>
                  <div className="text-[10px] text-[#49382C]/60 dark:text-white/50">Total</div>
                  <div className="text-xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums">
                    ₹{totalPrice}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isOutOfStock && (
                    <div className="flex items-center border border-[#49382C]/20 dark:border-white/20 rounded-md bg-white dark:bg-white/10">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(prod.stockLeft, quantity + 1))}
                        className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                        disabled={quantity >= prod.stockLeft}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleAdd}
                    disabled={isOutOfStock}
                    className={`px-4 py-2 text-xs font-bold rounded-md shadow-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      isOutOfStock
                        ? 'bg-stone-300 dark:bg-stone-800 text-stone-500 cursor-not-allowed'
                        : 'bg-[#1E3F2D] hover:bg-[#142C1F] dark:bg-[#5E7A4A] dark:hover:bg-[#4E663C] text-white'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#9FB789] dark:text-white" />
                        <span>Added!</span>
                      </>
                    ) : isOutOfStock ? (
                      <span>Sold Out</span>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#8DA472] dark:text-white" />
                        <span>Add to Basket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
