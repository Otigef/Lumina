import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Star, Download, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CertificateProps {
  userName: string;
  date: string;
  onBack: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ userName, date, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors self-start max-w-6xl mx-auto w-full"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white rounded-[40px] shadow-2xl border-[12px] border-slate-900 p-12 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl -mr-32 -mt-32 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-3xl -ml-32 -mb-32 rounded-full"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mb-8 shadow-inner">
            <Award size={48} />
          </div>

          <h1 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
            Certificate of Completion
          </h1>
          
          <div className="w-24 h-1 bg-emerald-500 mb-12 rounded-full"></div>

          <p className="text-xl text-slate-500 mb-4 font-medium italic">
            This is to certify that
          </p>

          <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
            {userName || 'SkillStack Student'}
          </h2>

          <p className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed">
            has successfully completed the entire <span className="text-slate-900 font-bold">SkillStack Web Development Curriculum</span>, 
            mastering HTML, CSS, JavaScript, and Modern Layout techniques through hands-on practice and AI-guided learning.
          </p>

          <div className="grid grid-cols-3 w-full gap-8 border-t border-slate-100 pt-12">
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Date Issued</div>
              <div className="text-sm font-bold text-slate-900">{date}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl">
                <Trophy size={24} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Certificate ID</div>
              <div className="text-sm font-bold text-slate-900 font-mono">SKL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-2 text-emerald-600 font-bold">
            <CheckCircle2 size={20} />
            Verified by Lumina AI Mentor
          </div>
        </div>
      </motion.div>

      <div className="mt-12 flex gap-4">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          <Download size={20} />
          Download PDF
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm hover:scale-105 active:scale-95">
          <Share2 size={20} />
          Share Achievement
        </button>
      </div>
    </div>
  );
};
