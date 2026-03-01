import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  Play, 
  RotateCcw,
  Sparkles,
  Layout,
  Terminal,
  ArrowLeft,
  GraduationCap,
  Copy,
  Info,
  X,
  Video,
  Loader2,
  Award,
  Download
} from 'lucide-react';
import Markdown from 'react-markdown';
import AceEditor from 'react-ace';
import { GoogleGenAI } from "@google/genai";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as prismTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Import Ace modes and themes
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';

import ace from 'ace-builds';
ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.33.0/src-noconflict/');


import { ROADMAP } from './constants';
import { Lesson, Module, UserProgress } from './types';
import { getMentorFeedback } from './services/gemini';
import { Certificate } from './components/Certificate';

// --- Context Definition ---
interface LessonContextType {
  selectedLesson: Lesson | null;
  code: string;
  mentorResponse: string;
  isMentorLoading: boolean;
  setSelectedLesson: (lesson: Lesson | null) => void;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setMentorResponse: (response: string) => void;
  askMentor: (question?: string) => Promise<void>;
}

const LessonContext = React.createContext<LessonContextType | undefined>(undefined);

export const useLesson = () => {
  const context = React.useContext(LessonContext);
  if (!context) throw new Error('useLesson must be used within a LessonProvider');
  return context;
};

function LessonProvider({ children }: { children: React.ReactNode }) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState('');
  const [mentorResponse, setMentorResponse] = useState<string>('');
  const [isMentorLoading, setIsMentorLoading] = useState(false);

  const askMentor = async (question?: string) => {
    if (!selectedLesson) return;
    setIsMentorLoading(true);
    const feedback = await getMentorFeedback(code, selectedLesson.title, question);
    setMentorResponse(feedback || 'I couldn\'t think of anything to say!');
    setIsMentorLoading(false);
  };


  const value = {
    selectedLesson,
    code,
    mentorResponse,
    isMentorLoading,
    setSelectedLesson,
    setCode,
    setMentorResponse,
    askMentor
  };

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
}

export default function App() {
  return (
    <LessonProvider>
      <AppContent />
    </LessonProvider>
  );
}

