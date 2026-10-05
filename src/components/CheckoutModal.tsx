import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Smartphone, Zap, Truck, ArrowRight } from 'lucide-react';
import { CartItem } from '../data/sneakers';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'klarna'>('apple');
  const [orderNumber, setOrderNumber] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@streetwear.io',
    address: '452 Broadway, Soho',
    city: 'New York',
    zip: '10013',
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const estimatedTax = subtotal * 0.08;
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const orderTotal = subtotal + estimatedTax + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrder = `NS-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(randomOrder);
      setStep('success');
      onOrderSuccess();
    }, 1200);
  };

  const handleFinish = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-[11px] font-black tracking-widest uppercase text-blue-600">
                Neo-Sneaks Fast Track Checkout
              </span>
            </div>
            <h2 className="text-2xl font-black uppercase font-display text-black">
              Express Deadstock Order
            </h2>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Complete your order to lock in guaranteed authenticator dispatch.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Payment Methods */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-neutral-700 block mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                      paymentMethod === 'apple'
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-gray-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="text-[11px] font-black">Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-gray-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[11px] font-black">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition cursor-pointer ${
                      paymentMethod === 'klarna'
                        ? 'border-pink-600 bg-pink-500 text-white shadow-md'
                        : 'border-gray-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    <Zap className="w-5 h-5" />
                    <span className="text-[11px] font-black">Klarna 4-Pay</span>
                  </button>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-700 block">
                  Shipping Destination
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 block mb-1">Full Name</span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 block mb-1">Email Address</span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-neutral-400 block mb-1">Street Address</span>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 block mb-1">City</span>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 block mb-1">Postal Code</span>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold bg-neutral-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Priority Courier</span>
                  <span className="font-bold text-emerald-600">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Taxes (8%)</span>
                  <span className="font-bold text-neutral-900">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-blue-600">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-wider py-4 rounded-xl transition duration-200 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Locking In Deadstock...
                  </span>
                ) : (
                  <>
                    <span>Confirm & Pay ${orderTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmed Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Deadstock Reserved
              </span>
              <h2 className="text-3xl font-black uppercase font-display text-black">
                Drop Secured!
              </h2>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-2 leading-relaxed">
                Your order is confirmed and scheduled for authentication review within 24 hours. A receipt has been dispatched to <strong className="text-black">{formData.email}</strong>.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-neutral-50 rounded-2xl p-4 border border-gray-200 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-neutral-500 uppercase font-bold text-[10px]">Order Number</span>
                <span className="font-black font-display text-black tracking-wider">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Destination</span>
                <span className="font-semibold text-neutral-800">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Estimated Delivery</span>
                <span className="font-semibold text-neutral-800 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" /> 2-3 Business Days
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="font-bold text-black">Paid in Full</span>
                <span className="font-black text-blue-600 text-sm">${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-black hover:bg-neutral-800 text-white font-black uppercase text-xs tracking-wider py-4 rounded-xl transition cursor-pointer shadow-lg"
            >
              Continue Exploring Grails
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
