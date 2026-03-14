export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  initialCode: string;
  solution: string;
  challenge: string;
  type: 'html' | 'css' | 'js' | 'react';
  isComplex?: boolean;
  videoPrompt?: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of options
}

export interface Exam {
  id: string;
  title: string;
  questions: ExamQuestion[];
}

export interface Module {
  id: string;
  title: string;
  level: Level;
  lessons: Lesson[];
  exam?: Exam;
}

export interface UserProgress {
  lesson_id: string;
  completed: boolean;
  code_state: string;
}

export interface ExamScore {
  module_id: string;
  score: number; // percentage 0-100
  completed: boolean;
}
