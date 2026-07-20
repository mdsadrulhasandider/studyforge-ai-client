import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Save, BookOpen, Clock, Tag, RefreshCw, Layers, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AddPlan: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if logged out (Double guard)
  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Main Form fields
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [category, setCategory] = useState('Computer Science');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [duration, setDuration] = useState('4 Weeks');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [weeklySchedule, setWeeklySchedule] = useState<any[]>([]);

  // AI Generator Panel fields
  const [aiSubject, setAiSubject] = useState('');
  const [aiDifficulty, setAiDifficulty] = useState('Beginner');
  const [aiHours, setAiHours] = useState(2);
  const [aiWeeks, setAiWeeks] = useState(4);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  // Manual week item template adder
  const handleAddWeekManual = () => {
    const nextWeek = weeklySchedule.length + 1;
    setWeeklySchedule([
      ...weeklySchedule,
      { week: nextWeek, topics: ['New Topic'], resources: ['New Reference'] }
    ]);
  };

  const handleTopicChange = (weekIndex: number, topicIndex: number, val: string) => {
    const updated = [...weeklySchedule];
    updated[weekIndex].topics[topicIndex] = val;
    setWeeklySchedule(updated);
  };

  const handleResourceChange = (weekIndex: number, resourceIndex: number, val: string) => {
    const updated = [...weeklySchedule];
    updated[weekIndex].resources[resourceIndex] = val;
    setWeeklySchedule(updated);
  };

  // Call backend AI generator
  const handleAIGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiSubject) {
      setAiMessage('Please specify a subject name first.');
      return;
    }
    setAiLoading(true);
    setAiMessage('');
    try {
      const data = await api.generateAIPlan({
        subject: aiSubject,
        difficulty: aiDifficulty,
        dailyHours: aiHours,
        duration: aiWeeks
      });

      if (data.success && data.plan) {
        setTitle(data.plan.title);
        setShortDescription(data.plan.shortDescription);
        setFullDescription(data.plan.fullDescription);
        setCategory(data.plan.category);
        setDifficulty(data.plan.difficulty);
        setDuration(data.plan.duration);
        setImageUrl(data.plan.imageUrl);
        setWeeklySchedule(data.plan.weeklySchedule || []);
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setAiMessage('AI planning compilation encountered an error.');
      }
    } catch (err: any) {
      setAiMessage(`Compilation failed: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  // Submit plan to MongoDB
  const handleSubmitPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !shortDescription || !fullDescription || weeklySchedule.length === 0) {
      alert('Please fill out the form details and provide at least one week schedule.');
      return;
    }

    try {
      const result = await api.createPlan({
        title,
        shortDescription,
        fullDescription,
        category,
        difficulty,
        duration,
        imageUrl,
        isPublic,
        weeklySchedule
      });

      if (result.success) {
        confetti({
          particleCount: 150,
          spread: 80,
          colors: ['#6366f1', '#10b981']
        });
        navigate('/items/manage');
      } else {
        alert(`Failed to save study plan: ${result.message}`);
      }
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Add Study Plan</h1>
        <p className="text-slate-400 text-sm mt-1">Design a customized syllabus manually or leverage Gemini intelligence.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: AI Plan Generator Trigger */}
        <div className="lg:col-span-4 glass-card p-6 bg-slate-900/60 sticky top-24 border border-slate-800 space-y-6">
          <div className="flex items-center space-x-2 text-brand-primary">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <h3 className="text-lg font-bold text-white">AI Planner Assistant</h3>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            Specify a learning subject, difficulty target, and time slots. The AI will output a customized week-by-week curriculum instantly.
          </p>

          {aiMessage && (
            <div className="bg-red-950/40 border border-red-900/40 text-red-200 p-3 rounded-lg text-xs">
              {aiMessage}
            </div>
          )}

          <form onSubmit={handleAIGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subject / Skill</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Docker Fundamentals, React Hooks" 
                value={aiSubject}
                onChange={(e) => setAiSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-primary text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Difficulty Grade</label>
              <select 
                value={aiDifficulty}
                onChange={(e) => setAiDifficulty(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-brand-primary cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Study Hours/Day</label>
                <input 
                  type="number" 
                  min={1} 
                  max={12} 
                  value={aiHours}
                  onChange={(e) => setAiHours(parseInt(e.target.value) || 1)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-primary text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Duration (Weeks)</label>
                <input 
                  type="number" 
                  min={2} 
                  max={12} 
                  value={aiWeeks}
                  onChange={(e) => setAiWeeks(parseInt(e.target.value) || 2)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-primary text-white"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={aiLoading}
              className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 disabled:bg-brand-primary/40 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-brand-primary/10 transition-all"
            >
              {aiLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>AI Generate & Populate</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Panel: Manual Review and Save Form */}
        <div className="lg:col-span-8 glass-card p-6 bg-slate-900/40 border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-950 mb-6">
            <h3 className="text-lg font-bold text-white">Syllabus Details</h3>
            <span className="text-xs text-slate-500">Edit fields to review before saving.</span>
          </div>

          <form onSubmit={handleSubmitPlan} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Plan Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Master React in 4 Weeks" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm text-slate-350 focus:outline-none focus:border-brand-primary cursor-pointer"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Design">Design</option>
                  <option value="General Studies">General Studies</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Short Description</label>
              <input 
                type="text" 
                required
                placeholder="One sentence description explaining plan outcomes." 
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Overview</label>
              <textarea 
                required
                rows={4}
                placeholder="Outline course prerequisites, expected study outcomes, and details." 
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Duration String</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 4 Weeks" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Difficulty Level</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm text-slate-350 focus:outline-none focus:border-brand-primary cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cover Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/cover.jpg" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input 
                type="checkbox" 
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 bg-slate-950 border border-slate-850 rounded accent-brand-primary cursor-pointer"
              />
              <label htmlFor="isPublic" className="text-sm font-medium text-slate-300 cursor-pointer">Make this study plan public (Visible on Explore catalog)</label>
            </div>

            {/* Weekly Schedule list editor */}
            <div className="border-t border-slate-900 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-md font-bold text-white flex items-center gap-1.5"><Layers className="w-4.5 h-4.5 text-brand-secondary" /> Weekly Tasks & Materials</h4>
                <button 
                  type="button" 
                  onClick={handleAddWeekManual}
                  className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-all"
                >
                  + Add Week block
                </button>
              </div>

              {weeklySchedule.length === 0 ? (
                <div className="text-center py-8 bg-slate-950/20 rounded-xl border border-slate-900/50 text-xs text-slate-500">
                  No week schedule modules configured. Generate with AI or click "+ Add Week block" above.
                </div>
              ) : (
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                  {weeklySchedule.map((weekItem, wIdx) => (
                    <div key={wIdx} className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 space-y-3">
                      <div className="text-xs font-bold text-brand-secondary">Week {weekItem.week} Modules</div>
                      
                      {/* Topic entry */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-550 mb-1">Topics (comma separated)</label>
                        <input 
                          type="text" 
                          value={weekItem.topics.join(', ')}
                          onChange={(e) => handleTopicChange(wIdx, 0, e.target.value)}
                          placeholder="e.g. Intro to Node, Express routing config"
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-lg text-xs focus:outline-none focus:border-brand-primary text-white"
                        />
                      </div>

                      {/* Resource entry */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-550 mb-1">Resource references (comma separated)</label>
                        <input 
                          type="text" 
                          value={weekItem.resources ? weekItem.resources.join(', ') : ''}
                          onChange={(e) => handleResourceChange(wIdx, 0, e.target.value)}
                          placeholder="e.g. official docs link, youtube tutorial title"
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-lg text-xs focus:outline-none focus:border-brand-primary text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-900 flex justify-end">
              <button 
                type="submit"
                className="px-6 py-3 bg-brand-accent hover:bg-brand-accent/90 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg shadow-brand-accent/10 transition-colors"
              >
                <Save className="w-4.5 h-4.5" />
                <span>Save Study Plan</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
