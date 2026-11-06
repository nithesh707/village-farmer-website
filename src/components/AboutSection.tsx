import React from 'react';
import { VILLAGE_FARMER_HERO } from '../data/initialData';
import { MapPin, Phone, Mail, Award, CheckCircle2, Heart, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-[#F3EFE4] dark:bg-[#151e18] border-b border-[#49382C]/10 dark:border-white/10 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3F2D] dark:text-emerald-400">
              <Award className="w-3.5 h-3.5 text-[#5E7A4A] dark:text-emerald-400" />
              <span>Our Roots &middot; రవీల గ్రామం, గుంటూరు &middot; Authentic Village Tradition</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF] leading-tight">
              Preserving Andhra's Stone-Pounding Heritage &amp; Dawn-Cut Farming
            </h2>

            <p className="text-sm sm:text-base text-[#49382C]/85 dark:text-stone-300 leading-relaxed">
              <strong>Village Farmer</strong> (గ్రామీణ రైతు) was founded with one pure mission: to deliver authentic grandmother-recipe stone-pounded Andhra karapodis and sunrise dawn-cut vegetables directly from our fertile fields to urban family kitchens without middlemen or storage delays.
            </p>

            <p className="text-xs sm:text-sm text-[#49382C]/80 dark:text-stone-300 leading-relaxed">
              Nestled in <strong>Ravela Village, Tadikonda Mandal, Guntur District</strong>, our organic family farm thrives on heirloom seeds, Jeevamrutham bio-fertilizers, and sustainable community empowerment. We work together with local village women's self-help groups who prepare small handcrafted batches using natural granite mortars (రోలు-రోకలి).
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-[#49382C] dark:text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-[#5E7A4A] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Pure Granite Stone Mortars (రోలు-రోకలి):</strong> Podis are pounded rhythmically below 28°C. Essential volatile aromatics, roasted lentil crunch, and therapeutic nutrients stay intact.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#49382C] dark:text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-[#5E7A4A] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>5:00 AM Sunrise Dawn Harvest:</strong> Vegetables are snipped while morning dew is still on the vine. We log exact cutting timings on every crate so you know the precise field freshness.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#49382C] dark:text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-[#5E7A4A] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero Chemical Preservatives or Artificial Flavors:</strong> 100% natural Guntur chillies, wood-fire roasted pulses, hand-picked curry leaves, and mineral-rich pink rock salt.</span>
              </div>
            </div>

            {/* Farm & Office Strip */}
            <div className="pt-4 border-t border-[#49382C]/10 dark:border-white/10 flex flex-wrap gap-4 text-xs text-[#49382C]/85 dark:text-stone-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C3633D] dark:text-amber-400" />
                <span>Ravela Village, Tadikonda, Guntur &middot; Vijayawada &amp; Hyderabad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#1E3F2D] dark:text-emerald-400" />
                <span>+91 98480 22338</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#5E7A4A] dark:text-emerald-400" />
                <span>care@villagefarmer.in</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#49382C]/15 dark:border-white/15 bg-white dark:bg-[#18231c]">
              <img
                src={VILLAGE_FARMER_HERO}
                alt="Village Farmer natural farm harvest and traditional Andhra stone pounded karapodis"
                referrerPolicy="no-referrer"
                className="w-full aspect-4/3 object-cover"
              />
              <div className="p-5 bg-white dark:bg-[#18231c] flex items-center justify-between border-t border-[#49382C]/10 dark:border-white/10">
                <div>
                  <p className="text-base font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                    Village Farmer &mdash; Ravela Village
                  </p>
                  <p className="text-xs text-[#49382C]/70 dark:text-stone-400">
                    Traditional Agriculture Center &amp; Podi Workshop, Guntur AP
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#C3633D] dark:text-amber-400 uppercase tracking-wider block">
                    Direct Farm Shipping
                  </span>
                  <span className="text-xs text-[#5E7A4A] dark:text-emerald-400 font-semibold">AP, Telangana &amp; All India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
