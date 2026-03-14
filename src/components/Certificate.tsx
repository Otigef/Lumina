import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Star, Download, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface CertificateProps {
  userName: string;
  score: number;
  date: string;
  onBack: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ userName, score, date, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 print:p-0 print:bg-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          @page { size: landscape; margin: 0; }
          .certificate-container { 
            box-shadow: none !important; 
            border: 20px solid #0f172a !important;
            border-radius: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
          }
        }
      `}} />

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors self-start max-w-6xl mx-auto w-full no-print"
      >
        <ArrowLeft size={20} />
        Back to Dashboard
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl border-[16px] border-slate-900 p-16 relative overflow-hidden certificate-container"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl -mr-48 -mt-48 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 blur-3xl -ml-48 -mb-48 rounded-full"></div>
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-emerald-500 m-8"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-emerald-500 m-8"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-emerald-500 m-8"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-emerald-500 m-8"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-28 h-28 bg-slate-900 rounded-3xl flex items-center justify-center text-emerald-400 mb-10 shadow-2xl transform rotate-3">
            <Award size={56} />
          </div>

          <h1 className="text-sm font-black uppercase tracking-[0.5em] text-slate-400 mb-6">
            Official Certificate of Achievement
          </h1>
          
          <div className="w-32 h-1.5 bg-emerald-500 mb-12 rounded-full"></div>

          <p className="text-2xl text-slate-500 mb-6 font-serif italic">
            This prestigious award is presented to
          </p>

          <h2 className="text-6xl font-black text-slate-900 mb-8 tracking-tight border-b-4 border-slate-100 pb-4 px-12">
            {userName || 'SkillStack Student'}
          </h2>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl leading-relaxed font-medium">
            for the successful completion of the <span className="text-slate-900 font-bold">SkillStack Full-Stack Web Development Program</span>. 
            The recipient has demonstrated exceptional proficiency in modern web technologies, 
            achieving a remarkable overall assessment score of:
          </p>

          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-slate-900 text-white px-10 py-4 rounded-2xl text-4xl font-black shadow-xl border-2 border-emerald-500">
              {score}%
            </div>
          </div>

          <div className="grid grid-cols-3 w-full gap-12 border-t border-slate-100 pt-16">
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Date of Issue</div>
              <div className="text-lg font-bold text-slate-900">{date}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white">
                <Star size={32} fill="currentColor" />
              </div>
              <div className="mt-4 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Lumina Certified</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Verification ID</div>
              <div className="text-lg font-bold text-slate-900 font-mono">SKL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <div className="w-12 h-px bg-slate-200"></div>
            Verified by Lumina AI Mentor & SkillStack Academy
            <div className="w-12 h-px bg-slate-200"></div>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 flex gap-4 no-print">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-3 px-10 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          <Download size={20} />
          Print Certificate
        </button>
        <button className="flex items-center gap-3 px-10 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm hover:scale-105 active:scale-95">
          <Share2 size={20} />
          Share Achievement
        </button>
      </div>
    </div>
  );
};
