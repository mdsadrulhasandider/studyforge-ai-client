import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, GraduationCap } from 'lucide-react';

interface PlanCardProps {
  plan: {
    _id: string;
    title: string;
    shortDescription: string;
    category: string;
    difficulty: string;
    duration: string;
    rating: number;
    imageUrl: string;
  };
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <div className="glass-card glass-card-hover flex flex-col justify-between h-[420px] overflow-hidden group">
      <div>
        {/* Card Image */}
        <div className="relative h-44 overflow-hidden bg-slate-950">
          <img 
            src={plan.imageUrl || 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&h=300'} 
            alt={plan.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&h=300';
            }}
          />
          <div className="absolute top-3 left-3 bg-brand-dark/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-brand-primary border border-brand-primary/20">
            {plan.category}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex items-center space-x-1 mb-2">
            <GraduationCap className="w-4 h-4 text-brand-secondary" />
            <span className="text-xs font-medium text-slate-400">{plan.difficulty}</span>
          </div>
          <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 mb-2 hover:text-brand-primary transition-colors">
            {plan.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-3">
            {plan.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-slate-900 bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            <span>{plan.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{plan.rating}</span>
          </div>
        </div>
        
        <Link 
          to={`/plans/${plan._id}`}
          className="px-3.5 py-1.5 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white rounded-lg text-xs font-semibold border border-brand-primary/20 hover:border-transparent transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
