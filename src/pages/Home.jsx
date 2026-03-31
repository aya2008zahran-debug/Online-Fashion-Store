import React from 'react';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div>
      <Hero />
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-luxury-dark mb-6">Discover The Art of Elegance</h2>
          <p className="text-gray-500 font-sans leading-relaxed tracking-wide">
            Our curated collection embodies the perfect balance between modern minimalism and timeless luxury. 
            Every piece is crafted with precision to elevate your everyday aesthetics.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
