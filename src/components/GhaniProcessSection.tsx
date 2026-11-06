import React from 'react';
import { STONE_GRINDING_IMAGE, VEG_BASKET_IMAGE } from '../data/initialData';
import { Check, X, ShieldAlert, Sparkles, Clock, Heart, SunMedium } from 'lucide-react';

export const GhaniProcessSection: React.FC = () => {
  return (
    <section id="harvest-story" className="py-16 bg-[#FAF7EF] dark:bg-[#141F18] border-b border-[#49382C]/10 dark:border-white/10 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C3633D] dark:text-[#E28965]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generational Andhra Food Traditions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] tracking-tight">
            Dawn Harvest &amp; Granite Stone Pounding: The Village Farmer Standard
          </h2>
          <p className="text-sm sm:text-base text-[#49382C]/80 dark:text-[#D1C9BC] leading-relaxed">
            Most supermarket spice powders are pulverized in high-speed industrial hammer mills that scorch essential aroma compounds. Most store vegetables sit for days in chemical cold-storage rooms. Here is how our village farm does it differently:
          </p>
        </div>

        {/* 3-Way Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Commercial Supermarket Powders & Veggies */}
          <div className="bg-white dark:bg-[#1A261F] p-6 rounded-2xl border border-red-200/60 dark:border-red-900/40 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  Supermarket &amp; Factory
                </span>
                <X className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-[#49382C] dark:text-[#FAF7EF] mt-2">
                Industrial Mass Processing
              </h3>
              <p className="text-xs text-[#49382C]/70 dark:text-white/60 mt-1">
                Fast-turning blades and days in distribution warehouses.
              </p>

              <ul className="mt-5 space-y-3 text-xs text-[#49382C]/85 dark:text-[#D1C9BC]">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>High-speed hammer mills exceed <strong>80°C</strong>, destroying natural spice aromatics</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Chemical anti-caking agents, synthetic preservatives, and artificial red dye added</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Vegetables harvested unripe and gas-ripened in commercial ethylene chambers</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Stored in cold warehouses for 7-14 days, losing crisp sweetness</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-white/10 text-[11px] font-semibold text-red-700 dark:text-red-300 bg-red-50/50 dark:bg-red-950/30 p-2.5 rounded text-center">
              ⚠️ Scorched flavors, lost vitamins &amp; stale produce
            </div>
          </div>

          {/* Column 2: Urban Mandi / Reseller Markets */}
          <div className="bg-white dark:bg-[#1A261F] p-6 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Wholesale Mandi
                </span>
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-[#49382C] dark:text-[#FAF7EF] mt-2">
                Middlemen &amp; Transit Lag
              </h3>
              <p className="text-xs text-[#49382C]/70 dark:text-white/60 mt-1">
                Passes through 3-4 intermediaries before reaching cities.
              </p>

              <ul className="mt-5 space-y-3 text-xs text-[#49382C]/85 dark:text-[#D1C9BC]">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-xs mt-0.5">&bull;</span>
                  <span>Cut 2-3 days prior and transported open in hot trucks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-xs mt-0.5">&bull;</span>
                  <span>Sprayed with water waxes to simulate freshness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-xs mt-0.5">&bull;</span>
                  <span>Podis blended with commercial refined powders and fillers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-xs mt-0.5">&bull;</span>
                  <span>Zero harvest transparency or cut timing visibility</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-white/10 text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50/60 dark:bg-amber-950/30 p-2.5 rounded text-center">
              ⚠️ Inconsistent origin &amp; loss of farm moisture
            </div>
          </div>

          {/* Column 3: Village Farmer (THE PROMISE) */}
          <div className="bg-[#1E3F2D] dark:bg-[#16271D] text-[#FAF7EF] p-6 rounded-2xl border-2 border-[#5E7A4A] shadow-lg space-y-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#C3633D] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
              Authentic Village Farmer
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9FB789]">
                  రోలు-రోకలి &middot; తెల్లవారుఝామున కోత
                </span>
                <Check className="w-5 h-5 text-[#9FB789]" />
              </div>
              <h3 className="text-lg font-bold text-white mt-2">
                Stone Pounded &amp; Dawn Cut
              </h3>
              <p className="text-xs text-[#FAF7EF]/80 mt-1">
                Handcrafted by village women and field-cut at sunrise.
              </p>

              <ul className="mt-5 space-y-3 text-xs text-[#FAF7EF]/90">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9FB789] shrink-0 mt-0.5" />
                  <span><strong>Field Cut at 5:00 AM Today</strong> &mdash; with morning dew drops intact</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9FB789] shrink-0 mt-0.5" />
                  <span>Pounded coarse in <strong>granite stone mortars (రోలు-రోకలి)</strong> below 26°C</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9FB789] shrink-0 mt-0.5" />
                  <span>100% Sun-Dried Guntur Teja Chillies, country garlic &amp; native pulses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#9FB789] shrink-0 mt-0.5" />
                  <span>Direct same-day dispatch &mdash; Zero cold storage &amp; zero preservatives</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-bold text-[#9FB789] bg-white/10 p-2.5 rounded text-center">
              ✅ Living nutrition, intense natural aroma &amp; verified cut timings
            </div>
          </div>
        </div>

        {/* Traditional Stone Grinding Podis & Village Women Spotlight */}
        <div className="bg-white dark:bg-[#1A261F] p-6 sm:p-8 rounded-2xl border border-[#49382C]/10 dark:border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl overflow-hidden aspect-square bg-stone-100 dark:bg-stone-800 border border-[#49382C]/10 dark:border-white/10">
              <img
                src={STONE_GRINDING_IMAGE}
                alt="Village woman grinding Andhra karapodi in granite mortar in Ravela farm"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-stone-100 dark:bg-stone-800 border border-[#49382C]/10 dark:border-white/10">
              <img
                src={VEG_BASKET_IMAGE}
                alt="Fresh harvested morning vegetables with dew drops"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C3633D] dark:text-[#E28965]">
              <Heart className="w-3.5 h-3.5" />
              <span>Empowering Ravela Village Women Self-Help Groups</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
              Slow Stone Grinding: Unlocking Heirlooms of Andhra
            </h3>
            <p className="text-xs sm:text-sm text-[#49382C]/80 dark:text-[#D1C9BC] leading-relaxed">
              Every single batch of our Authentic Andhra Karapodi, Idli Karam, and Kandi Podi is made in limited, small batches. Country pulses are dry-roasted on low fire in clay pots and hand-pounded coarse in granite stone mortars by experienced village elders. The friction heat never exceeds ambient temperatures, ensuring every medicinal herbal essence of garlic, curry leaves, and cumin stays vibrant.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#1E3F2D] dark:text-[#9FB789] pt-1">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#5E7A4A] dark:text-[#9FB789]" />
                Zero Synthetic Preservatives
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#5E7A4A] dark:text-[#9FB789]" />
                Sun-Dried Guntur Teja Chillies
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#5E7A4A] dark:text-[#9FB789]" />
                Himalayan Pink Rock Salt
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
