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

export interface Module {
  id: string;
  title: string;
  level: Level;
  lessons: Lesson[];
}

export interface UserProgress {
  lesson_id: string;
  completed: boolean;
  code_state: string;
}
