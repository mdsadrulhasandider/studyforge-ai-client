import React from 'react';
import { Brain, Heart, Award, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-white">About StudyForge AI</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">Blending modern educational methodologies with high-performance large language models.</p>
      </div>

      <div className="h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=300" 
          alt="Team Workspace" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
        <h3 className="text-xl font-bold text-white">Our Vision</h3>
        <p>
          At StudyForge AI, we believe educational planning shouldn't represent a secondary stressor. Conventional study syllabi are either too rigid or neglect the student's available daily commitment schedule. By utilizing Large Language Models (LLMs), our application crafts structured weekly planners tailored directly to a learner's workload capacity.
        </p>
        <p>
          Beyond simple syllabus rendering, we provide an interactive chat companion (Study Buddy) using conversational session logging. This keeps study motivation high, offers testing quizzes, and answers curriculum details on the fly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <div className="glass-card p-6 text-center space-y-2">
          <Heart className="w-8 h-8 text-brand-primary mx-auto mb-2" />
          <h4 className="text-md font-bold text-white">Student First</h4>
          <p className="text-xs text-slate-400">Customized structures tailored to personal timetables.</p>
        </div>

        <div className="glass-card p-6 text-center space-y-2">
          <Award className="w-8 h-8 text-brand-secondary mx-auto mb-2" />
          <h4 className="text-md font-bold text-white">Cognitive Science</h4>
          <p className="text-xs text-slate-400">Employs spaced repetition and active recall habits.</p>
        </div>

        <div className="glass-card p-6 text-center space-y-2">
          <ShieldCheck className="w-8 h-8 text-brand-accent mx-auto mb-2" />
          <h4 className="text-md font-bold text-white">Validated Quality</h4>
          <p className="text-xs text-slate-400">Seeded with high-quality computer science and math modules.</p>
        </div>
      </div>
    </div>
  );
};
