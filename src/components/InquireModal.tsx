import React, { useState } from 'react';
import { X, Mail, Send, Check, Copy, Instagram } from 'lucide-react';
import { BRAND_INFO } from '../data/portfolioData';

interface InquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquireModal: React.FC<InquireModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [projectType, setProjectType] = useState('Commercial Cut');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(BRAND_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  const projectTypes = [
    'Commercial Cut',
    'Music Video',
    'Narrative Film',
    'Color Grading',
    'Social & Fashion Reel'
  ];

  return (
    <div
      id="inquire-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#e5484d] to-transparent" />

        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="font-mono-code text-[10px] tracking-[0.2em] text-[#e5484d] uppercase font-bold">
              COMMISSIONS & CUTS
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-black text-black uppercase mt-0.5 tracking-tight">
              INITIATE A PROJECT
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-normal">
              Direct line to {BRAND_INFO.creatorName} ({BRAND_INFO.brandName})
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-display text-lg font-black text-black uppercase tracking-tight">
              TRANSMISSION RECEIVED
            </h4>
            <p className="text-xs font-mono-code text-zinc-600 max-w-xs mx-auto">
              Thank you {senderName || 'Director'}. Rathish will review your cut schedule and reach out within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Type selector */}
            <div>
              <label className="block font-mono-code text-[10px] tracking-wider text-zinc-500 uppercase mb-1.5 font-medium">
                PROJECT CATEGORY
              </label>
              <div className="flex flex-wrap gap-1.5">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-2.5 py-1 rounded text-xs font-mono-code transition-all ${
                      projectType === type
                        ? 'bg-black text-white font-semibold shadow-sm'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono-code text-[10px] tracking-wider text-zinc-500 uppercase mb-1 font-medium">
                  YOUR NAME / PRODUCTION
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Christopher Nolan / Studio"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-mono-code text-black placeholder-zinc-400 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block font-mono-code text-[10px] tracking-wider text-zinc-500 uppercase mb-1 font-medium">
                  DIRECT EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@production.com"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-mono-code text-black placeholder-zinc-400 focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono-code text-[10px] tracking-wider text-zinc-500 uppercase mb-1 font-medium">
                BRIEF OR DEADLINE NOTES
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Brief outline of footage, turnaround time, sound design expectations..."
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-mono-code text-black placeholder-zinc-400 focus:outline-none focus:border-black resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black text-xs font-mono-code transition-colors border border-zinc-200 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY EMAIL'}</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 text-xs font-mono-code font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND DISPATCH</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
