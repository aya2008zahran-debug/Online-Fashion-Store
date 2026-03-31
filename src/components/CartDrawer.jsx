import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-serif text-xl tracking-wider text-luxury-dark uppercase">Your Bag</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
               <span className="font-serif italic text-lg">Your bag is empty</span>
               <button onClick={() => setIsCartOpen(false)} className="text-sm font-sans tracking-widest uppercase pb-1 border-b border-black text-black">
                 Continue Shopping
               </button>
             </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <img src={item.image_url} alt={item.name} className="w-24 h-32 object-cover bg-gray-50" />
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-sans text-luxury-dark w-3/4">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{item.category}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-gray-200 w-fit">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-500 hover:text-black transition-colors"><Minus size={14}/></button>
                      <span className="text-xs font-sans w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-500 hover:text-black transition-colors"><Plus size={14}/></button>
                    </div>
                    <span className="font-serif text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6 font-serif">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-lg text-luxury-dark">${cartTotal.toFixed(2)}</span>
            </div>
            
            <p className="text-[10px] text-gray-400 font-sans text-center mb-6 uppercase tracking-wider">
              Shipping & taxes calculated at checkout
            </p>

            <button 
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
              className="w-full bg-luxury-dark text-white py-4 uppercase font-sans text-xs tracking-[0.2em] font-medium hover:bg-black transition-colors duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
