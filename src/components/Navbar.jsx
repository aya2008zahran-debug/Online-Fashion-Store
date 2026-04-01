import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartItemCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-2xl font-bold tracking-[0.3em] text-luxury-gold hover:text-white transition-colors duration-300">
              L U X E
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center">
            <Link to="/" className="text-[11px] tracking-[0.4em] uppercase text-white/80 hover:text-luxury-gold transition-colors duration-300">Home</Link>
            <Link to="/shop" className="text-[11px] tracking-[0.4em] uppercase text-white/80 hover:text-luxury-gold transition-colors duration-300">Shop</Link>
          </div>

          {/* Icons Context */}
          <div className="hidden md:flex space-x-8 items-center">
            
            {user ? (
               <div className="flex items-center space-x-6">
                 <span className="text-[10px] tracking-widest uppercase text-white/60 font-sans">
                   {user.email.split('@')[0]}
                 </span>
                 <button onClick={handleLogout} title="Logout" className="text-white hover:text-red-400 transition-colors duration-300">
                   <LogOut size={18} />
                 </button>
               </div>
            ) : (
               <Link to="/login" className="text-white hover:text-luxury-gold transition-all duration-300 transform hover:scale-110">
                 <User size={20} />
               </Link>
            )}

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-luxury-gold transition-all duration-300 transform hover:scale-110"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-6">
             <button onClick={() => setIsCartOpen(true)} className="relative text-white">
               <ShoppingBag size={24} />
               {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-luxury-gold text-black text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartItemCount}</span>}
             </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-luxury-gold focus:outline-none">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-luxury-gold/20 absolute w-full left-0 animate-fade-in shadow-2xl">
          <div className="px-4 pt-6 pb-12 space-y-4 text-center flex flex-col items-center">
            <Link to="/" className="block px-3 py-4 text-white tracking-[0.3em] uppercase text-xs hover:text-luxury-gold w-full transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block px-3 py-4 text-white tracking-[0.3em] uppercase text-xs hover:text-luxury-gold w-full transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            
            <div className="flex flex-col space-y-6 justify-center mt-8 pt-8 border-t border-white/10 w-full">
               {user ? (
                 <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block px-3 py-4 text-red-400 tracking-[0.3em] uppercase text-xs hover:bg-red-500/10 w-full transition-colors">
                    Logout
                 </button>
               ) : (
                 <Link to="/login" className="block px-3 py-4 text-luxury-gold tracking-[0.3em] uppercase text-xs w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    Login / Join
                 </Link>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
