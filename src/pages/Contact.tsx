import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && msg) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMsg('');
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-white">Contact StudyForge AI</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">Have questions about syllabus structures or integration requests? Send us a message.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Details */}
        <div className="md:col-span-5 glass-card p-6 bg-slate-900/60 border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-white">Office Location</h3>
          
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" />
              <span>Level 4, House 1162, Road 10, Avenue 12, Mirpur DOHS, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-brand-primary shrink-0" />
              <span>support@studyforge.ai</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-brand-primary shrink-0" />
              <span>+880 1322-901105</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 flex gap-3 text-xs text-slate-400 leading-relaxed">
            <MessageCircle className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
            <span>Our support helpline lines are active Saturday through Thursday, 10:00 AM to 7:00 PM.</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:col-span-7 glass-card p-6 bg-slate-900/40 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4">Send Message</h3>

          {submitted ? (
            <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl py-6 px-4 text-center space-y-2 text-brand-accent">
              <h4 className="text-md font-bold">Message Received!</h4>
              <p className="text-xs text-slate-350">Thank you for reaching out. A support coordinator will reply to your registered email soon.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-1.5 bg-brand-accent text-slate-950 rounded-lg text-xs font-semibold hover:bg-brand-accent/90 transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="How can we assist you?"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-brand-primary text-white resize-none"
                />
              </div>

              <button 
                type="submit"
                className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-brand-primary/10"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
