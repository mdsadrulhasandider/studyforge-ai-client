import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, BookOpen, User as UserIcon, LogOut, LayoutDashboard, Brain, MessageSquarePlus, Compass } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => `
    px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
    ${isActive(path) 
      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20' 
      : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white font-extrabold text-xl tracking-tight">
              <Brain className="h-8 w-8 text-brand-primary animate-pulse" />
              <span>Study<span className="text-brand-primary">Forge</span> <span className="text-xs px-2 py-0.5 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30">AI</span></span>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/explore" className={linkClass('/explore')}>Explore</Link>
            <Link to="/about" className={linkClass('/about')}>About</Link>
            <Link to="/blog" className={linkClass('/blog')}>Blog</Link>
            <Link to="/contact" className={linkClass('/contact')}>Contact</Link>

            {user ? (
              <>
                <span className="h-4 w-px bg-slate-800 mx-2"></span>
                <Link to="/dashboard" className={linkClass('/dashboard')}>
                  <span className="flex items-center gap-1.5"><LayoutDashboard className="w-4 h-4" /> Dashboard</span>
                </Link>
                <Link to="/items/add" className={linkClass('/items/add')}>
                  <span className="flex items-center gap-1.5"><MessageSquarePlus className="w-4 h-4" /> Add Plan</span>
                </Link>
                <Link to="/items/manage" className={linkClass('/items/manage')}>
                  <span className="flex items-center gap-1.5"><Compass className="w-4 h-4" /> Manage</span>
                </Link>
                <Link to="/chat" className={linkClass('/chat')}>
                  <span className="flex items-center gap-1.5"><Brain className="w-4 h-4 text-brand-secondary" /> Study Buddy</span>
                </Link>
                <Link to="/profile" className="flex items-center ml-2 p-1.5 rounded-full hover:bg-slate-800 transition-colors">
                  <img 
                    src={user.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full border border-brand-primary/40 object-cover"
                  />
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="ml-2 p-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <span className="h-4 w-px bg-slate-800 mx-2"></span>
                {!isActive('/login') && (
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                {!isActive('/register') && (
                  <Link 
                    to="/register" 
                    className="px-4 py-2 text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary/90 rounded-md shadow-lg shadow-brand-primary/20 transition-all duration-200"
                  >
                    Get Started
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-850 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-2 pt-2 pb-4 space-y-1">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Home</Link>
          <Link to="/explore" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Explore</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">About</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Blog</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Contact</Link>

          {user ? (
            <>
              <div className="border-t border-slate-800 my-2 pt-2"></div>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Dashboard</Link>
              <Link to="/items/add" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Add Study Plan</Link>
              <Link to="/items/manage" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Manage Plans</Link>
              <Link to="/chat" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-brand-secondary hover:bg-slate-800">Study Buddy</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Profile</Link>
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-slate-800"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <div className="border-t border-slate-800 my-2 pt-2"></div>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white">Sign In</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-brand-primary text-center">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
