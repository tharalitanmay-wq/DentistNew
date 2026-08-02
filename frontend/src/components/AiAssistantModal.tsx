'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, User, Calendar, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am Pearl Dental AI Assistant. How may I guide your smile transformation today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai-chat/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: 'I am currently operating in offline mode. For immediate consultation, please call our Concierge at +1 (800) 555-PEARL.' }]);
      }
    } catch (err) {
      // Local intelligent response fallback
      setTimeout(() => {
        let reply = "Thank you for asking! Pearl Dental Care offers bespoke porcelain veneers, computer-guided implants, and 3D Invisalign aligners.";
        if (userMsg.toLowerCase().includes('cost') || userMsg.toLowerCase().includes('price')) {
          reply = "Our procedures range from $550 for Whitening to $1,400 per Porcelain Veneer and $2,800 for Dental Implants. We also offer 0% APR financing!";
        } else if (userMsg.toLowerCase().includes('pain') || userMsg.toLowerCase().includes('emergency')) {
          reply = "⚠️ If you have an urgent dental emergency, please call our priority hotline at +1 (800) 999-DENT immediately!";
        }
        setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-40 p-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-xl shadow-cyan-500/30 hover:scale-110 transition-all flex items-center space-x-2 border border-white/20"
        title="Pearl AI Dental Assistant"
      >
        <Bot className="w-6 h-6 text-slate-950" />
        <span className="hidden md:inline text-xs tracking-wider uppercase font-extrabold pr-1">AI Assistant</span>
      </button>

      {/* Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 bg-slate-950/60 backdrop-blur-md">
          <div className="w-full sm:w-[420px] h-[550px] bg-navy-900 border border-cyan-500/30 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-navy-950 via-navy-800 to-navy-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center">
                    <span>Pearl Dental AI</span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 ml-1.5" />
                  </h4>
                  <span className="text-[10px] text-emerald-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-ping" />
                    Online & Ready
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      m.sender === 'user'
                        ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none shadow-md'
                        : 'bg-navy-800 text-slate-200 border border-white/10 rounded-bl-none shadow-md'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-navy-800 p-3 rounded-2xl text-slate-400 text-xs flex items-center space-x-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <span>Analyzing clinical query...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Badges */}
            <div className="px-4 py-2 bg-navy-950/80 border-t border-white/5 flex gap-2 overflow-x-auto text-[10px]">
              <button
                onClick={() => setInput('What is the cost of Porcelain Veneers?')}
                className="px-2.5 py-1 rounded-full bg-navy-800 text-cyan-400 border border-white/10 hover:border-cyan-400 whitespace-nowrap"
              >
                💰 Veneer Pricing
              </button>
              <button
                onClick={() => setInput('Do you handle dental emergencies?')}
                className="px-2.5 py-1 rounded-full bg-navy-800 text-cyan-400 border border-white/10 hover:border-cyan-400 whitespace-nowrap"
              >
                🚨 Emergency Care
              </button>
              <button
                onClick={() => setInput('How to book an appointment with Dr. Sterling?')}
                className="px-2.5 py-1 rounded-full bg-navy-800 text-cyan-400 border border-white/10 hover:border-cyan-400 whitespace-nowrap"
              >
                📅 Doctor Availability
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-navy-950 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treatments, pricing, or appointments..."
                className="flex-1 px-3.5 py-2 text-xs bg-navy-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
