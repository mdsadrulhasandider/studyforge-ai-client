import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { PlanCard } from '../components/PlanCard';
import { Clock, Star, Tag, Compass, GraduationCap, CheckCircle, ArrowLeft, Send, Sparkles, BookOpen } from 'lucide-react';

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Review state
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<any[]>([
    { name: 'Alex Johnson', comment: 'This study plan structure is perfect. The weekly schedule links are highly relevant.', rating: 5, date: 'July 15, 2026' },
    { name: 'Maria Dev', comment: 'Helped me structure my learning schedule perfectly. Highly recommended!', rating: 4.8, date: 'July 18, 2026' }
  ]);

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id]);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const data = await api.getPlanById(id!);
      if (data.success && data.plan) {
        setPlan(data.plan);
        
        // Fetch related plans under same category
        const relData = await api.getPlans({ category: data.plan.category });
        if (relData.success && relData.plans) {
          // Filter out current plan
          const filteredRel = relData.plans.filter((p: any) => p._id !== data.plan._id).slice(0, 3);
          setRelated(filteredRel);
        }
      }
    } catch (err) {
      console.error('Error fetching plan details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewComment) {
      const newReview = {
        name: reviewName,
        comment: reviewComment,
        rating: 5,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      };
      setReviewsList([newReview, ...reviewsList]);
      setReviewName('');
      setReviewComment('');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-primary mx-auto mb-4"></div>
        <p className="text-slate-400 text-sm">Loading syllabus details...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Plan Not Found</h2>
        <Link to="/explore" className="text-brand-primary hover:underline flex items-center justify-center gap-1.5"><ArrowLeft className="w-4 h-4" /> Back to Explore</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <Link to="/explore" className="inline-flex items-center text-sm text-slate-400 hover:text-brand-primary transition-colors gap-2">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Explore Study Plans</span>
      </Link>

      {/* Grid Layout: Main info and Specs panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Description & Weekly Schedule */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Title & Images */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{plan.title}</h1>
            <div className="flex items-center space-x-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30">{plan.category}</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-350">{plan.difficulty}</span>
              {plan.aiGenerated && (
                <span className="px-3 py-1 rounded-full bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/30 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-secondary" /> AI Synthesized
                </span>
              )}
            </div>
          </div>

          <div className="h-80 sm:h-[400px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
            <img 
              src={plan.imageUrl || 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&h=400'} 
              alt={plan.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* 1. Description Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-l-4 border-brand-primary pl-3">Syllabus Overview</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{plan.fullDescription || plan.shortDescription}</p>
          </div>

          {/* Weekly Schedule Stepper */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white border-l-4 border-brand-primary pl-3">Weekly Schedule Blueprint</h3>
            
            <div className="space-y-4">
              {plan.weeklySchedule && plan.weeklySchedule.map((sched: any) => (
                <div key={sched.week} className="glass-card p-6 bg-slate-900/40 border-l-4 border-l-brand-secondary">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-brand-accent shrink-0" />
                    <h4 className="text-lg font-bold text-white">Week {sched.week} Tasks</h4>
                  </div>
                  
                  {/* Topics List */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subject Topics</h5>
                      <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1.5">
                        {sched.topics.map((topic: string, i: number) => <li key={i}>{topic}</li>)}
                      </ul>
                    </div>

                    {/* Resources */}
                    {sched.resources && sched.resources.length > 0 && (
                      <div className="pt-2 border-t border-slate-950">
                        <h5 className="text-xs font-semibold text-brand-primary uppercase tracking-wider mb-2">Recommended Materials</h5>
                        <ul className="list-none pl-0 text-slate-350 text-xs space-y-1.5">
                          {sched.resources.map((res: string, i: number) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                              <span>{res}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: 2. Specifications Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 bg-slate-900/60 sticky top-24 border border-slate-800">
            <h3 className="text-lg font-extrabold text-white mb-4">Key Information</h3>
            
            <div className="space-y-4.5 text-sm">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-950">
                <span className="text-slate-450 flex items-center gap-2"><Tag className="w-4 h-4" /> Category</span>
                <span className="text-white font-semibold">{plan.category}</span>
              </div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-950">
                <span className="text-slate-455 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Difficulty</span>
                <span className="text-white font-semibold">{plan.difficulty}</span>
              </div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-950">
                <span className="text-slate-460 flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
                <span className="text-white font-semibold">{plan.duration}</span>
              </div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-950">
                <span className="text-slate-465 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Average Rating</span>
                <span className="text-white font-semibold flex items-center gap-1">{plan.rating} / 5</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-470 flex items-center gap-2"><Compass className="w-4 h-4" /> Author</span>
                <span className="text-slate-350 font-semibold">{plan.createdBy === 'system' ? 'System Seeded' : 'Community'}</span>
              </div>
            </div>

            {/* CTA action helper */}
            <div className="mt-6">
              <Link 
                to="/chat"
                className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-brand-primary/10"
              >
                <Sparkles className="w-4 h-4" />
                <span>Discuss plan with AI Buddy</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Reviews & Ratings Section */}
      <section className="border-t border-slate-900 pt-10 space-y-6">
        <h3 className="text-2xl font-bold text-white border-l-4 border-brand-primary pl-3">Reviews & Student Ratings</h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Add Review Form */}
          <div className="md:col-span-5 glass-card p-6 bg-slate-900/40">
            <h4 className="text-md font-bold text-white mb-4">Add Your Review</h4>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Student name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Review Comment</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Share your learning experience..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white resize-none"
                />
              </div>
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-brand-primary hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-brand-primary" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>

          {/* List Reviews */}
          <div className="md:col-span-7 space-y-4">
            {reviewsList.map((rev, idx) => (
              <div key={idx} className="glass-card p-5 bg-slate-900/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                      {rev.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-white">{rev.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{rev.date}</span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-1">({rev.rating})</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Related Items Section */}
      {related.length > 0 && (
        <section className="border-t border-slate-900 pt-10 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white border-l-4 border-brand-primary pl-3">Related Study Blueprints</h3>
            <p className="text-slate-500 text-xs mt-1">Recommended schedules from the same category.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map(relPlan => (
              <PlanCard key={relPlan._id} plan={relPlan} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
