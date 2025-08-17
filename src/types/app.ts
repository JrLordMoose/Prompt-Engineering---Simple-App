export interface AppState {
  currentDomain: string | null;
  currentStep: 'domain-selection' | 'questions' | 'result';
  answers: Record<string, any>;
  generatedPrompt: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  animations: boolean;
}

export interface NavigationState {
  canGoBack: boolean;
  canGoForward: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface CopyToClipboardResult {
  success: boolean;
  error?: string;
}

export interface ProgressState {
  current: number;
  total: number;
  percentage: number;
  isComplete: boolean;
}
