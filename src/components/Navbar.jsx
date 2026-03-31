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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className={`font-serif text-2xl font-bold tracking-wider ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>
              L U X E
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`text-sm tracking-widest uppercase transition-colors hover:text-gray-400 ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>Home</Link>
            <Link to="/shop" className={`text-sm tracking-widest uppercase transition-colors hover:text-gray-400 ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>Shop</Link>
          </div>

          {/* Icons Context */}
          <div className="hidden md:flex space-x-6 items-center">
            
            {user ? (
               <div className="flex items-center space-x-4">
                 <span className={`text-xs font-serif italic ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`}>
                   {user.email.split('@')[0]}
                 </span>
                 <button onClick={handleLogout} title="Logout" className={`hover:text-red-400 transition-colors ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>
                   <LogOut size={18} />
                 </button>
               </div>
            ) : (
               <Link to="/login" className={`hover:text-gray-400 transition-colors ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>
                 <User size={20} />
               </Link>
            )}

            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative hover:text-gray-400 transition-colors ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-sans shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
             <button onClick={() => setIsCartOpen(true)} className={`relative ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>
               <ShoppingBag size={24} />
               {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-sans shadow-lg">{cartItemCount}</span>}
             </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`${isScrolled ? 'text-luxury-dark' : 'text-white'} hover:text-gray-400 focus:outline-none`}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full left-0 animate-fade-in shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1 text-center flex flex-col items-center">
            <Link to="/" className="block px-3 py-3 text-luxury-dark tracking-widest uppercase text-sm hover:bg-gray-50 w-full" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block px-3 py-3 text-luxury-dark tracking-widest uppercase text-sm hover:bg-gray-50 w-full" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            
            <div className="flex flex-col space-y-4 justify-center mt-4 border-t border-gray-100 w-full">
               {user ? (
                 <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block px-3 py-3 text-red-500 tracking-widest uppercase text-sm hover:bg-red-50 w-full transition-colors">
                    Logout
                 </button>
               ) : (
                 <Link to="/login" className="block px-3 py-3 text-luxury-dark tracking-widest uppercase text-sm hover:bg-gray-50 w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    Login / Create Account
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
