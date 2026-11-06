import React from 'react';
import { useStore } from '../context/StoreContext';
import { Phone, Mail, MapPin, ShieldCheck, Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setIsAuthOpen, setAuthDefaultTab, setIsTrackingOpen, setSelectedCategory } = useStore();

  const handleCategoryNav = (cat: string) => {
    setActiveView('store');
    setSelectedCategory(cat);
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E3F2D] dark:bg-[#0c130f] text-[#FAF7EF] border-t border-[#152e21] dark:border-white/10 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7EF] dark:bg-white/10 text-[#1E3F2D] dark:text-emerald-400 flex items-center justify-center text-xl shadow-sm">
                <Sprout className="w-6 h-6 text-[#1E3F2D] dark:text-emerald-400" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#FAF7EF] block leading-none">
                  Village Farmer
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#8DA472] dark:text-emerald-400 font-bold">
                  గ్రామీణ రైతు &middot; Ravela Village, Guntur
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF7EF]/80 dark:text-stone-300 leading-relaxed max-w-sm">
              Dedicated to reviving authentic Andhra stone-pounded karapodis, grandmother recipes, and 5:00 AM dawn-cut fresh vegetables delivered directly from our fertile fields to your kitchen.
            </p>

            <div className="pt-2 text-xs text-[#8DA472] dark:text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8DA472] dark:text-emerald-400" />
              <span>Granite Mortars &middot; Sunrise Harvest Timings &middot; Zero Chemicals</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#FAF7EF] uppercase tracking-wider">
              Store Catalog
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7EF]/75 dark:text-stone-300">
              <li>
                <button
                  onClick={() => handleCategoryNav('Homemade Podis')}
                  className="hover:text-[#FAF7EF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Homemade Podis
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav("Today's Cut Vegetables")}
                  className="hover:text-[#FAF7EF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Today's Cut Vegetables
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Low Stock (<10)')}
                  className="hover:text-[#FAF7EF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Low Stock Batch Alerts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('All Products')}
                  className="hover:text-[#FAF7EF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  All Farm Produce
                </button>
              </li>
            </ul>
          </div>

          {/* Customer & Farmer Portals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#FAF7EF] uppercase tracking-wider">
              Portals &amp; Tracking
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7EF]/75 dark:text-stone-300">
              <li>
                <button
                  onClick={() => setIsTrackingOpen(true)}
                  className="hover:text-[#FAF7EF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Track My Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setAuthDefaultTab('customer');
                    setIsAuthOpen(true);
                  }}
                  className="hover:text-[#FAF7EF] dark:hover:text-white transition-colors cursor-pointer"
                >
                  Customer Account Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setAuthDefaultTab('admin');
                    setIsAuthOpen(true);
                  }}
                  className="text-amber-300 dark:text-amber-400 font-semibold hover:underline transition-colors cursor-pointer"
                >
                  Farmer Admin Portal (On/Off Switch)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FAF7EF] uppercase tracking-wider">
              Farm &amp; Office Locations
            </h4>
            <div className="space-y-2 text-xs text-[#FAF7EF]/80 dark:text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8DA472] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Farm:</strong> Ravela Village, Tadikonda Mandal, Guntur District, Andhra Pradesh - 522511</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8DA472] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dispatch Hub:</strong> Vijayawada &amp; Hyderabad, Telangana</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8DA472] dark:text-emerald-400 shrink-0" />
                <a href="tel:+919848022338" className="hover:underline">
                  +91 98480 22338 / +91 94401 82910
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8DA472] dark:text-emerald-400 shrink-0" />
                <a href="mailto:care@villagefarmer.in" className="hover:underline">
                  care@villagefarmer.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#FAF7EF]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7EF]/60 dark:text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Village Farmer (గ్రామీణ రైతు). All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>100% Stone-Pounded Podis &amp; Dawn-Cut Vegetables</span>
            <span>&middot;</span>
            <span className="text-[#8DA472] dark:text-emerald-400">గ్రామీణ సాంప్రదాయం &middot; రవీల గ్రామం, గుంటూరు</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
