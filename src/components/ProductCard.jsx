import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
        <img 
          src={product.image_url || 'https://images.unsplash.com/photo-1596755094514-f8ca9ba98fb8?q=80&w=2787&auto=format&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-cover object-center product-image-hover" 
        />
        
        {/* Hover Add to Bag overlay */}
        <div className="absolute bottom-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation if card is clickable later
              addToCart(product);
            }}
            className="w-full bg-luxury-dark/95 backdrop-blur-sm text-white py-3 uppercase text-xs tracking-[0.1em] hover:bg-black transition-colors"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center text-center px-2">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{product.category || 'Collection'}</span>
        <h3 className="text-sm font-sans tracking-wide text-luxury-dark mb-1 group-hover:text-black transition-colors truncate w-full">
          {product.name}
        </h3>
        <p className="font-serif text-gray-600 text-sm italic">
          ${Number(product.price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
