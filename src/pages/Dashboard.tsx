import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { BookOpen, Calendar, Clock, Award, Sparkles, LayoutDashboard, ChevronRight } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect guard
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardStats();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching dashboard statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-primary mx-auto mb-4"></div>
        <p className="text-slate-400 text-sm">Synthesizing statistics...</p>
      </div>
    );
  }

  const hasPlans = stats && stats.totalPlans > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-2 text-white">
        <LayoutDashboard className="w-8 h-8 text-brand-primary animate-pulse" />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Your Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Hello, {user?.name}. Review your active study metrics and category coverage.</p>
        </div>
      </div>

      {!hasPlans ? (
        <div className="text-center py-20 bg-slate-950/20 rounded-2xl border border-slate-900 space-y-6">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">No Dashboard Metrics Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Your dashboard metrics will update once you add or generate a study plan. Try creating your first plan now!
          </p>
          <Link 
            to="/items/add" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold rounded-xl transition-all text-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Study Syllabus</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          
          {/* Card Metrics Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="glass-card p-6 bg-slate-900/60 flex items-center space-x-4">
              <div className="p-3.5 bg-brand-primary/10 rounded-xl text-brand-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">{stats.totalPlans}</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Plans</div>
              </div>
            </div>

            <div className="glass-card p-6 bg-slate-900/60 flex items-center space-x-4">
              <div className="p-3.5 bg-brand-secondary/10 rounded-xl text-brand-secondary">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">{stats.categoryData?.length || 0}</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Categories</div>
              </div>
            </div>

            <div className="glass-card p-6 bg-slate-900/60 flex items-center space-x-4">
              <div className="p-3.5 bg-brand-accent/10 rounded-xl text-brand-accent">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">
                  {stats.studyHoursData?.reduce((acc: number, item: any) => acc + item.hours, 0) || 0} hrs/wk
                </div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Commitments</div>
              </div>
            </div>

            <div className="glass-card p-6 bg-slate-900/60 flex items-center space-x-4">
              <div className="p-3.5 bg-amber-500/10 rounded-xl text-amber-500">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">A+ Blueprint</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Target Level</div>
              </div>
            </div>

          </div>

          {/* Recharts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart 1: Categories Bar Chart */}
            <div className="lg:col-span-7 glass-card p-6 bg-slate-900/40">
              <h3 className="text-md font-bold text-white mb-6 uppercase tracking-wider text-left">Subject Category Distribution</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                      itemStyle={{ color: '#6366f1' }}
                    />
                    <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]}>
                      {stats.categoryData?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Difficulty Level Pie Chart */}
            <div className="lg:col-span-5 glass-card p-6 bg-slate-900/40">
              <h3 className="text-md font-bold text-white mb-6 uppercase tracking-wider text-left">Difficulty Ratio</h3>
              <div className="h-80 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.difficultyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.difficultyData?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Weekly Commitments distribution */}
            <div className="lg:col-span-12 glass-card p-6 bg-slate-900/40">
              <h3 className="text-md font-bold text-white mb-6 uppercase tracking-wider text-left">Estimated Study Hours per Course Blueprint</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.studyHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" hr" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                    />
                    <Bar dataKey="hours" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Quick actions panel */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-between items-center">
            <Link 
              to="/chat" 
              className="w-full sm:w-auto p-4 bg-slate-950/60 border border-slate-800 hover:border-brand-secondary/40 rounded-xl flex items-center justify-between text-left group transition-all"
            >
              <div className="flex items-center space-x-3.5 pr-8">
                <div className="p-2 bg-brand-secondary/15 rounded-lg text-brand-secondary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Ask your Study Buddy</h4>
                  <p className="text-xs text-slate-500">Need exam preparation methods or notes?</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-650 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/explore" 
              className="w-full sm:w-auto p-4 bg-slate-950/60 border border-slate-800 hover:border-brand-primary/40 rounded-xl flex items-center justify-between text-left group transition-all"
            >
              <div className="flex items-center space-x-3.5 pr-8">
                <div className="p-2 bg-brand-primary/15 rounded-lg text-brand-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Explore public catalogs</h4>
                  <p className="text-xs text-slate-500">Search and find syllabi in math, science, and coding.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-650 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      )}
    </div>
  );
};
