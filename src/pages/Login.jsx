import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to shop
  if (user) {
    return <Navigate to="/shop" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
        // Supabase might require email confirmation, but for now we'll assume auto-login or redirect
      }
      navigate('/shop');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-fade-in-up">
        <h2 className="mt-6 text-center text-4xl font-serif text-luxury-dark tracking-wide">
          {isLogin ? 'Welcome Back' : 'Join The Club'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 font-sans tracking-wide uppercase">
          {isLogin ? 'Sign in to your account' : 'Create an exclusive account'}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="bg-white py-12 px-8 shadow-luxury sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700 text-sm font-sans">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-sans mb-2">Email address</label>
              <input
                type="email"
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-luxury-dark transition-colors font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex. style@example.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 font-sans mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-luxury-dark transition-colors font-sans"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent text-sm font-sans tracking-[0.2em] font-medium text-white bg-luxury-dark hover:bg-black transition-colors uppercase disabled:opacity-50"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </div>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-serif italic">Or</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-sans text-sm tracking-widest uppercase text-luxury-dark hover:text-gray-500 transition-colors border-b border-black pb-1"
            >
              {isLogin ? 'Create a new account' : 'Log in to existing account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
