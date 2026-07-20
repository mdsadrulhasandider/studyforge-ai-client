import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Key, User as UserIcon, AlertCircle, Compass } from 'lucide-react';

export const Register: React.FC = () => {
  const { registerUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all details.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await registerUser(email, password, name, role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md glass-card p-8 bg-slate-900/80 relative">
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand-secondary/10 rounded-full blur-xl"></div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
          <p className="text-slate-400 text-sm mt-2">Start forging smart weekly study checklists.</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-800/40 text-red-200 rounded-xl p-3.5 text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
              <input 
                type="text" 
                required
                placeholder="Jane Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
              <input 
                type="email" 
                required
                placeholder="jane@example.com" 
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
                required
                placeholder="Min 6 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Account Type</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${role === 'student' ? 'border-brand-primary bg-brand-primary/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-450 hover:bg-slate-900'}`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('instructor')}
                className={`py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${role === 'instructor' ? 'border-brand-secondary bg-brand-secondary/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-450 hover:bg-slate-900'}`}
              >
                <Compass className="w-4 h-4" />
                <span>Instructor</span>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-brand-secondary hover:bg-brand-secondary/95 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-secondary/10 mt-6"
          >
            <UserPlus className="w-4.5 h-4.5" />
            <span>{loading ? 'Creating Account...' : 'Register'}</span>
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-8">
          Already have an account? <Link to="/login" className="text-brand-secondary hover:underline font-semibold">Sign In here</Link>
        </p>
      </div>
    </div>
  );
};
