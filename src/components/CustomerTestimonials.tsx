import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  role: string;
  feedback: string;
  favoriteProduct: string;
  verifiedOrder: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Lakshmi Prasanna',
    location: 'Vijayawada, AP',
    role: 'Mother of two & passionate home cook',
    feedback: 'The stone-pounded Andhra Karapodi with hot rice and homemade ghee is an absolute sensation! You can clearly taste the authentic granite-mortar texture—coarse, fragrant, with zero powdery mill aftertaste. Plus, the fresh brinjals cut at 5:30 AM cooked so tender and sweet.',
    favoriteProduct: 'Authentic Andhra Karapodi & Fresh Brinjals',
    verifiedOrder: 'Order #VF-2026-1028',
  },
  {
    name: 'Sridhar Rao K.',
    location: 'Madhapur, Hyderabad',
    role: 'Health enthusiast & Software Lead',
    feedback: 'We order their Guntur Idli Karam and morning-cut country vine tomatoes every week. Seeing the exact cut timestamp (5:15 AM Sunrise Dew) on the crate gives us tremendous trust. The tomatoes have that nostalgic heirloom tanginess store-bought hybrid veggies never have.',
    favoriteProduct: 'Guntur Idli Karam & Country Vine Tomatoes',
    verifiedOrder: 'Order #VF-2026-1035',
  },
  {
    name: 'Dr. Padmavathi R.',
    location: 'Guntur, AP',
    role: 'Ayurvedic Wellness Practitioner',
    feedback: 'Their Garlic Karam Podi and Curry Leaves Podi are pure gold standard. Hand-pounded in traditional granite pestles, all the allicin in garlic and natural iron in fresh curry leaves remain completely intact without overheating.',
    favoriteProduct: 'Garlic Karam Podi & Palak Spinach',
    verifiedOrder: 'Order #VF-2026-1019',
  },
];

export const CustomerTestimonials: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF7EF] dark:bg-[#121915] border-b border-[#49382C]/10 dark:border-white/10 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C3633D] dark:text-amber-400">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Community Stories</span>
            <span aria-hidden="true">&middot;</span>
            <span>వినియోగదారుల అనుభవాలు</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] mt-1 tracking-tight">
            Loved by Families Across AP, Telangana &amp; Beyond
          </h2>
          <p className="text-xs sm:text-sm text-[#49382C]/80 dark:text-stone-300 mt-2">
            Real experiences from kitchens in Hyderabad, Vijayawada, Guntur, and Bengaluru who savour Village Farmer fresh harvest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#18231c] p-6 rounded-2xl border border-[#49382C]/10 dark:border-white/10 flex flex-col justify-between shadow-2xs hover:border-[#1E3F2D]/30 dark:hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#5E7A4A]/30 dark:text-emerald-400/30" />
                </div>

                <p className="text-xs sm:text-sm text-[#49382C]/90 dark:text-stone-200 leading-relaxed italic">
                  "{t.feedback}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#49382C]/10 dark:border-white/10">
                <p className="font-bold text-sm text-[#1E3F2D] dark:text-[#FAF7EF]">{t.name}</p>
                <p className="text-xs text-[#49382C]/70 dark:text-stone-400">
                  {t.role} &middot; <span className="text-[#C3633D] dark:text-amber-400 font-semibold">{t.location}</span>
                </p>
                <div className="mt-2 text-[11px] text-[#5E7A4A] dark:text-emerald-400 flex items-center justify-between font-semibold">
                  <span>Fav: {t.favoriteProduct}</span>
                  <span className="font-mono text-[10px] text-[#49382C]/50 dark:text-stone-400">{t.verifiedOrder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
