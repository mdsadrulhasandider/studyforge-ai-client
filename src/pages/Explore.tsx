import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { PlanCard } from '../components/PlanCard';
import { GridLoader } from '../components/Loader';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const Explore: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sort, setSort] = useState('newest');
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const categories = ['Computer Science', 'Data Science', 'Mathematics', 'Design', 'General Studies'];

  useEffect(() => {
    fetchPlans();
  }, [search, category, difficulty, sort, page]);

  // Reset page when search or filter parameters modify
  const handleParamChange = (updater: () => void) => {
    updater();
    setPage(1);
  };

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await api.getPlans({
        search,
        category,
        difficulty,
        sort,
        page
      });
      if (data.success) {
        setPlans(data.plans || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.total || 0);
      }
    } catch (err) {
      console.error('Error fetching plans in Explore page:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Explore Study Plans</h1>
        <p className="text-slate-400 text-sm mt-1">Discover, learn, and structure your curriculum using community blueprints.</p>
      </div>

      {/* Search and Filters panel */}
      <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search Bar */}
        <div className="relative md:col-span-5">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search study plans (e.g. MERN, Python)..." 
            value={search}
            onChange={(e) => handleParamChange(() => setSearch(e.target.value))}
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
          />
        </div>

        {/* Category Filter */}
        <div className="relative md:col-span-2.5">
          <select 
            value={category}
            onChange={(e) => handleParamChange(() => setCategory(e.target.value))}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-350 focus:outline-none focus:border-brand-primary appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="relative md:col-span-2.5">
          <select 
            value={difficulty}
            onChange={(e) => handleParamChange(() => setDifficulty(e.target.value))}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-355 focus:outline-none focus:border-brand-primary appearance-none cursor-pointer"
          >
            <option value="">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Sorting Selection */}
        <div className="relative md:col-span-2">
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-360 focus:outline-none focus:border-brand-primary appearance-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rating</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Results details info */}
      <div className="text-xs text-slate-400 font-semibold tracking-wider">
        Showing {plans.length} of {totalCount} matching blueprints.
      </div>

      {/* Grid rendering */}
      {loading ? (
        <GridLoader />
      ) : plans.length === 0 ? (
        <div className="text-center py-20 bg-slate-950/20 rounded-2xl border border-slate-900">
          <SlidersHorizontal className="w-12 h-12 text-slate-650 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No Study Plans Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria, clearing filters, or navigate to Add Study Plan to generate a fresh curriculum using AI.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {plans.map(plan => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 pt-6 border-t border-slate-900">
          <button 
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm text-slate-400 font-medium">
            Page {page} of {totalPages}
          </span>

          <button 
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
