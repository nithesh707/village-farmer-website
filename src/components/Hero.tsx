import React from 'react';
import { VILLAGE_FARMER_HERO } from '../data/initialData';
import { useStore } from '../context/StoreContext';
import { ArrowDown, ShieldCheck, Award, Heart, Clock, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const scrollTo = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-12 lg:py-16 bg-[#FAF7EF] dark:bg-[#141F18] border-b border-[#49382C]/10 dark:border-white/10 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Story & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5E7A4A] dark:text-[#9FB789]">
              <Sparkles className="w-4 h-4 text-[#C3633D]" />
              <span>Ravela Village, Guntur &middot; Fresh Farm-to-Kitchen</span>
              <span aria-hidden="true">&middot;</span>
              <span>100% Homemade</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#1E3F2D] dark:text-[#FAF7EF] font-bold tracking-tight leading-[1.15] text-balance">
              Village Farm Dawn-Cut Vegetables &amp; Stone-Pounded Andhra Podis.
            </h1>

            <p className="text-base sm:text-lg text-[#49382C]/85 dark:text-[#D1C9BC] leading-relaxed max-w-2xl">
              Vegetables hand-cut at <strong>5:00 AM every morning</strong> with morning dew drops intact. Authentic Andhra karapodis crafted by village women using sun-dried Guntur Teja chillies and slow-pounded in traditional granite stone mortars. Zero cold storage, zero artificial colors, direct to your doorstep.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo("Today's Cut Vegetables")}
                className="px-6 py-3.5 bg-[#1E3F2D] hover:bg-[#142C1F] dark:bg-[#5E7A4A] dark:hover:bg-[#4E663C] text-[#FAF7EF] text-xs sm:text-sm font-bold rounded-md shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <span>Today's Cut Vegetables (5 AM Cut)</span>
                <ArrowDown className="w-4 h-4 text-[#8DA472] dark:text-white" />
              </button>

              <button
                onClick={() => scrollTo('Homemade Podis')}
                className="px-6 py-3.5 bg-white dark:bg-white/10 hover:bg-[#FAF7EF] dark:hover:bg-white/15 text-[#1E3F2D] dark:text-[#FAF7EF] border border-[#1E3F2D] dark:border-white/30 text-xs sm:text-sm font-bold rounded-md transition-colors active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <span>Shop Homemade Podis (కారప్పొడులు)</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-[#49382C]/10 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#49382C] dark:text-[#FAF7EF]">
              <div className="p-3 bg-white/70 dark:bg-white/5 rounded-lg border border-[#49382C]/10 dark:border-white/10">
                <Clock className="w-4 h-4 text-[#C3633D] mb-1" />
                <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Dawn Field Cut</p>
                <p className="text-[11px] text-[#49382C]/70 dark:text-white/60">Cut between 4:45 - 6:00 AM</p>
              </div>

              <div className="p-3 bg-white/70 dark:bg-white/5 rounded-lg border border-[#49382C]/10 dark:border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#5E7A4A] dark:text-[#9FB789] mb-1" />
                <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Zero Cold Storage</p>
                <p className="text-[11px] text-[#49382C]/70 dark:text-white/60">No ripening chemicals</p>
              </div>

              <div className="p-3 bg-white/70 dark:bg-white/5 rounded-lg border border-[#49382C]/10 dark:border-white/10">
                <Heart className="w-4 h-4 text-[#C3633D] mb-1" />
                <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Village Women</p>
                <p className="text-[11px] text-[#49382C]/70 dark:text-white/60">Self-help group livelihoods</p>
              </div>

              <div className="p-3 bg-white/70 dark:bg-white/5 rounded-lg border border-[#49382C]/10 dark:border-white/10">
                <Award className="w-4 h-4 text-[#1E3F2D] dark:text-[#9FB789] mb-1" />
                <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Granite Pounded</p>
                <p className="text-[11px] text-[#49382C]/70 dark:text-white/60">Heirloom stone recipes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Realistic Village Farm Table Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#49382C]/10 dark:border-white/10 aspect-4/3 lg:aspect-auto lg:h-[480px] bg-stone-100 dark:bg-stone-800">
              <img
                src={VILLAGE_FARMER_HERO}
                alt="Village Farmer rustic Andhra table with homemade karapodi bowls, fresh cut tomatoes, okra, and green chillies in Ravela farm"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-[#16221A]/95 backdrop-blur-md p-4 rounded-xl border border-[#49382C]/10 dark:border-white/15 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live Morning Harvest from Ravela</span>
                  </div>
                  <p className="text-[11px] text-[#49382C]/75 dark:text-white/70 mt-0.5">
                    Dew-cut Vine Tomatoes, Ladyfinger &amp; Fresh Andhra Karapodi
                  </p>
                </div>
                <span className="text-[10px] font-bold text-[#C3633D] dark:text-[#E28965] bg-[#C3633D]/10 dark:bg-white/10 px-2.5 py-1 rounded border border-[#C3633D]/20 uppercase tracking-wider shrink-0">
                  Farm Fresh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
