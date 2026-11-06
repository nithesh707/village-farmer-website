import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Search, Menu, X, ArrowLeft, PackageCheck, User, ShieldCheck, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartItemsCount,
    cartSubtotal,
    setIsCartOpen,
    currentUser,
    setIsAuthOpen,
    setAuthDefaultTab,
    activeView,
    setActiveView,
    setIsTrackingOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    theme,
    toggleTheme,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCategoryNav = (cat: string) => {
    setActiveView('store');
    setSelectedCategory(cat);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavScroll = (sectionId: string) => {
    setActiveView('store');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7EF]/95 dark:bg-[#141F18]/95 backdrop-blur-md border-b border-[#49382C]/10 dark:border-white/10 transition-colors font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-[#1E3F2D] dark:bg-[#11241A] text-[#FAF7EF] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#5E7A4A] animate-pulse"></span>
        <span>
          100% Traditional Andhra Farm-to-Home &middot; Stone-Pounded Podis &amp; Dawn-Cut Vegetables &middot; Free Delivery above ₹499
        </span>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Village Farmer Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setActiveView('store');
              handleNavScroll('hero');
            }}
            className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1E3F2D] dark:bg-[#5E7A4A] text-[#FAF7EF] flex items-center justify-center shadow-xs group-hover:bg-[#142C1F] transition-colors border border-[#5E7A4A]/40">
              <span className="text-xl" role="img" aria-label="farmer">🌾</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl sm:text-2xl tracking-tight text-[#1E3F2D] dark:text-[#F3EFE4] whitespace-nowrap leading-none">
                Village Farmer
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C3633D] dark:text-[#E28965] font-bold mt-1">
                గ్రామీణ రైతు &middot; Ravela Village, Guntur
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-[#49382C] dark:text-[#D1C9BC]">
          <button
            onClick={() => handleNavScroll('hero')}
            className="hover:text-[#1E3F2D] dark:hover:text-[#E28965] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#1E3F2D] dark:hover:border-[#E28965] cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleCategoryNav('Homemade Podis')}
            className="hover:text-[#1E3F2D] dark:hover:text-[#E28965] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#1E3F2D] dark:hover:border-[#E28965] cursor-pointer"
          >
            Homemade Podis (కారప్పొడులు)
          </button>
          <button
            onClick={() => handleCategoryNav("Today's Cut Vegetables")}
            className="hover:text-[#1E3F2D] dark:hover:text-[#E28965] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#1E3F2D] dark:hover:border-[#E28965] cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Today's Cut Vegetables</span>
          </button>
          <button
            onClick={() => handleNavScroll('harvest-story')}
            className="hover:text-[#1E3F2D] dark:hover:text-[#E28965] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#1E3F2D] dark:hover:border-[#E28965] cursor-pointer"
          >
            Dawn Harvest &amp; Stone Craft
          </button>
          <button
            onClick={() => setIsTrackingOpen(true)}
            className="hover:text-[#1E3F2D] dark:hover:text-[#E28965] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#1E3F2D] dark:hover:border-[#E28965] flex items-center gap-1 text-[#5E7A4A] dark:text-[#9FB789] cursor-pointer"
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Track Order</span>
          </button>
        </nav>

        {/* Zone 3: Search, Theme Toggle, Customer Login, Admin Portal, Cart */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Search */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search podis &amp; cut veggies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 xl:w-48 pl-8 pr-3 py-1.5 text-xs bg-white/80 dark:bg-black/30 border border-[#49382C]/15 dark:border-white/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1E3F2D] text-[#49382C] dark:text-[#FAF7EF] placeholder-[#49382C]/50 dark:placeholder-white/40"
            />
            <Search className="w-3.5 h-3.5 text-[#49382C]/50 dark:text-white/40 absolute left-2.5 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-[#49382C]/60 hover:text-[#49382C] text-xs cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>

          {/* Customer Portal Button */}
          {currentUser?.role === 'customer' ? (
            <button
              onClick={() => setActiveView(activeView === 'customer-portal' ? 'store' : 'customer-portal')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeView === 'customer-portal'
                  ? 'bg-[#1E3F2D] text-[#FAF7EF] border-[#1E3F2D]'
                  : 'bg-white dark:bg-[#1E2B22] text-[#1E3F2D] dark:text-[#FAF7EF] border-[#1E3F2D]/30 dark:border-white/20 hover:border-[#1E3F2D]'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#5E7A4A]" />
              <span className="hidden sm:inline">My Account</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthDefaultTab('customer');
                setIsAuthOpen(true);
              }}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#49382C] dark:text-[#FAF7EF] hover:text-[#1E3F2D] border border-[#49382C]/20 dark:border-white/20 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 bg-white/50 dark:bg-white/5 cursor-pointer"
              title="Customer Login / Signup"
            >
              <User className="w-3.5 h-3.5 text-[#5E7A4A]" />
              <span className="hidden sm:inline">Customer Login</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

          {/* Admin Portal Button */}
          {currentUser?.role === 'admin' ? (
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'store' : 'admin')}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-md border transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-[#C3633D] text-white border-[#C3633D]'
                  : 'bg-[#1E3F2D] text-[#FAF7EF] border-[#1E3F2D] hover:bg-[#142C1F]'
              }`}
            >
              {activeView === 'admin' ? (
                <>
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Storefront</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthDefaultTab('admin');
                setIsAuthOpen(true);
              }}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-[#1E3F2D] dark:text-[#9FB789] bg-[#FAF7EF] dark:bg-white/5 hover:bg-[#1E3F2D]/10 border border-[#1E3F2D] dark:border-[#5E7A4A] rounded-md transition-colors whitespace-nowrap flex items-center gap-1 cursor-pointer"
              title="Farmer & Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C3633D]" />
              <span className="hidden md:inline">Admin Portal</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-3 py-1.5 text-xs font-bold text-[#FAF7EF] bg-[#1E3F2D] hover:bg-[#142C1F] dark:bg-[#5E7A4A] dark:hover:bg-[#4E663C] rounded-md transition-all shadow-xs flex items-center gap-2 whitespace-nowrap cursor-pointer active:scale-97"
            aria-label="View Basket"
          >
            <ShoppingBag className="w-4 h-4 text-[#8DA472] dark:text-white" />
            <span className="hidden sm:inline">Basket</span>
            {cartItemsCount > 0 && (
              <span className="bg-[#C3633D] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {cartItemsCount}
              </span>
            )}
            {cartSubtotal > 0 && (
              <span className="hidden sm:inline text-xs font-medium tabular-nums border-l border-white/20 pl-2">
                ₹{cartSubtotal}
              </span>
            )}
          </button>

          {/* TOP RIGHT CORNER: Dark & Light Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-xs font-semibold rounded-md border border-[#49382C]/20 dark:border-white/20 bg-white/70 dark:bg-white/10 text-[#49382C] dark:text-[#FAF7EF] hover:bg-[#FAF7EF] dark:hover:bg-white/15 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Dark and Light Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="text-[11px] font-bold hidden sm:inline text-amber-300">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#1E3F2D]" />
                <span className="text-[11px] font-bold hidden sm:inline text-[#1E3F2D]">Dark</span>
              </>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 text-[#49382C] dark:text-[#FAF7EF] hover:text-[#1E3F2D] cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF7EF] dark:bg-[#16221A] border-t border-[#49382C]/10 dark:border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search podis &amp; cut veggies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-black/30 border border-[#49382C]/20 dark:border-white/20 rounded-md text-[#49382C] dark:text-[#FAF7EF]"
            />
            <Search className="w-3.5 h-3.5 text-[#49382C]/50 dark:text-white/40 absolute left-2.5 top-3" />
          </div>

          <button
            onClick={() => handleNavScroll('hero')}
            className="block w-full text-left py-1.5 text-xs font-semibold text-[#49382C] dark:text-[#FAF7EF]"
          >
            Home
          </button>
          <button
            onClick={() => handleCategoryNav('Homemade Podis')}
            className="block w-full text-left py-1.5 text-xs font-semibold text-[#49382C] dark:text-[#FAF7EF]"
          >
            Homemade Traditional Podis (కారప్పొడులు)
          </button>
          <button
            onClick={() => handleCategoryNav("Today's Cut Vegetables")}
            className="block w-full text-left py-1.5 text-xs font-semibold text-[#49382C] dark:text-[#FAF7EF]"
          >
            Today's Fresh Cut Farm Vegetables
          </button>
          <button
            onClick={() => handleNavScroll('harvest-story')}
            className="block w-full text-left py-1.5 text-xs font-semibold text-[#49382C] dark:text-[#FAF7EF]"
          >
            Dawn Harvest &amp; Stone Craft Story
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsTrackingOpen(true);
            }}
            className="block w-full text-left py-1.5 text-xs font-semibold text-[#5E7A4A] dark:text-[#9FB789] flex items-center gap-1.5"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Track Order</span>
          </button>

          <div className="pt-3 border-t border-[#49382C]/10 dark:border-white/10 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthDefaultTab('customer');
                setIsAuthOpen(true);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold rounded bg-white dark:bg-white/10 border border-[#49382C]/20 dark:border-white/20 text-[#49382C] dark:text-[#FAF7EF]"
            >
              Customer Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentUser?.role === 'admin') {
                  setActiveView('admin');
                } else {
                  setAuthDefaultTab('admin');
                  setIsAuthOpen(true);
                }
              }}
              className="flex-1 py-2 text-center text-xs font-bold rounded bg-[#1E3F2D] text-[#FAF7EF]"
            >
              Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
