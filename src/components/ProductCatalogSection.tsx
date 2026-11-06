import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FarmProduct, ProductVariant } from '../types';
import { ShoppingBag, Plus, Minus, Info, Check, Sparkles, AlertCircle, Clock, Package, Flame } from 'lucide-react';

export const ProductCatalogSection: React.FC = () => {
  const {
    products,
    addToCart,
    setSelectedProductForDetail,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useStore();

  const categories = [
    'All Products',
    'Homemade Podis',
    "Today's Cut Vegetables",
    'Low Stock (<10)',
  ];

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter((prod) => {
    let matchesCat = true;
    if (selectedCategory === 'Low Stock (<10)') {
      matchesCat = prod.stockLeft < 10 && prod.isAvailable;
    } else if (selectedCategory !== 'All Products') {
      matchesCat = prod.category === selectedCategory;
    }

    const matchesSearch =
      searchQuery.trim() === '' ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.teluguName.includes(searchQuery) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.cutTiming && prod.cutTiming.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prod.ingredients &&
        prod.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  const getVariantForProduct = (prod: FarmProduct): ProductVariant => {
    const selectedLabel = selectedVariants[prod.id];
    if (selectedLabel) {
      const found = prod.variants.find((v) => v.label === selectedLabel);
      if (found) return found;
    }
    return prod.variants[0] || { label: 'Standard', price: 100 };
  };

  const getQuantityForProduct = (prodId: string): number => {
    return quantities[prodId] || 1;
  };

  const handleVariantSelect = (prodId: string, variantLabel: string) => {
    setSelectedVariants((prev) => ({ ...prev, [prodId]: variantLabel }));
  };

  const handleQuantityChange = (prodId: string, delta: number, maxStock: number) => {
    setQuantities((prev) => {
      const current = prev[prodId] || 1;
      const next = Math.max(1, Math.min(maxStock, current + delta));
      return { ...prev, [prodId]: next };
    });
  };

  const handleAddToCart = (prod: FarmProduct) => {
    // If farmer turned OFF product or stock is 0
    if (!prod.isAvailable || prod.stockLeft <= 0) {
      alert(`Sorry! "${prod.name}" is currently Out of Stock.`);
      return;
    }

    const variant = getVariantForProduct(prod);
    const qty = Math.min(prod.stockLeft, getQuantityForProduct(prod.id));

    const res = addToCart({
      productId: prod.id,
      name: prod.name,
      teluguName: prod.teluguName,
      category: prod.category,
      selectedVariant: variant.label,
      unitPrice: variant.price,
      quantity: qty,
      image: prod.image,
      stockLeft: prod.stockLeft,
    });

    if (res.success) {
      setAddedItemNotice(`${prod.name} (${variant.label} × ${qty}) added to basket!`);
      setTimeout(() => setAddedItemNotice(null), 2500);
    } else if (res.message) {
      alert(res.message);
    }
  };

  return (
    <section id="catalog" className="py-16 bg-[#FAF7EF] dark:bg-[#141F18] font-sans transition-colors border-b border-[#49382C]/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#49382C]/10 dark:border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C3633D] dark:text-[#E28965]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Village Farmer &middot; Ravela Fields, Guntur</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tracking-tight mt-1">
              Fresh Cut Harvest &amp; Traditional Podis
            </h2>
            <p className="text-xs sm:text-sm text-[#49382C]/80 dark:text-[#D1C9BC] mt-1.5 max-w-2xl leading-relaxed">
              Every morning vegetables are cut fresh at sunrise with exact cut timings displayed. Podis are stone-pounded on granite mortars in small limited batches. Real-time stock counts tracked for every item.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/80 dark:bg-white/5 rounded-xl border border-[#49382C]/10 dark:border-white/10 shadow-2xs self-start lg:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] shadow-xs font-bold'
                    : 'text-[#49382C] dark:text-[#D1C9BC] hover:text-[#1E3F2D] dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Temporary Added Notification */}
        {addedItemNotice && (
          <div className="p-3 bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] text-xs font-semibold rounded-lg flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#9FB789] dark:text-white" />
              <span>{addedItemNotice}</span>
            </div>
            <span className="text-[11px] text-[#9FB789] dark:text-white uppercase tracking-wider font-bold">Ready in Basket</span>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/60 dark:bg-white/5 rounded-2xl border border-dashed border-[#49382C]/20 dark:border-white/20">
            <p className="text-base font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">No products found matching your search</p>
            <p className="text-xs text-[#49382C]/70 dark:text-white/60 mt-1">Try switching categories or clearing search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const currentVariant = getVariantForProduct(prod);
              const qty = getQuantityForProduct(prod.id);
              // CRITICAL: Stock availability check based on Admin On/Off toggle & remaining stock
              const isOutOfStock = !prod.isAvailable || prod.stockLeft <= 0;
              const isLowStock = !isOutOfStock && prod.stockLeft < 10;
              const stockPercentage = Math.min(100, (prod.stockLeft / (prod.totalBatchStock || 50)) * 100);

              return (
                <div
                  key={prod.id}
                  className={`bg-white dark:bg-[#1A261F] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                    isOutOfStock
                      ? 'border-red-300/80 dark:border-red-900/60 shadow-2xs opacity-80'
                      : isLowStock
                      ? 'border-amber-300 dark:border-amber-700/60 shadow-xs hover:shadow-md'
                      : 'border-[#49382C]/10 dark:border-white/10 hover:border-[#1E3F2D]/40 dark:hover:border-white/30 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Image slot */}
                    <div className="relative aspect-square bg-[#FAF7EF] dark:bg-black/20 overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isOutOfStock ? 'grayscale-40' : 'hover:scale-105'
                        }`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                      {/* Process Badge */}
                      <div className="absolute top-3 left-3 bg-[#FAF7EF]/90 dark:bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-[#1E3F2D] dark:text-[#9FB789] border border-[#1E3F2D]/15 dark:border-white/20">
                        {prod.processType}
                      </div>

                      {/* Out of Stock Banner or Stock Badge */}
                      <div className="absolute top-3 right-3">
                        {isOutOfStock ? (
                          <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>Sold Out</span>
                          </span>
                        ) : isLowStock ? (
                          <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-xs flex items-center gap-1 animate-pulse">
                            <Flame className="w-3 h-3" />
                            <span>Only {prod.stockLeft} left</span>
                          </span>
                        ) : (
                          <span className="bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                            In Stock
                          </span>
                        )}
                      </div>

                      {/* Telugu Name Overlay at bottom of image */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded font-medium flex items-center justify-between">
                        <span className="truncate">{prod.teluguName}</span>
                        <span className="text-[10px] text-[#9FB789] uppercase font-bold shrink-0 ml-1">
                          {prod.category === "Today's Cut Vegetables" ? 'Dawn Cut' : 'Podi'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2.5">
                      {/* CRITICAL: Cut Timing Badge (for vegetables) */}
                      {prod.cutTiming ? (
                        <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-lg flex items-center gap-1.5 text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                          <span className="truncate">
                            <strong>Cut:</strong> {prod.cutTiming} ({prod.cutBatch || 'Sunrise Dew Harvest'})
                          </span>
                        </div>
                      ) : (
                        <div className="p-1.5 bg-[#FAF7EF] dark:bg-white/5 border border-[#49382C]/10 dark:border-white/10 rounded-lg flex items-center gap-1.5 text-[11px] text-[#C3633D] dark:text-[#E28965] font-semibold">
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Handmade on Granite Mortars &middot; {prod.shelfLife || '6 Months'} Shelf Life</span>
                        </div>
                      )}

                      <h3 className="font-bold text-sm text-[#1E3F2D] dark:text-[#FAF7EF] leading-snug line-clamp-2">
                        {prod.name}
                      </h3>

                      <p className="text-[11px] text-[#49382C]/75 dark:text-[#D1C9BC]/80 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>

                      {/* Stock Left Progress Indicator */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold mb-1">
                          <span className="text-[#49382C]/70 dark:text-white/60 flex items-center gap-1">
                            <Package className="w-3 h-3 text-[#5E7A4A] dark:text-[#9FB789]" />
                            <span>Stock Left:</span>
                          </span>
                          <span
                            className={`font-bold tabular-nums ${
                              isOutOfStock
                                ? 'text-red-600 dark:text-red-400'
                                : isLowStock
                                ? 'text-amber-600 dark:text-amber-400 font-black'
                                : 'text-[#1E3F2D] dark:text-[#9FB789]'
                            }`}
                          >
                            {isOutOfStock ? '0 (Out of stock)' : `${prod.stockLeft} ${prod.unit} left`}
                          </span>
                        </div>
                        {/* Mini progress bar */}
                        <div className="w-full bg-[#49382C]/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              isOutOfStock
                                ? 'bg-red-500 w-0'
                                : isLowStock
                                ? 'bg-amber-500'
                                : 'bg-[#1E3F2D] dark:bg-[#5E7A4A]'
                            }`}
                            style={{ width: `${Math.max(4, stockPercentage)}%` }}
                          />
                        </div>
                      </div>

                      {/* Details trigger button */}
                      <button
                        onClick={() => setSelectedProductForDetail(prod)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#5E7A4A] dark:text-[#9FB789] hover:text-[#1E3F2D] dark:hover:text-white font-semibold focus:outline-none cursor-pointer"
                      >
                        <Info className="w-3 h-3" />
                        <span>Ingredients, Pairings &amp; Benefits</span>
                      </button>

                      {/* Variant Selector */}
                      <div className="pt-2 border-t border-[#49382C]/10 dark:border-white/10">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#49382C]/60 dark:text-white/50 block mb-1">
                          Select Pack / Weight:
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {prod.variants.map((v) => {
                            const isSelected = currentVariant.label === v.label;
                            return (
                              <button
                                key={v.label}
                                disabled={isOutOfStock}
                                onClick={() => handleVariantSelect(prod.id, v.label)}
                                className={`py-1 px-1.5 text-xs rounded border transition-all text-center ${
                                  isSelected
                                    ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] border-[#1E3F2D] dark:border-[#5E7A4A] font-bold shadow-xs'
                                    : 'bg-[#FAF7EF] dark:bg-white/5 text-[#49382C] dark:text-[#FAF7EF] border-[#49382C]/15 dark:border-white/15 hover:border-[#1E3F2D]/40'
                                } ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                              >
                                <div className="text-[11px] truncate">{v.label}</div>
                                <div className="text-[10px] tabular-nums font-semibold">₹{v.price}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Add to Basket Bar */}
                  <div className="p-4 pt-2">
                    <div className="pt-3 border-t border-[#49382C]/10 dark:border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tabular-nums">
                            ₹{currentVariant.price * (isOutOfStock ? 1 : qty)}
                          </span>
                          {currentVariant.mrp && currentVariant.mrp > currentVariant.price && (
                            <span className="text-[10px] text-[#49382C]/50 dark:text-white/40 line-through tabular-nums">
                              ₹{currentVariant.mrp * qty}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#5E7A4A] dark:text-[#9FB789] font-semibold">
                          {isOutOfStock ? 'Disabled by Farmer' : prod.cutTiming ? 'Dew Picked' : 'Stone Pounded'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Quantity Stepper (if in stock) */}
                        {!isOutOfStock && (
                          <div className="flex items-center border border-[#49382C]/20 dark:border-white/20 rounded-md bg-[#FAF7EF] dark:bg-white/10 overflow-hidden">
                            <button
                              onClick={() => handleQuantityChange(prod.id, -1, prod.stockLeft)}
                              className="px-1.5 py-1 hover:bg-black/5 dark:hover:bg-white/10 text-[#49382C] dark:text-[#FAF7EF] disabled:opacity-30 cursor-pointer"
                              disabled={qty <= 1}
                              aria-label="Decrease"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold tabular-nums text-[#49382C] dark:text-[#FAF7EF]">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(prod.id, 1, prod.stockLeft)}
                              className="px-1.5 py-1 hover:bg-black/5 dark:hover:bg-white/10 text-[#49382C] dark:text-[#FAF7EF] cursor-pointer disabled:opacity-30"
                              disabled={qty >= prod.stockLeft}
                              aria-label="Increase"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        )}

                        {/* Add Button */}
                        <button
                          onClick={() => handleAddToCart(prod)}
                          disabled={isOutOfStock}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                            isOutOfStock
                              ? 'bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400 cursor-not-allowed shadow-none'
                              : 'bg-[#1E3F2D] hover:bg-[#142C1F] dark:bg-[#5E7A4A] dark:hover:bg-[#4E663C] text-[#FAF7EF] active:scale-97'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#8DA472] dark:text-white" />
                          <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
