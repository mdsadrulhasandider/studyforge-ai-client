import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Key, Mail, Sparkles, Chrome, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, loginDemo, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginDemo();
      navigate('/dashboard');
    } catch (err: any) {
      setError('Demo login failed. Please run seed or start backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError('Google Sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-card p-8 bg-slate-900/80 relative">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-primary/10 rounded-full blur-xl"></div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-2">Sign in to sync your personalized study blueprints.</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-800/40 text-red-200 rounded-xl p-3.5 text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-primary/10 mt-6"
          >
            <LogIn className="w-4.5 h-4.5" />
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-3 text-slate-500 font-semibold">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Google Login */}
          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="px-4 py-2.5 bg-slate-950 border border-slate-850 hover:bg-slate-900 hover:border-slate-800 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Chrome className="w-4 h-4 text-brand-primary" />
            <span>Google Login</span>
          </button>

          {/* Quick Demo Login */}
          <button 
            onClick={handleDemoLogin}
            disabled={loading}
            className="px-4 py-2.5 bg-slate-950 border border-brand-primary/30 hover:border-brand-primary/60 text-brand-primary rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            type="button"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span>Demo Account</span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          Don't have an account? <Link to="/register" className="text-brand-primary hover:underline font-semibold">Register here</Link>
        </p>
      </div>
    </div>
  );
};
