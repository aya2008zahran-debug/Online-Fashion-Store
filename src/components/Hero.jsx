import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen bg-black">
      {/* Background Image Loading / Cover */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop')",
        }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        {/* Animated Subtitle */}
        <p className="text-white/80 font-sans tracking-[0.3em] uppercase text-xs md:text-sm mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          New Collection 2026
        </p>

        {/* Animated Main Title */}
        <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Elegance Defined
        </h1>

        {/* Animated Button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link 
            to="/shop" 
            className="inline-block border border-white text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-white hover:text-black transition-all duration-500 ease-in-out"
          >
            Shop The Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
