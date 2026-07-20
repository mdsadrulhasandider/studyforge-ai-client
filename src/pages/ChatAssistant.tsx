import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Send, Sparkles, User, Brain, AlertCircle } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export const ChatAssistant: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect guard
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: `Hello! I'm your Study Buddy. I can help you compile calendars, summarize notes, or suggest learning paths. Select one of the quick prompts below or ask me anything!`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    'How should I prepare for exams?',
    'Generate a study routine.',
    'Recommend resources for React.',
    'Create a quiz from my study plan.',
    'How many hours should I study daily?'
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages modify
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const data = await api.sendMessage(textToSend);
      if (data.success && data.response) {
        const aiMsg: ChatMessage = {
          sender: 'ai',
          text: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMsg]);
        if (data.suggestions && data.suggestions.length > 0) {
          setSuggestions(data.suggestions);
        }
      } else {
        throw new Error(data.message || 'Error communicating with AI assistant');
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        sender: 'ai',
        text: `Sorry, I'm having trouble connecting to the network server. Here is a study tip: consistent spaced repetition blocks of 20-30 minutes yield maximum retention!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 h-[85vh] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-900 shrink-0">
        <div className="p-2.5 bg-brand-secondary/10 rounded-xl text-brand-secondary">
          <Brain className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">AI Study Buddy</h1>
          <p className="text-xs text-slate-500">Active context session with memory guidelines.</p>
        </div>
      </div>

      {/* Message window */}
      <div className="flex-1 overflow-y-auto my-6 pr-2 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${msg.sender === 'user' ? 'bg-brand-primary text-white' : 'bg-brand-secondary text-white'}`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-slate-900/60 border border-slate-800 text-slate-200 rounded-tl-none'}`}>
              <p className="whitespace-pre-line text-left">{msg.text}</p>
              <div className="text-[9px] text-slate-400 mt-2 text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-center">
            <div className="w-8 h-8 rounded-full shrink-0 bg-brand-secondary flex items-center justify-center">
              <Brain className="w-4 h-4 text-white animate-spin" />
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center space-x-1">
              <div className="w-2 h-2 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input panel & suggestions */}
      <div className="space-y-4 shrink-0">
        
        {/* Suggestion Chips */}
        {suggestions.length > 0 && !loading && (
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {suggestions.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(sug)}
                className="px-3.5 py-1.5 bg-slate-900 border border-slate-850 hover:border-brand-secondary hover:text-white rounded-full text-xs font-semibold text-slate-400 transition-all"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* Form input */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Type a message or select a prompt..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 focus:border-brand-secondary rounded-xl text-sm focus:outline-none text-white"
          />
          <button 
            type="submit"
            disabled={!inputText.trim() || loading}
            className="px-5 py-3 bg-brand-secondary hover:bg-brand-secondary/90 disabled:opacity-50 disabled:pointer-events-none text-white rounded-xl flex items-center justify-center shrink-0 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
