import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Github, Twitter, Linkedin, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white font-extrabold text-xl">
              <Brain className="h-7 w-7 text-brand-primary" />
              <span>Study<span className="text-brand-primary">Forge</span> AI</span>
            </Link>
            <p className="text-sm text-slate-400">
              Personalized, AI-powered study systems structured to guide your path to academic mastery.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-brand-primary transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-brand-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-brand-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/explore" className="hover:text-white transition-colors">Study Plans</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Methodology Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Form</Link></li>
            </ul>
          </div>

          {/* Guidelines */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Guidelines</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reviewer Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ Helpdesk</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider text-left">Office Address</h3>
            <div className="flex items-start space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
              <span>Level 4, House 1162, Road 10, Avenue 12, Mirpur DOHS, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-brand-primary shrink-0" />
              <span>support@studyforge-ai.vercel.app</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-brand-primary shrink-0" />
              <span>+880 1322-901105</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2026 StudyForge AI. All rights reserved.</p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span>Verified SCIC Project Submission</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
