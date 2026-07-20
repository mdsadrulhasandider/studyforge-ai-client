import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldAlert, Award, LogOut } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="glass-card p-8 bg-slate-900/60 text-center relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl"></div>

        {/* Profile Avatar */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <img 
            src={user.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150'} 
            alt={user.name} 
            className="w-28 h-28 rounded-full border-2 border-brand-primary object-cover shadow-xl"
          />
          <div className="absolute bottom-1 right-1 bg-brand-primary text-white p-1.5 rounded-full text-xs font-bold border border-slate-900 uppercase tracking-widest">
            {user.role.charAt(0)}
          </div>
        </div>

        {/* Info detail */}
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-extrabold text-white">{user.name}</h2>
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-400">
            <Mail className="w-4 h-4 text-brand-primary" />
            <span>{user.email}</span>
          </div>
        </div>

        {/* Spec details grid */}
        <div className="grid grid-cols-2 gap-4 text-left border-t border-slate-950 pt-6 mb-8 text-sm">
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Account Role</span>
            <div className="text-white font-bold capitalize flex items-center gap-1">
              <Award className="w-4 h-4 text-brand-accent" /> {user.role}
            </div>
          </div>

          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 space-y-1">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">User Status</span>
            <div className="text-white font-bold flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-brand-secondary" /> Active Sync
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full py-3 bg-red-950/20 hover:bg-red-950/40 border border-red-900/20 hover:border-red-800 text-red-300 font-semibold rounded-xl text-sm flex items-center justify-center space-x-2 transition-all"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Log Out of Session</span>
        </button>
      </div>
    </div>
  );
};
