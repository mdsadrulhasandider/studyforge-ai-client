import React from 'react';
import { BookOpen, Calendar, Clock, User, Heart } from 'lucide-react';

export const Blog: React.FC = () => {
  const blogs = [
    {
      title: 'How to Study with Feynman Technique',
      excerpt: 'Learn the ultimate four-step method to comprehend complex programming paradigms or mathematics concepts by explaining them simply.',
      author: 'Dr. Evelyn Carter',
      readTime: '5 min read',
      date: 'July 10, 2026',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&h=200'
    },
    {
      title: 'Active Recall vs Passive Reading',
      excerpt: 'Testing yourself consistently stimulates neural networks, producing double the retention rate compared to re-reading text blocks.',
      author: 'Marcus Aurel',
      readTime: '4 min read',
      date: 'July 14, 2026',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=200'
    },
    {
      title: 'Spaced Repetition schedules for Coders',
      excerpt: 'How to space out code review intervals over 1, 3, and 7 days to maintain maximum syntax familiarity and design pattern recognition.',
      author: 'Sarah Lin',
      readTime: '6 min read',
      date: 'July 19, 2026',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&h=200'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-white">Learning Methodology Blog</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">Explore evidence-based study guidelines compiled by educational psychologists.</p>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((b, i) => (
          <div key={i} className="glass-card glass-card-hover overflow-hidden flex flex-col justify-between h-[450px]">
            <div>
              {/* Image */}
              <div className="h-44 bg-slate-950">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
              </div>
              {/* Content */}
              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  <span>{b.date}</span>
                  <span>•</span>
                  <span>{b.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 hover:text-brand-primary transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 line-clamp-3">
                  {b.excerpt}
                </p>
              </div>
            </div>

            {/* Author info */}
            <div className="p-5 border-t border-slate-950 bg-slate-950/20 flex items-center justify-between text-xs text-slate-450">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-brand-primary" /> {b.author}</span>
              <button className="text-brand-primary font-bold hover:underline">Read Article</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