function AppContent() {
  const { 
    selectedLesson, 
    setSelectedLesson, 
    code, 
    setCode, 
    mentorResponse, 
    setMentorResponse, 
    isMentorLoading, 
    askMentor 
  } = useLesson();

  const [currentView, setCurrentView] = useState<'dashboard' | 'lesson' | 'certificate'>('dashboard');
  const [progress, setProgress] = useState<Record<string, UserProgress>>({});
  const [previewKey, setPreviewKey] = useState(0);
  const [userQuestion, setUserQuestion] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [liveActivities, setLiveActivities] = useState<{id: string, user: string, action: string, time: string}[]>([]);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<{success: boolean, message: string} | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const [isRemoteChange, setIsRemoteChange] = useState(false);

  const ws = useRef<WebSocket | null>(null);

  const GridAreasDemo = () => {
    const [areas, setAreas] = useState('"header header"\n"sidebar main"\n"footer footer"');
    const [error, setError] = useState('');

    const gridStyle: React.CSSProperties = {};
    try {
      gridStyle.gridTemplateAreas = areas;
      if (error) setError('');
    } catch (e) {
      if (!error) setError('Invalid grid-template-areas value.');
    }

    return (
      <div className="my-8 p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm">
        <h4 className="text-lg font-bold text-slate-900 mb-4">Interactive Grid Areas Demo</h4>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">grid-template-areas:</label>
            <textarea
              value={areas}
              onChange={(e) => setAreas(e.target.value)}
              className="w-full h-32 p-2 font-mono text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500/50 outline-none"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
          <div 
            className="grid gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-inner min-h-[200px]"
            style={gridStyle}
          >
            <div style={{ gridArea: 'header' }} className="bg-blue-500/80 rounded-lg flex items-center justify-center text-white font-bold">Header</div>
            <div style={{ gridArea: 'sidebar' }} className="bg-red-500/80 rounded-lg flex items-center justify-center text-white font-bold">Sidebar</div>
            <div style={{ gridArea: 'main' }} className="bg-green-500/80 rounded-lg flex items-center justify-center text-white font-bold">Main</div>
            <div style={{ gridArea: 'footer' }} className="bg-yellow-500/80 rounded-lg flex items-center justify-center text-white font-bold">Footer</div>
          </div>
        </div>
      </div>
    );
  };

  const SpecificityDemo = () => {
    const [selectors, setSelectors] = useState([
      { id: 1, text: 'h1', color: '#ef4444' },
      { id: 2, text: '.title', color: '#3b82f6' },
      { id: 3, text: '#main-title', color: '#10b981' }
    ]);

    const calculateSpecificity = (selector: string) => {
      let ids = 0;
      let classes = 0;
      let elements = 0;

      const calculateForPart = (part: string) => {
        let tempIds = 0;
        let tempClasses = 0;
        let tempElements = 0;

        // Handle :is() and :where()
        part = part.replace(/:is\((.*?)\)|:where\((.*?)\)/g, (match, isGroup, whereGroup) => {
          const group = isGroup || whereGroup;
          if (isGroup) {
            const specificities = group.split(',').map((s: string) => calculateSpecificity(s));
            const maxSpec = specificities.reduce((max: any, current: any) => {
              if (current.ids > max.ids) return current;
              if (current.ids === max.ids && current.classes > max.classes) return current;
              if (current.ids === max.ids && current.classes === max.classes && current.elements > max.elements) return current;
              return max;
            }, { ids: 0, classes: 0, elements: 0 });
            tempIds += maxSpec.ids;
            tempClasses += maxSpec.classes;
            tempElements += maxSpec.elements;
          }
          // :where() has 0 specificity, so we do nothing
          return '';
        });

        // Handle :not()
        part = part.replace(/:not\((.*?)\)/g, (match, group) => {
          const notSpec = calculateSpecificity(group);
          tempIds += notSpec.ids;
          tempClasses += notSpec.classes;
          tempElements += notSpec.elements;
          return '';
        });

        const idMatches = part.match(/#[a-zA-Z0-9_-]+/g);
        if (idMatches) tempIds += idMatches.length;

        const classMatches = part.match(/\.[a-zA-Z0-9_-]+/g);
        if (classMatches) tempClasses += classMatches.length;

        const attrMatches = part.match(/\[[^\]]+\]/g);
        if (attrMatches) tempClasses += attrMatches.length;

        const pseudoClassMatches = part.match(/:[a-zA-Z0-9_-]+(?:\([^)]+\))?/g);
        if (pseudoClassMatches) {
          const simplePseudoClasses = part.match(/:[a-zA-Z0-9_-]+(?![\w\-]*\()/g) || [];
          tempClasses += simplePseudoClasses.length;
        }

        const pseudoElementMatches = part.match(/::[a-zA-Z0-9_-]+/g);
        if (pseudoElementMatches) tempElements += pseudoElementMatches.length;

        const cleanPart = part.replace(/#[a-zA-Z0-9_-]+|\.[a-zA-Z0-9_-]+|\[[^\]]+\]|:[a-zA-Z0-9_-]+(?:\([^)]+\))?/g, '');
        if (cleanPart && !['>', '+', '~', ' '].includes(cleanPart.trim())) {
            const elementMatches = cleanPart.match(/[a-zA-Z0-9_-]+/g);
            if (elementMatches) tempElements += elementMatches.length;
        }

        return { ids: tempIds, classes: tempClasses, elements: tempElements };
      };

      const parts = selector.split(/[ >+~,]/).filter(p => p.trim() !== '');
      parts.forEach(part => {
        const result = calculateForPart(part);
        ids += result.ids;
        classes += result.classes;
        elements += result.elements;
      });

      return { ids, classes, elements };
    };

    const sortedSelectors = [...selectors].sort((a, b) => {
      const specA = calculateSpecificity(a.text);
      const specB = calculateSpecificity(b.text);
      if (specA.ids !== specB.ids) return specB.ids - specA.ids;
      if (specA.classes !== specB.classes) return specB.classes - specA.classes;
      return specB.elements - specA.elements;
    });

    const winner = sortedSelectors[0];

    const addSelector = () => {
      const newId = Math.max(...selectors.map(s => s.id), 0) + 1;
      setSelectors([...selectors, { id: newId, text: 'div', color: '#64748b' }]);
    };

    const removeSelector = (id: number) => {
      if (selectors.length > 1) {
        setSelectors(selectors.filter(s => s.id !== id));
      }
    };

    return (
      <div className="my-8 p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layout size={20} className="text-emerald-500" />
            Interactive Specificity Demo
          </h4>
          <button 
            onClick={addSelector}
            className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
          >
            <Sparkles size={14} /> Add Selector
          </button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {selectors.map((s, idx) => {
              const spec = calculateSpecificity(s.text);
              return (
                <div key={s.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      value={s.text}
                      onChange={(e) => {
                        const newSelectors = [...selectors];
                        newSelectors[idx].text = e.target.value;
                        setSelectors(newSelectors);
                      }}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      placeholder="e.g. .button:hover"
                    />
                    <input
                      type="color"
                      value={s.color}
                      onChange={(e) => {
                        const newSelectors = [...selectors];
                        newSelectors[idx].color = e.target.value;
                        setSelectors(newSelectors);
                      }}
                      className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 overflow-hidden shrink-0"
                    />
                    <button 
                      onClick={() => removeSelector(s.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">
                        ID: {spec.ids}
                      </div>
                      <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">
                        Class: {spec.classes}
                      </div>
                      <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">
                        Elem: {spec.elements}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      Score: (0, {spec.ids}, {spec.classes}, {spec.elements})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-inner min-h-[300px] sticky top-4">
            <div className="text-xs font-bold text-slate-400 uppercase mb-8 tracking-widest">Live Preview</div>
            
            <div className="relative">
              <h1 
                className="text-5xl font-black transition-all duration-500 text-center uppercase tracking-tighter"
                style={{ color: winner.color }}
              >
                Lumina Academy
              </h1>
              <div className="absolute -top-6 -right-6">
                <Trophy size={32} className="text-yellow-400 animate-bounce" />
              </div>
            </div>
            
            <div className="mt-12 w-full">
              <div className="p-4 bg-slate-900 rounded-2xl text-white">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Winning Selector</div>
                <div className="flex items-center justify-between">
                  <code className="text-emerald-400 font-bold">{winner.text}</code>
                  <div className="text-xs text-slate-400">
                    ({calculateSpecificity(winner.text).ids}, {calculateSpecificity(winner.text).classes}, {calculateSpecificity(winner.text).elements})
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[10px] text-slate-400 text-center italic">
                Change the selectors on the left to see which one "wins" based on specificity rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const initialActivities = [
      { id: '1', user: 'Alex M.', action: 'completed "The Skeleton of the Web"', time: '2m ago' },
      { id: '2', user: 'Sarah K.', action: 'started "CSS Grid Layout"', time: '5m ago' },
      { id: '3', user: 'James W.', action: 'earned "HTML Master" badge', time: '12m ago' },
    ];
    setLiveActivities(initialActivities);
    
    const interval = setInterval(() => {
      const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan'];
      const actions = ['completed a lesson', 'started a new module', 'asked the AI mentor', 'fixed a bug'];
      const newActivity = {
        id: Math.random().toString(),
        user: names[Math.floor(Math.random() * names.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        time: 'Just now'
      };
      setLiveActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const generateVideo = async () => {
    if (!selectedLesson || !selectedLesson.videoPrompt) return;

    try {
      setIsVideoGenerating(true);
      setVideoError(null);

      // Check for API key
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: selectedLesson.videoPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.API_KEY || '',
          },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      }
    } catch (err: any) {
      console.error('Video generation failed', err);
      if (err.message?.includes("Requested entity was not found")) {
        setVideoError("API Key issue. Please try selecting your key again.");
        // @ts-ignore
        await window.aistudio.openSelectKey();
      } else {
        setVideoError("Failed to generate video. Please try again later.");
      }
    } finally {
      setIsVideoGenerating(false);
    }
  };

  useEffect(() => {
    if (selectedLesson && ws.current?.readyState === WebSocket.OPEN && !isRemoteChange) {
      ws.current.send(code);
    }
    if (isRemoteChange) {
      setIsRemoteChange(false);
    }
  }, [code, selectedLesson, isRemoteChange]);

  const goToNextLesson = () => {
    if (!selectedLesson) return;

    let nextLesson: Lesson | null = null;
    
    for (let i = 0; i < ROADMAP.length; i++) {
      const module = ROADMAP[i];
      const lessonIdx = module.lessons.findIndex(l => l.id === selectedLesson.id);
      
      if (lessonIdx !== -1) {
        if (lessonIdx < module.lessons.length - 1) {
          nextLesson = module.lessons[lessonIdx + 1];
        } else if (i < ROADMAP.length - 1) {
          nextLesson = ROADMAP[i + 1].lessons[0];
        }
        break;
      }
    }

    if (nextLesson) {
      startLesson(nextLesson);
    } else {
      setCurrentView('dashboard');
    }
  };

  const goToPreviousLesson = () => {
    if (!selectedLesson) return;

    let prevLesson: Lesson | null = null;
    
    for (let i = 0; i < ROADMAP.length; i++) {
      const module = ROADMAP[i];
      const lessonIdx = module.lessons.findIndex(l => l.id === selectedLesson.id);
      
      if (lessonIdx !== -1) {
        if (lessonIdx > 0) {
          prevLesson = module.lessons[lessonIdx - 1];
        } else if (i > 0) {
          const prevModule = ROADMAP[i - 1];
          prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
        }
        break;
      }
    }

    if (prevLesson) {
      startLesson(prevLesson);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = () => {
    try {
      const savedProgress = localStorage.getItem('userProgress');
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } catch (err) {
      console.error('Failed to fetch progress from localStorage', err);
    }
  };

  const saveProgress = (lessonId: string, completed: boolean, codeState: string) => {
    try {
      const newProgress = {
        ...progress,
        [lessonId]: {
          lesson_id: lessonId,
          completed,
          code_state: codeState
        }
      };
      setProgress(newProgress);
      localStorage.setItem('userProgress', JSON.stringify(newProgress));
    } catch (err) {
      console.error('Failed to save progress to localStorage', err);
    }
  };

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCode(progress[lesson.id]?.code_state || lesson.initialCode);
    setCurrentView('lesson');
    setMentorResponse('Hi! I\'m your SkillStack Mentor. Ready to write some code?');
    setVideoUrl(null);
    setVideoError(null);

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}?lessonId=${lesson.id}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const receivedCode = event.data;
      setIsRemoteChange(true);
      setCode(receivedCode);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  const handleRunCode = () => {
    setPreviewKey(prev => prev + 1);
  };

  const handleVerifyChallenge = async () => {
    if (!selectedLesson) return;
    
    setIsVerifying(true);
    setVerificationFeedback(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `
          As a coding mentor, verify if the following code completes the given challenge.
          
          Challenge: ${selectedLesson.challenge}
          User Code:
          ${code}
          
          Provide your response in JSON format:
          {
            "success": boolean,
            "message": "A short, encouraging message explaining why it passed or what needs to be fixed."
          }
        `,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const result = JSON.parse(response.text || '{}');
      setVerificationFeedback(result);
      
      if (result.success) {
        markAsComplete();
      }
    } catch (err) {
      console.error('Verification failed', err);
      setVerificationFeedback({
        success: false,
        message: "I couldn't verify your code right now. Please try again!"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAskMentor = async (question?: string) => {
    await askMentor(question);
    if (question) setUserQuestion('');
  };

  const markAsComplete = () => {
    if (selectedLesson) {
      const newProgress = {
        ...progress,
        [selectedLesson.id]: {
          lesson_id: selectedLesson.id,
          completed: true,
          code_state: code
        }
      };
      
      setProgress(newProgress);
      saveProgress(selectedLesson.id, true, code);

      // Check for course completion
      const totalLessons = ROADMAP.reduce((acc, m) => acc + m.lessons.length, 0);
      const completedCount = Object.values(newProgress).filter(p => p.completed).length;
      if (completedCount === totalLessons) {
        setShowCompletionModal(true);
      }
    }
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [clipboardCopiedId, setClipboardCopiedId] = useState<string | null>(null);

  const copyToEditor = (snippet: string, id: string) => {
    setCode(prev => prev + '\n' + snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyToClipboard = async (snippet: string, id: string) => {
    try {
      await navigator.clipboard.writeText(snippet);
      setClipboardCopiedId(id);
      setTimeout(() => setClipboardCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const MarkdownComponents = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      const id = React.useMemo(() => Math.random().toString(36).substr(2, 9), [codeString]);
      
      if (!inline) {
        let lang = match ? match[1] : 'text';
        
        // Auto-detect CSS in HTML lessons if no language is specified
        if (lang === 'text' && selectedLesson?.type === 'html') {
          if (codeString.includes('{') && codeString.includes(':') && codeString.includes('}')) {
            lang = 'css';
          }
        }

        const isAceSupported = ['html', 'css', 'javascript', 'js'].includes(lang);
        const aceMode = lang === 'js' ? 'javascript' : lang;

        return (
          <div className="relative group my-4">
            {isAceSupported ? (
              <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg">
                <AceEditor
                  mode={aceMode}
                  theme="tomorrow_night"
                  value={codeString}
                  readOnly={true}
                  name={`snippet-${id}`}
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                    fontSize: 12,
                    useWorker: false,
                    maxLines: 20,
                    minLines: 3,
                    highlightActiveLine: false,
                    highlightGutterLine: false,
                    showPrintMargin: false
                  }}
                  style={{ width: '100%' }}
                  className="bg-slate-800"
                />
              </div>
            ) : (
              <SyntaxHighlighter
                style={prismTheme}
                language={lang}
                PreTag="div"
                className="rounded-xl !bg-slate-800 !p-4 !m-0 !text-xs"
                {...props}
              >
                {codeString}
              </SyntaxHighlighter>
            )}
            <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <button
                onClick={() => copyToClipboard(codeString, id)}
                className={`p-2 rounded-lg transition-all shadow-xl flex items-center gap-2 text-xs font-bold backdrop-blur-md border ${
                  clipboardCopiedId === id 
                    ? 'bg-emerald-500/90 text-white border-emerald-400' 
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
                title="Copy to Clipboard"
              >
                {clipboardCopiedId === id ? (
                  <>
                    <CheckCircle2 size={14} className="text-white" />
                    <span className="animate-in fade-in slide-in-from-right-1">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={() => copyToEditor(codeString, id)}
                className={`p-2 rounded-lg transition-all shadow-xl flex items-center gap-2 text-xs font-bold backdrop-blur-md border ${
                  copiedId === id 
                    ? 'bg-emerald-500/90 text-white border-emerald-400' 
                    : 'bg-emerald-600/80 text-white border-emerald-500 hover:bg-emerald-500'
                }`}
                title="Add to Editor"
              >
                {copiedId === id ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span className="animate-in fade-in slide-in-from-right-1">Added!</span>
                  </>
                ) : (
                  <>
                    <Code2 size={14} />
                    <span>Use</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      }
      return (
        <code className="bg-slate-100 text-emerald-600 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
          {children}
        </code>
      );
    },
    p: ({ node, children }: any) => {
      const firstChild = node.children[0];
      if (firstChild && firstChild.tagName === 'code') {
        return <>{children}</>;
      }
      return <p>{children}</p>;
    },
    a: ({ node, children, href, ...props }: any) => {
      if (href?.startsWith('term:')) {
        const definition = decodeURIComponent(href.replace('term:', ''));
        const [isHovered, setIsHovered] = useState(false);

        return (
          <span className="relative inline-block">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="text-emerald-600 font-semibold border-b border-emerald-200 hover:bg-emerald-50 transition-colors cursor-help"
            >
              {children}
            </button>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-[110] pointer-events-none"
                >
                  <div className="font-bold mb-1 text-emerald-400">{children}</div>
                  <div className="leading-relaxed opacity-90">{definition}</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-slate-900"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </span>
        );
      }
      if (href === 'demo:specificity') {
        return <SpecificityDemo />;
      }
      if (href === 'demo:g2') {
        return <GridAreasDemo />;
      }
      if (href === 'demo:grid-areas') {
        return <GridAreasDemo />;
      }
      return <a href={href} className="text-emerald-600 hover:underline" {...props}>{children}</a>;
    }
  };

  const renderDashboard = () => {
    const totalLessons = ROADMAP.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessons = Object.values(progress).filter(p => p.completed).length;
    const overallProgress = Math.round((completedLessons / totalLessons) * 100);

    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          <div>
            <header className="mb-12 flex items-start justify-between">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-6 border border-emerald-100"
                >
                  <Sparkles size={14} />
                  THE FUTURE OF LEARNING
                </motion.div>
                <h1 className="text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-none">
                  Master the Web <br />
                  <span className="text-emerald-500">with Lumina.</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                  The most advanced interactive path for absolute beginners to master modern web development through hands-on practice and AI mentorship.
                </p>
              </div>

              {overallProgress === 100 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView('certificate')}
                  className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl border-4 border-emerald-500 relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <Award size={48} className="text-emerald-400 mb-4" />
                    <div className="text-[10px] font-black uppercase tracking-widest mb-1">Course Complete</div>
                    <div className="text-lg font-bold">Claim Certificate</div>
                  </div>
                </motion.button>
              )}
            </header>

            {overallProgress === 100 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 p-8 bg-emerald-500 rounded-[40px] text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center shrink-0">
                    <Trophy size={48} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-black mb-2">Congratulations, Graduate!</h2>
                    <p className="text-emerald-50 font-medium opacity-90 mb-6">
                      You've mastered the fundamentals of web development. Your hard work has paid off!
                    </p>
                    <button 
                      onClick={() => setCurrentView('certificate')}
                      className="px-8 py-3 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto md:mx-0"
                    >
                      <Download size={20} />
                      Download Your Certificate
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid gap-6 mb-12">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Overall Progress</div>
                  <div className="text-3xl font-bold text-slate-900">{overallProgress}%</div>
                  <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallProgress}%` }}></div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Current Streak</div>
                  <div className="text-3xl font-bold text-slate-900">12 Days</div>
                  <div className="text-xs text-emerald-600 font-bold mt-1">Keep it up! 🔥</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total XP</div>
                  <div className="text-3xl font-bold text-slate-900">{completedLessons * 150}</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Next rank at 5,000</div>
                </div>
              </div>
            </div>

            <div className="grid gap-8">
              {ROADMAP.map((module, idx) => {
                const completedCount = module.lessons.filter(l => progress[l.id]?.completed).length;
                const totalCount = module.lessons.length;
                const percentage = (completedCount / totalCount) * 100;

                return (
                  <motion.div 
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-8 border-b border-slate-100 bg-slate-50/30">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 block">
                            Module {idx + 1} • {module.level}
                          </span>
                          <h2 className="text-2xl font-bold text-slate-900">{module.title}</h2>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                          <Trophy size={16} className={percentage === 100 ? "text-emerald-500" : "text-amber-400"} />
                          {completedCount}/{totalCount}
                        </div>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          className={`h-full transition-all duration-700 ease-out ${percentage === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                        />
                      </div>
                    </div>
                    <div className="p-4 grid sm:grid-cols-2 gap-4">
                      {module.lessons.map((lesson) => {
                        const isCompleted = progress[lesson.id]?.completed;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => startLesson(lesson)}
                            className={`flex items-center justify-between p-6 rounded-2xl border transition-all text-left group relative hover:scale-[1.01] ${
                              isCompleted 
                                ? 'border-emerald-100 bg-emerald-50/5 hover:border-emerald-200 hover:bg-emerald-50/20' 
                                : 'border-slate-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/10'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                              }`}>
                                {isCompleted ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{lesson.title}</h3>
                                  {lesson.isComplex && (
                                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-bold rounded uppercase tracking-wider">
                                      <Video size={10} />
                                      Video
                                    </div>
                                  )}
                                  {isCompleted && (
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                      Done
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-1">{lesson.description}</p>
                              </div>
                            </div>
                            <ChevronRight size={20} className={`transition-all ${isCompleted ? 'text-emerald-400' : 'text-slate-300 group-hover:text-emerald-400 group-hover:translate-x-1'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-12 space-y-8">
              <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl -mr-16 -mt-16"></div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-emerald-400" />
                  Live Activity
                </h3>
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {liveActivities.map((activity) => (
                      <motion.div 
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-xs border-l-2 border-emerald-500/30 pl-3 py-1"
                      >
                        <div className="font-bold text-emerald-400">{activity.user}</div>
                        <div className="text-slate-400 mt-0.5">{activity.action}</div>
                        <div className="text-[10px] text-slate-500 mt-1">{activity.time}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs">
                      24 FEB
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">React Workshop</div>
                      <div className="text-[10px] text-slate-500">Live with Mentor Sarah</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs">
                      26 FEB
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Portfolio Review</div>
                      <div className="text-[10px] text-slate-500">Get feedback on your work</div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 text-xs font-bold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  View Full Calendar
                </button>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Professional Growth</h2>
            <p className="text-slate-400 mb-8 max-w-xl">
              Beyond coding, we teach you how to think like an engineer, read documentation, and prepare for your first job.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: 'Clean Code', icon: <Code2 /> },
                { title: 'Job Prep', icon: <GraduationCap /> },
                { title: 'Best Practices', icon: <CheckCircle2 /> }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-emerald-400 mb-3">{item.icon}</div>
                  <h4 className="font-bold">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
        </section>
      </div>
    );
  };

  const renderLesson = () => {
    if (!selectedLesson) return null;

    const previewContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #333; }
            ${selectedLesson.type === 'css' ? code : ''}
          </style>
        </head>
        <body>
          ${selectedLesson.type === 'html' || selectedLesson.type === 'css' ? code : ''}
          ${selectedLesson.type === 'js' ? `<script>${code}</script>` : ''}
        </body>
      </html>
    `;

    const getAceMode = (type: string) => {
      switch(type) {
        case 'html': return 'html';
        case 'css': return 'css';
        case 'js': return 'javascript';
        default: return 'html';
      }
    };

    return (
      <div className="h-screen flex flex-col bg-slate-50">
        <nav className="h-16 border-b bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Learning</span>
                <motion.h2 
                  animate={progress[selectedLesson.id]?.completed ? { y: [0, -2, 0], color: ['#1e293b', '#10b981', '#1e293b'] } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-bold text-slate-800"
                >
                  {selectedLesson.title}
                </motion.h2>
              </div>
              {selectedLesson.isComplex && (
                <button
                  onClick={generateVideo}
                  disabled={isVideoGenerating}
                  className={`ml-2 p-1.5 rounded-full transition-all ${
                    videoUrl 
                      ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' 
                      : 'bg-slate-100 text-slate-400 hover:bg-emerald-100 hover:text-emerald-600'
                  } disabled:opacity-50`}
                  title={videoUrl ? "Watch Video Guide" : "Generate AI Video Guide"}
                >
                  {isVideoGenerating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Play size={16} fill={videoUrl ? "currentColor" : "none"} />
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsFocusMode(!isFocusMode)}
              className={`p-2 rounded-xl transition-colors ${isFocusMode ? 'bg-emerald-100 text-emerald-600' : 'hover:bg-slate-100 text-slate-500'}`}
              title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
            >
              <Layout size={20} />
            </button>
            <motion.button 
              onClick={markAsComplete}
              animate={progress[selectedLesson.id]?.completed ? { scale: [1, 1.05, 1] } : {}}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${progress[selectedLesson.id]?.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <CheckCircle2 size={18} />
              {progress[selectedLesson.id]?.completed ? 'Completed' : 'Mark Complete'}
            </motion.button>
          </div>
        </nav>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar: Instructions & Mentor */}
          {!isFocusMode && (
            <div className="w-1/3 border-r bg-white flex flex-col overflow-hidden">
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Instructions</h3>
                  {selectedLesson.isComplex && (
                    <button
                      onClick={generateVideo}
                      disabled={isVideoGenerating}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        videoUrl 
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                          : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
                      } disabled:opacity-50`}
                    >
                      {isVideoGenerating ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          GENERATING...
                        </>
                      ) : videoUrl ? (
                        <>
                          <Video size={14} />
                          REGENERATE VIDEO
                        </>
                      ) : (
                        <>
                          <Video size={14} />
                          AI VIDEO GUIDE
                        </>
                      )}
                    </button>
                  )}
                </div>

                {isVideoGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Loader2 size={24} className="text-emerald-500 animate-spin" />
                    </div>
                    <div>
                      <div className="font-bold text-emerald-900 text-sm">Generating AI Explanation...</div>
                      <div className="text-emerald-700 text-xs">Veo is crafting a custom visual guide for this topic. This usually takes about a minute.</div>
                    </div>
                  </motion.div>
                )}

                {videoError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-xs font-medium">
                    {videoError}
                  </div>
                )}

                {videoUrl && !isVideoGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-black aspect-video relative group"
                  >
                    <video 
                      src={videoUrl} 
                      controls 
                      className="w-full h-full"
                      autoPlay
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setVideoUrl(null)}
                        className="p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="text-slate-600 leading-relaxed mb-4 prose prose-slate max-w-none">
                  <Markdown components={MarkdownComponents}>{selectedLesson.content}</Markdown>
                </div>

                <div className="mb-8 p-5 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-colors"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <Trophy size={16} />
                      </div>
                      <h4 className="text-sm font-black text-white uppercase tracking-widest">Active Challenge</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed font-medium">
                      {selectedLesson.challenge}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      <Sparkles size={12} />
                      Complete this to earn 150 XP
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm italic flex gap-3">
                  <Info size={18} className="shrink-0 mt-0.5" />
                  {selectedLesson.description}
                </div>
              </div>

              <div className="border-t pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <MessageSquare size={20} className="text-emerald-500" />
                    AI Mentor
                  </h3>
                  {isMentorLoading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-500 border-t-transparent"></div>}
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed prose prose-slate">
                  <Markdown components={MarkdownComponents}>{mentorResponse}</Markdown>
                </div>
                <div className="mt-4 flex gap-2">
                  <input 
                    type="text" 
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleAskMentor(userQuestion)}
                  />
                  <button 
                    onClick={() => handleAskMentor(userQuestion)}
                    disabled={isMentorLoading}
                    className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50"
                  >
                    <Play size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          
          {/* Editor & Preview */}
          <div className={`flex-1 flex bg-slate-900 ${isFocusMode ? 'max-w-5xl mx-auto border-x border-slate-800 shadow-2xl' : ''}`}>
            <div className={`flex flex-col ${selectedLesson.id === 'c2' ? 'w-1/2' : 'w-full'}`}>
              <div className="h-1/2 flex flex-col border-b border-slate-800 overflow-hidden">
                <div className="h-10 bg-slate-800/50 px-4 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Terminal size={14} />
                    editor.{selectedLesson.type}
                    <div className="relative group/info">
                      <Info size={12} className="cursor-help hover:text-slate-200 transition-colors" />
                      <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover/info:opacity-100 pointer-events-none transition-opacity z-50 border border-slate-700">
                        This is where you write your code. The changes will be reflected in the Live Preview below when you click RUN.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowResetConfirm(true)}
                      className="p-1 hover:text-white text-slate-400 transition-colors"
                      title="Reset Code"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button 
                      onClick={handleRunCode}
                      className="flex items-center gap-1 px-2 py-0.5 bg-slate-700 text-white rounded text-[10px] font-bold hover:bg-slate-600 transition-colors"
                    >
                      <Play size={10} />
                      RUN
                    </button>
                    <button 
                      onClick={handleVerifyChallenge}
                      disabled={isVerifying}
                      className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500 text-white rounded text-[10px] font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50"
                    >
                      {isVerifying ? <Loader2 size={10} className="animate-spin" /> : <CheckCircle2 size={10} />}
                      VERIFY
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <AnimatePresence>
                    {verificationFeedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`absolute top-2 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl shadow-2xl border flex items-center gap-3 max-w-md w-[90%] ${
                          verificationFeedback.success 
                            ? 'bg-emerald-500 text-white border-emerald-400' 
                            : 'bg-slate-800 text-slate-200 border-slate-700'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          verificationFeedback.success ? 'bg-white/20' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {verificationFeedback.success ? <Trophy size={18} /> : <Info size={18} />}
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-black uppercase tracking-wider opacity-70 mb-0.5">
                            {verificationFeedback.success ? 'Challenge Passed!' : 'Keep Trying'}
                          </div>
                          <div className="text-xs font-medium leading-tight">{verificationFeedback.message}</div>
                        </div>
                        <button 
                          onClick={() => setVerificationFeedback(null)}
                          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    )}
                    {showResetConfirm && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4"
                      >
                        <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                            <RotateCcw size={24} />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">Reset your code?</h3>
                          <p className="text-slate-600 text-sm mb-6">
                            This will delete all your current progress in this lesson and restore the initial code. This action cannot be undone.
                          </p>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => setShowResetConfirm(false)}
                              className="flex-1 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => {
                                setCode(selectedLesson.initialCode);
                                setShowResetConfirm(false);
                              }}
                              className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
                            >
                              Yes, Reset
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AceEditor
                    mode={getAceMode(selectedLesson.type)}
                    theme="tomorrow_night"
                    onChange={setCode}
                    value={code}
                    name="skillstack-editor"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showLineNumbers: true,
                      tabSize: 2,
                      fontSize: 14,
                      useWorker: false // Disable worker to avoid cross-origin issues in iframe
                    }}
                    style={{ width: '100%', height: '100%' }}
                    className="bg-transparent"
                  />
                </div>
              </div>
              <div className="h-1/2 bg-white flex flex-col">
                <div className="h-10 bg-slate-50 border-b px-4 flex items-center gap-2 text-slate-400 text-xs font-medium shrink-0">
                  <Layout size={14} />
                  Live Preview
                </div>
                <iframe
                  key={previewKey}
                  title="preview"
                  srcDoc={previewContent}
                  className="flex-1 w-full border-none"
                />
              </div>
            </div>
            {selectedLesson.id === 'c2' && (
              <div className="w-1/2 bg-white border-l border-slate-800 flex flex-col">
                <div className="h-10 bg-slate-50 border-b px-4 flex items-center gap-2 text-slate-400 text-xs font-medium shrink-0">
                  <Layout size={14} />
                  Live Preview
                </div>
                <div className="flex-1 p-4 flex items-center justify-center">
                  <iframe
                    srcDoc={code}
                    title="Live Preview"
                    sandbox="allow-scripts"
                    className="w-full h-full border-0 rounded-lg shadow-inner bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-16 border-t bg-white px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${progress[selectedLesson.id]?.completed ? 'text-emerald-600' : 'text-slate-400'}`}>
              {progress[selectedLesson.id]?.completed ? (
                <>
                  <CheckCircle2 size={14} />
                  Lesson Completed
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  In Progress
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={goToPreviousLesson}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={(() => {
                if (!selectedLesson) return true;
                const firstModule = ROADMAP[0];
                return selectedLesson.id === firstModule.lessons[0].id;
              })()}
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button
              onClick={goToNextLesson}
              disabled={!progress[selectedLesson.id]?.completed}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                progress[selectedLesson.id]?.completed
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Next Lesson
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <AnimatePresence mode="wait">
        {currentView === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderDashboard()}
          </motion.div>
        ) : currentView === 'certificate' ? (
          <motion.div
            key="certificate"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[100] bg-slate-50 overflow-y-auto"
          >
            <Certificate 
              userName="SkillStack Student" 
              date={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              onBack={() => setCurrentView('dashboard')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="lesson"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="fixed inset-0 z-50"
          >
            {renderLesson()}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCompletionModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="max-w-md w-full bg-white rounded-[40px] shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8 shadow-inner">
                  <Trophy size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">You Did It!</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  You've successfully completed all modules and challenges in SkillStack. You're now a certified web developer!
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setShowCompletionModal(false);
                      setCurrentView('certificate');
                    }}
                    className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <Award size={20} />
                    View Certificate
                  </button>
                  <button
                    onClick={() => setShowCompletionModal(false)}
                    className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
              
              {/* Simple Confetti Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 1, 
                    x: 0, 
                    y: 0, 
                    rotate: 0 
                  }}
                  animate={{ 
                    opacity: 0, 
                    x: (Math.random() - 0.5) * 400, 
                    y: (Math.random() - 0.5) * 400, 
                    rotate: Math.random() * 360 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatDelay: Math.random() * 2 
                  }}
                  className={`absolute w-2 h-2 rounded-full ${['bg-emerald-400', 'bg-indigo-400', 'bg-amber-400', 'bg-pink-400'][i % 4]}`}
                  style={{ top: '50%', left: '50%' }}
                />
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
