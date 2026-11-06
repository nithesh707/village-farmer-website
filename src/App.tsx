import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GhaniProcessSection } from './components/GhaniProcessSection';
import { ProductCatalogSection } from './components/ProductCatalogSection';
import { CustomerTestimonials } from './components/CustomerTestimonials';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { FarmerAuthModal } from './components/FarmerAuthModal';
import { FarmerAdminDashboard } from './components/FarmerAdminDashboard';
import { CustomerPortalView } from './components/CustomerPortalView';

const AppContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen bg-[#FAF7EF] dark:bg-[#121915] text-[#49382C] dark:text-stone-100 font-sans flex flex-col selection:bg-[#C3633D]/30 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'admin' ? (
          <FarmerAdminDashboard />
        ) : activeView === 'customer-portal' ? (
          <CustomerPortalView />
        ) : (
          <>
            <Hero />
            <GhaniProcessSection />
            <ProductCatalogSection />
            <CustomerTestimonials />
            <AboutSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <ProductDetailModal />
      <OrderTrackingModal />
      <FarmerAuthModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
