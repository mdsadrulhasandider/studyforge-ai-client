import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="glass-card p-4 flex flex-col justify-between h-[380px] animate-pulse">
      <div>
        <div className="h-44 bg-slate-800 rounded-xl mb-4"></div>
        <div className="h-4 bg-slate-800 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-slate-800 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-800 rounded w-full mb-1"></div>
        <div className="h-4 bg-slate-800 rounded w-2/3"></div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="h-4 bg-slate-800 rounded w-1/3"></div>
        <div className="h-9 bg-slate-800 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export const GridLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
