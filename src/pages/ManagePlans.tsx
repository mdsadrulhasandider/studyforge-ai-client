import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Compass, Trash2, Eye, Plus, Sparkles, BookOpen } from 'lucide-react';

export const ManagePlans: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect guard
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const [myPlans, setMyPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPlans();
  }, []);

  const fetchMyPlans = async () => {
    setLoading(true);
    try {
      const data = await api.getMyPlans();
      if (data.success) {
        setMyPlans(data.plans || []);
      }
    } catch (err) {
      console.error('Error fetching my plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the study plan "${title}"?`)) {
      try {
        const data = await api.deletePlan(id);
        if (data.success) {
          // Update plans list state locally
          setMyPlans(myPlans.filter(plan => plan._id !== id));
        } else {
          alert(`Failed to delete plan: ${data.message}`);
        }
      } catch (err: any) {
        alert(`Deletion error: ${err.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-primary mx-auto mb-4"></div>
        <p className="text-slate-400 text-sm">Fetching catalog...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Manage Study Plans</h1>
          <p className="text-slate-400 text-sm mt-1">Review, delete, or explore your custom-created schedules.</p>
        </div>
        <Link 
          to="/items/add" 
          className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-brand-primary/10 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Plan</span>
        </Link>
      </div>

      {/* Grid or Table listing */}
      {myPlans.length === 0 ? (
        <div className="text-center py-20 bg-slate-950/20 rounded-2xl border border-slate-900">
          <BookOpen className="w-12 h-12 text-slate-650 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No Study Plans Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
            You haven't added any study plans yet. Create one manually or generate structured modules using AI tools.
          </p>
          <Link 
            to="/items/add" 
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 font-semibold rounded-xl hover:border-brand-primary hover:text-white transition-all text-xs"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span>Generate First Syllabus</span>
          </Link>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-semibold">Cover</th>
                  <th className="py-4 px-6 font-semibold">Title</th>
                  <th className="py-4 px-6 font-semibold">Category</th>
                  <th className="py-4 px-6 font-semibold">Difficulty</th>
                  <th className="py-4 px-6 font-semibold">Duration</th>
                  <th className="py-4 px-6 font-semibold">Visibility</th>
                  <th className="py-4 px-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/30 text-sm text-slate-300">
                {myPlans.map((plan) => (
                  <tr key={plan._id} className="hover:bg-slate-900/30 transition-colors">
                    {/* Cover image */}
                    <td className="py-4 px-6">
                      <div className="w-14 h-9 overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
                        <img 
                          src={plan.imageUrl || 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=150&h=90'} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    
                    {/* Title & Created By */}
                    <td className="py-4 px-6 font-semibold text-white max-w-xs truncate">
                      {plan.title}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-slate-350">{plan.category}</span>
                    </td>

                    {/* Difficulty */}
                    <td className="py-4 px-6 text-xs font-semibold">
                      {plan.difficulty}
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-6 text-xs">
                      {plan.duration}
                    </td>

                    {/* Visibility */}
                    <td className="py-4 px-6 text-xs">
                      <span className={`font-semibold ${plan.isPublic ? 'text-brand-accent' : 'text-slate-500'}`}>
                        {plan.isPublic ? 'Public' : 'Private'}
                      </span>
                    </td>

                    {/* Row Actions */}
                    <td className="py-4 px-6 text-right space-x-2 shrink-0">
                      <Link 
                        to={`/plans/${plan._id}`}
                        className="inline-flex p-2 bg-slate-900 border border-slate-800 hover:border-brand-primary text-slate-400 hover:text-white rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      
                      <button 
                        onClick={() => handleDelete(plan._id, plan.title)}
                        className="inline-flex p-2 bg-slate-900 border border-slate-800 hover:border-red-650 hover:bg-red-950/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                        title="Delete Plan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
