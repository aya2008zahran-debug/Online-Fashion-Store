import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetching from 'products' table in Supabase
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      // If no data or table doesn't exist, we use a fallback array to demonstrate the UI
      if (!data || data.length === 0) {
        setProducts(fallbackProducts);
      } else {
        setProducts(data);
      }
      
    } catch (err) {
      console.error("Error fetching products:", err.message);
      setError("Could not connect to database or table 'products' does not exist yet.");
      // Using fallback data for demo purposes since the table might be empty/missing
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Men', 'Women', 'Accessories'];

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Page Header */}
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-serif text-luxury-dark mb-4">The Collection</h1>
        <p className="text-gray-500 font-sans tracking-wide">Timeless elegance, redefined for the modern era.</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center space-x-8 mb-16 border-b border-gray-200 pb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
              activeFilter === category 
                ? 'text-luxury-dark border-b-2 border-black font-semibold pb-4 -mb-[17px]' 
                : 'text-gray-400 hover:text-black'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading & Error States */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
           <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 my-10 p-4 border border-red-100 bg-red-50/50 rounded animate-fade-in">
           <p className="font-sans mb-2">{error}</p>
           <p className="text-sm text-gray-500">Showing demo products instead.</p>
        </div>
      ) : null}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {!loading && filteredProducts.length === 0 && (
         <div className="text-center text-gray-400 mt-20 font-serif italic">
           No products found for this category.
         </div>
      )}
    </div>
  );
};

// Fallback data in case the database is empty or not set up yet
const fallbackProducts = [
  { id: 1, name: 'Silk Evening Gown', price: 1200, category: 'Women', image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2942&auto=format&fit=crop' },
  { id: 2, name: 'Classic Wool Blazer', price: 850, category: 'Men', image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2800&auto=format&fit=crop' },
  { id: 3, name: 'Leather Crossbody Bag', price: 450, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2938&auto=format&fit=crop' },
  { id: 4, name: 'Cashmere Turtleneck', price: 600, category: 'Women', image_url: 'https://images.unsplash.com/photo-1614741369527-dc8051280fcb?q=80&w=2835&auto=format&fit=crop' },
  { id: 5, name: 'Chrono Dress Watch', price: 1500, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2899&auto=format&fit=crop' },
  { id: 6, name: 'Tailored Trousers', price: 350, category: 'Men', image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2808&auto=format&fit=crop' },
];

export default Shop;
