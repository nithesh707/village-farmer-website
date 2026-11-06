import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, Mail, User, Phone, ArrowRight, Loader2, ShieldCheck, Sprout } from 'lucide-react';

export const FarmerAuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, authDefaultTab, login, signup, isLoading } = useStore();
  const [activeTab, setActiveTab] = useState<'admin' | 'customer'>(authDefaultTab);
  const [isCustomerSignUp, setIsCustomerSignUp] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Guntur');
  const [pincode, setPincode] = useState('522002');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(authDefaultTab);
    if (authDefaultTab === 'admin') {
      setEmail('admin@villagefarmer.in');
      setPassword('VillageFarmer2026');
    } else {
      setEmail('sujatha.customer@gmail.com');
      setPassword('Customer123');
    }
  }, [authDefaultTab, isAuthOpen]);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (activeTab === 'admin') {
      const res = await login(email, password, 'admin');
      if (!res.success) {
        setErrorMessage(res.message || 'Invalid admin credentials');
      }
    } else {
      if (isCustomerSignUp) {
        const res = await signup({ name, email, phone, address, city, pincode, password });
        if (!res.success) {
          setErrorMessage(res.message || 'Signup failed');
        }
      } else {
        const res = await login(email, password, 'customer');
        if (!res.success) {
          setErrorMessage(res.message || 'Login failed');
        }
      }
    }
  };

  const handleFillDemoAdmin = () => {
    setActiveTab('admin');
    setEmail('admin@villagefarmer.in');
    setPassword('VillageFarmer2026');
    setErrorMessage(null);
  };

  const handleFillDemoCustomer = () => {
    setActiveTab('customer');
    setIsCustomerSignUp(false);
    setEmail('sujatha.customer@gmail.com');
    setPassword('Customer123');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="relative bg-[#FAF7EF] dark:bg-[#18231c] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#49382C]/15 dark:border-white/15 my-6 animate-fade-in">
        {/* Header */}
        <div className="p-5 border-b border-[#49382C]/10 dark:border-white/10 bg-white dark:bg-[#1f2d24] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white flex items-center justify-center text-lg shadow-sm">
              <Sprout className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1E3F2D] dark:text-[#FAF7EF]">
                {activeTab === 'admin' ? 'Village Farmer Admin Portal' : 'Customer Account Portal'}
              </h3>
              <p className="text-[11px] text-[#49382C]/70 dark:text-stone-300">
                {activeTab === 'admin'
                  ? 'Manage orders, customer directory & stock ON/OFF switches'
                  : 'Track stone-pounded podis & dawn-cut vegetable dispatches'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthOpen(false)}
            className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-white/10 text-[#49382C] dark:text-stone-200 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle: Admin vs Customer */}
        <div className="p-2.5 bg-[#FAF7EF] dark:bg-[#121915] border-b border-[#49382C]/10 dark:border-white/10 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setEmail('admin@villagefarmer.in');
              setPassword('VillageFarmer2026');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white shadow-xs'
                : 'text-[#49382C] dark:text-stone-300 hover:bg-white dark:hover:bg-white/5'
            }`}
          >
            Farmer Admin Portal
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setEmail('sujatha.customer@gmail.com');
              setPassword('Customer123');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'customer'
                ? 'bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white shadow-xs'
                : 'text-[#49382C] dark:text-stone-300 hover:bg-white dark:hover:bg-white/5'
            }`}
          >
            Customer Portal
          </button>
        </div>

        {/* Customer Login vs Register selector */}
        {activeTab === 'customer' && (
          <div className="px-6 pt-3 flex justify-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsCustomerSignUp(false)}
              className={`pb-1 border-b-2 cursor-pointer ${
                !isCustomerSignUp
                  ? 'border-[#1E3F2D] dark:border-amber-400 text-[#1E3F2D] dark:text-amber-400'
                  : 'border-transparent text-[#49382C]/60 dark:text-stone-400 hover:text-[#49382C] dark:hover:text-stone-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsCustomerSignUp(true)}
              className={`pb-1 border-b-2 cursor-pointer ${
                isCustomerSignUp
                  ? 'border-[#1E3F2D] dark:border-amber-400 text-[#1E3F2D] dark:text-amber-400'
                  : 'border-transparent text-[#49382C]/60 dark:text-stone-400 hover:text-[#49382C] dark:hover:text-stone-200'
              }`}
            >
              Create New Account
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-lg">
              {errorMessage}
            </div>
          )}

          {activeTab === 'customer' && isCustomerSignUp && (
            <div>
              <label className="text-[11px] font-bold text-[#49382C] dark:text-stone-300 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Sujatha Venkatesh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                />
                <User className="w-3.5 h-3.5 text-[#49382C]/40 dark:text-white/40 absolute left-2.5 top-2.5" />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-[#49382C] dark:text-stone-300 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
              />
              <Mail className="w-3.5 h-3.5 text-[#49382C]/40 dark:text-white/40 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#49382C] dark:text-stone-300 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
              />
              <Lock className="w-3.5 h-3.5 text-[#49382C]/40 dark:text-white/40 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {activeTab === 'customer' && isCustomerSignUp && (
            <>
              <div>
                <label className="text-[11px] font-bold text-[#49382C] dark:text-stone-300 block mb-1">Phone Number (10 Digits)</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="94401 82910"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                  />
                  <Phone className="w-3.5 h-3.5 text-[#49382C]/40 dark:text-white/40 absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#49382C] dark:text-stone-300 block mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="Flat / House No, Street, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#49382C] dark:text-stone-300 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#49382C] dark:text-stone-300 block mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                  />
                </div>
              </div>
            </>
          )}

          {/* Quick Demo Credentials Box */}
          {activeTab === 'admin' ? (
            <div className="p-3 bg-white dark:bg-[#121915] rounded-lg border border-[#49382C]/10 dark:border-white/10 text-[11px] text-[#49382C]/80 dark:text-stone-300 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1E3F2D] dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Demo Admin Login:
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoAdmin}
                  className="text-[#C3633D] dark:text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  Auto Fill &rarr;
                </button>
              </div>
              <p className="font-mono text-[10px] text-[#49382C]/70 dark:text-stone-400">
                admin@villagefarmer.in / VillageFarmer2026
              </p>
            </div>
          ) : (
            <div className="p-3 bg-white dark:bg-[#121915] rounded-lg border border-[#49382C]/10 dark:border-white/10 text-[11px] text-[#49382C]/80 dark:text-stone-300 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1E3F2D] dark:text-emerald-400">Demo Customer Account:</span>
                <button
                  type="button"
                  onClick={handleFillDemoCustomer}
                  className="text-[#C3633D] dark:text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  Auto Fill &rarr;
                </button>
              </div>
              <p className="font-mono text-[10px] text-[#49382C]/70 dark:text-stone-400">
                sujatha.customer@gmail.com / Customer123
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#1E3F2D] dark:bg-[#5E7A4A] hover:bg-[#152e21] text-[#FAF7EF] text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>
                  {activeTab === 'admin'
                    ? 'Enter Farmer Admin Portal'
                    : isCustomerSignUp
                    ? 'Create Customer Account'
                    : 'Sign In to Customer Account'}
                </span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
