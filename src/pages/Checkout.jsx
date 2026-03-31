import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex flex-col justify-center items-center bg-gray-50">
        <div className="max-w-md w-full text-center bg-white p-12 shadow-luxury animate-fade-in-up">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-serif text-luxury-dark mb-4">Order Confirmed</h2>
          <p className="text-gray-500 font-sans mb-8">Thank you for your purchase. Your order has been placed and is being processed.</p>
          <Link to="/shop" className="inline-block border border-black text-black px-10 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-black hover:text-white transition-all duration-500">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty and not just completed
  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 text-center">
        <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-sm font-sans tracking-widest uppercase border-b border-black pb-1">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-sans uppercase tracking-widest text-gray-400 mb-10">
        <Link to="/shop" className="hover:text-black transition-colors flex items-center"><ArrowLeft size={14} className="mr-2"/> Back to Shop</Link>
        <ChevronRight size={14} />
        <span className="text-luxury-dark font-medium cursor-pointer">Information</span>
        <ChevronRight size={14} />
        <span>Payment</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Checkout Form */}
        <div className="flex-1 order-2 lg:order-1">
          <form onSubmit={handleCheckout} className="space-y-12">
            
            {/* Contact Info */}
            <div>
              <div className="flex justify-between items-baseline mb-6">
                <h2 className="text-2xl font-serif text-luxury-dark">Contact Information</h2>
                {!user && (
                   <div className="text-xs font-sans tracking-widest text-gray-500">
                     Already have an account? <Link to="/login" className="text-black underline">Log in</Link>
                   </div>
                )}
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black font-sans bg-transparent"
                placeholder="Email Address"
              />
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-2xl font-serif text-luxury-dark mb-6">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="col-span-1">
                   <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="First Name" />
                </div>
                <div className="col-span-1">
                   <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="Last Name" />
                </div>
                <div className="col-span-2">
                   <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="Address" />
                </div>
                <div className="col-span-2">
                   <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="City" />
                </div>
                <div className="col-span-1">
                   <input type="text" name="country" required value={formData.country} onChange={handleInputChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="Country" />
                </div>
                <div className="col-span-1">
                   <input type="text" name="zip" required value={formData.zip} onChange={handleInputChange} className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="Postal Code" />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-2xl font-serif text-luxury-dark mb-6">Payment</h2>
              <div className="p-6 border border-gray-200 bg-gray-50/50 space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-sans tracking-widest text-gray-500 mb-2">Card Number</label>
                  <input type="text" name="cardNumber" required value={formData.cardNumber} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-sans tracking-widest text-gray-500 mb-2">Expiry Date</label>
                    <input type="text" name="expiry" required value={formData.expiry} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-sans tracking-widest text-gray-500 mb-2">Security Code</label>
                    <input type="text" name="cvc" required value={formData.cvc} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black font-sans bg-transparent" placeholder="CVC" />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-luxury-dark text-white py-5 uppercase font-sans text-sm tracking-[0.2em] font-medium hover:bg-black transition-colors duration-300 disabled:opacity-50 mt-8"
            >
              {isProcessing ? 'Processing Payment...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>

          </form>
        </div>

        {/* Order Summary sidebar */}
        <div className="flex-1 order-1 lg:order-2">
           <div className="bg-gray-50 p-8 lg:sticky lg:top-32">
             <h3 className="font-serif text-xl border-b border-gray-200 pb-4 mb-6">Order Summary</h3>
             
             <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
               {cart.map((item) => (
                 <div key={item.id} className="flex gap-4">
                   <div className="relative">
                      <img src={item.image_url} alt={item.name} className="w-16 h-20 object-cover" />
                      <span className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{item.quantity}</span>
                   </div>
                   <div className="flex-1 pt-1">
                     <h4 className="font-sans text-sm w-4/5 text-luxury-dark">{item.name}</h4>
                     <p className="font-serif text-gray-500 text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                   </div>
                 </div>
               ))}
             </div>

             <div className="border-t border-gray-200 pt-6 space-y-4 font-sans text-sm">
               <div className="flex justify-between text-gray-600">
                 <span>Subtotal</span>
                 <span>${cartTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-gray-600">
                 <span>Shipping</span>
                 <span>Free</span>
               </div>
               <div className="flex justify-between items-center text-luxury-dark border-t border-black pt-4 mt-2 font-serif text-xl">
                 <span>Total</span>
                 <span>${cartTotal.toFixed(2)} USD</span>
               </div>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
