import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerOrder } from '../types';
import { X, CheckCircle, ShieldCheck, CreditCard, Banknote, ArrowRight, Phone, MapPin, Loader2, Sprout } from 'lucide-react';

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onSuccess }) => {
  const { cart, cartSubtotal, deliveryCharges, cartTotal, placeOrder, currentUser, setIsTrackingOpen, setActiveView } = useStore();

  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [city, setCity] = useState(currentUser?.city || 'Guntur');
  const [state, setState] = useState('Andhra Pradesh');
  const [pincode, setPincode] = useState(currentUser?.pincode || '522002');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'razorpay'>('cod');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);
  const [isSimulatingRazorpay, setIsSimulatingRazorpay] = useState(false);

  const southIndianCities = ['Guntur', 'Vijayawada', 'Hyderabad', 'Tenali', 'Visakhapatnam', 'Tirupati', 'Rajahmundry', 'Bengaluru', 'Chennai', 'Warangal', 'Nellore', 'Kurnool'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for dispatch tracking.');
      return;
    }
    if (!address.trim() || address.length < 8) {
      setErrorMessage('Please enter a complete delivery address (Door No, Building, Street, Landmark).');
      return;
    }
    if (!pincode.trim() || pincode.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit postal PIN code.');
      return;
    }

    if (paymentMethod === 'razorpay') {
      setIsSimulatingRazorpay(true);
      setTimeout(async () => {
        setIsSimulatingRazorpay(false);
        await executeOrder();
      }, 1800);
    } else {
      await executeOrder();
    }
  };

  const executeOrder = async () => {
    setIsSubmitting(true);
    const result = await placeOrder({
      customerName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      deliveryAddress: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      orderNotes: orderNotes.trim(),
      paymentMethod,
    });

    setIsSubmitting(false);

    if (result.success && result.order) {
      setConfirmedOrder(result.order);
    } else {
      setErrorMessage(result.message || 'Failed to place order. Some items may have gone out of stock.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="relative bg-[#FAF7EF] dark:bg-[#18231c] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#49382C]/15 dark:border-white/10 my-6 animate-fade-in">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#49382C]/10 dark:border-white/10 bg-white dark:bg-[#1f2d24] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1E3F2D] dark:bg-[#5E7A4A] text-white flex items-center justify-center text-lg">
              <Sprout className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1E3F2D] dark:text-[#FAF7EF]">
                {confirmedOrder ? 'Order Placed Successfully!' : 'Village Farmer Delivery & Checkout'}
              </h3>
              <p className="text-[11px] text-[#49382C]/70 dark:text-stone-300">
                {confirmedOrder
                  ? 'Your dispatch is confirmed from Ravela Village Farm, Guntur'
                  : 'Direct Farm-to-Home dispatch across AP, Telangana & All India'}
              </p>
            </div>
          </div>

          <button
            onClick={confirmedOrder ? onSuccess : onClose}
            className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-white/10 text-[#49382C] dark:text-stone-300 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Razorpay simulation overlay */}
        {isSimulatingRazorpay && (
          <div className="absolute inset-0 z-20 bg-white/95 dark:bg-[#18231c]/95 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#1E3F2D]/10 dark:bg-white/10 flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-[#1E3F2D] dark:text-amber-400 animate-spin" />
            </div>
            <div className="text-xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
              Connecting to Razorpay Gateway...
            </div>
            <p className="text-xs text-[#49382C]/75 dark:text-stone-300 mt-1 max-w-xs">
              Simulating instant UPI / Google Pay / Card payment of <strong className="text-[#1E3F2D] dark:text-amber-400">₹{cartTotal}</strong>
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#5E7A4A] dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>256-Bit Encrypted Indian Banking Gateway</span>
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {confirmedOrder ? (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">
                Order #{confirmedOrder.id} Placed!
              </h4>
              <p className="text-xs text-[#49382C]/80 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
                Thank you for supporting traditional rural farming at Ravela Village, Guntur. Your stone-pounded karapodis and dawn-cut vegetables are being prepared for dispatch.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-white dark:bg-[#1f2d24] rounded-xl p-4 border border-[#49382C]/10 dark:border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#49382C]/10 dark:border-white/10">
                <span className="text-[#49382C]/70 dark:text-stone-400">Recipient:</span>
                <span className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">{confirmedOrder.customerName} ({confirmedOrder.phone})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#49382C]/10 dark:border-white/10">
                <span className="text-[#49382C]/70 dark:text-stone-400">Delivery Address:</span>
                <span className="font-semibold text-right max-w-xs truncate text-[#49382C] dark:text-stone-200">
                  {confirmedOrder.deliveryAddress}, {confirmedOrder.city}, {confirmedOrder.state} - {confirmedOrder.pincode}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#49382C]/10 dark:border-white/10">
                <span className="text-[#49382C]/70 dark:text-stone-400">Payment:</span>
                <span className="font-bold uppercase tracking-wider text-[#C3633D] dark:text-amber-400">
                  {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (Pending)' : 'Razorpay (Paid Online)'}
                </span>
              </div>

              {/* Items */}
              <div>
                <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF] mb-1">Batch Items ({confirmedOrder.items.length}):</p>
                <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-[11px] py-0.5 border-b border-stone-100 dark:border-white/5 last:border-0 text-[#49382C] dark:text-stone-200">
                      <span>{it.name} ({it.selectedVariant}) &times; {it.quantity}</span>
                      <span className="font-bold tabular-nums">₹{it.subtotal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#49382C]/10 dark:border-white/10 font-bold text-sm text-[#1E3F2D] dark:text-[#FAF7EF]">
                <span>Total Amount</span>
                <span className="text-base tabular-nums">₹{confirmedOrder.totalAmount}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onSuccess();
                  setIsTrackingOpen(true);
                }}
                className="flex-1 py-3 px-4 bg-[#1E3F2D] dark:bg-[#5E7A4A] hover:bg-[#152e21] text-[#FAF7EF] text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Track Order Live</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
              <button
                onClick={() => {
                  onSuccess();
                  setActiveView('customer-portal');
                }}
                className="py-3 px-4 bg-white dark:bg-white/10 border border-[#1E3F2D] dark:border-white/20 text-[#1E3F2D] dark:text-white text-xs font-bold rounded-lg hover:bg-[#FAF7EF] dark:hover:bg-white/15 cursor-pointer"
              >
                View in Customer Portal
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
            {errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
                {errorMessage}
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-[#1E3F2D] dark:text-[#FAF7EF] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C3633D] dark:text-amber-400" />
                <span>1. Customer &amp; Delivery Destination</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#49382C] dark:text-stone-300 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sujatha Venkatesh"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#49382C] dark:text-stone-300 block mb-1">Mobile (10 Digits) *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="98480 22338"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                    />
                    <Phone className="w-3.5 h-3.5 text-[#49382C]/40 dark:text-white/40 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#49382C] dark:text-stone-300 block mb-1">
                  Complete Delivery Address (Door No, Building, Street, Landmark) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Flat 402, Sai Teja Residency, Brodipet 4th line, near Old Bus Stand"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-[#49382C] dark:text-stone-300 block mb-1">City / Town *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-2 py-2 bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                  >
                    {southIndianCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Other South India">Other City/Town</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#49382C] dark:text-stone-300 block mb-1">State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-2 py-2 bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Other Indian State">Other State</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#49382C] dark:text-stone-300 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="522002"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-2 py-2 bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#49382C]/80 dark:text-stone-400 block mb-1">
                  Delivery / Farm Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please harvest small tender brinjals / pack podis in airtight pouches"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#121915] border border-[#49382C]/20 dark:border-white/20 rounded-lg text-[#1E3F2D] dark:text-white"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="pt-3 border-t border-[#49382C]/10 dark:border-white/10 space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[#1E3F2D] dark:text-[#FAF7EF] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#5E7A4A] dark:text-emerald-400" />
                <span>2. Select Payment Method</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-white dark:bg-[#1f2d24] border-[#1E3F2D] dark:border-amber-400 ring-1 ring-[#1E3F2D] dark:ring-amber-400 shadow-xs'
                      : 'bg-white/60 dark:bg-white/5 border-[#49382C]/15 dark:border-white/10 hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#1E3F2D] dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Cash on Delivery</p>
                    <p className="text-[10px] text-[#49382C]/70 dark:text-stone-400">Pay when farm shipment arrives</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'razorpay'
                      ? 'bg-white dark:bg-[#1f2d24] border-[#1E3F2D] dark:border-amber-400 ring-1 ring-[#1E3F2D] dark:ring-amber-400 shadow-xs'
                      : 'bg-white/60 dark:bg-white/5 border-[#49382C]/15 dark:border-white/10 hover:bg-white dark:hover:bg-white/10'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C3633D] dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#1E3F2D] dark:text-[#FAF7EF]">Online / Razorpay</p>
                    <p className="text-[10px] text-[#49382C]/70 dark:text-stone-400">UPI, Google Pay, Cards, Netbanking</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-3 bg-white dark:bg-[#1f2d24] rounded-xl border border-[#49382C]/10 dark:border-white/10 space-y-1">
              <div className="flex justify-between text-[#49382C]/75 dark:text-stone-300">
                <span>Items Subtotal:</span>
                <span className="tabular-nums font-bold text-[#1E3F2D] dark:text-white">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-[#49382C]/75 dark:text-stone-300">
                <span>Direct Farm Shipping:</span>
                <span className="tabular-nums font-bold text-[#1E3F2D] dark:text-white">
                  {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1E3F2D] dark:text-[#FAF7EF] pt-1.5 border-t border-[#49382C]/10 dark:border-white/10">
                <span>Final Total to Pay:</span>
                <span className="text-base tabular-nums">₹{cartTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSimulatingRazorpay}
              className="w-full py-3.5 px-4 bg-[#1E3F2D] dark:bg-[#5E7A4A] hover:bg-[#152e21] text-[#FAF7EF] text-sm font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Confirming Order...</span>
                </>
              ) : (
                <>
                  <span>Place Order (₹{cartTotal})</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[#49382C]/60 dark:text-stone-400">
              🔒 Safe &amp; verified direct farm order from Ravela Village, Guntur.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
