import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, UIState } from '@/types/app';
import type { Domain } from '@/types/domain';

interface AppStore extends AppState, UIState {
  // Actions
  setCurrentDomain: (domainId: string | null) => void;
  setCurrentStep: (step: AppState['currentStep']) => void;
  setAnswers: (answers: Record<string, any>) => void;
  updateAnswer: (questionId: string, value: any) => void;
  setGeneratedPrompt: (prompt: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetSession: () => void;
  
  // UI Actions
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setAnimations: (enabled: boolean) => void;
  
  // Computed values
  getCurrentDomain: () => Domain | null;
  getProgress: () => { current: number; total: number; percentage: number };
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentDomain: null,
      currentStep: 'domain-selection',
      answers: {},
      generatedPrompt: null,
      isLoading: false,
      error: null,
      
      // UI state
      sidebarOpen: false,
      theme: 'light',
      animations: true,
      
      // Actions
      setCurrentDomain: (domainId) => set({ currentDomain: domainId }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setAnswers: (answers) => set({ answers }),
      
      updateAnswer: (questionId, value) => 
        set((state) => ({
          answers: { ...state.answers, [questionId]: value }
        })),
      
      setGeneratedPrompt: (prompt) => set({ generatedPrompt: prompt }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      resetSession: () => set({
        currentDomain: null,
        currentStep: 'domain-selection',
        answers: {},
        generatedPrompt: null,
        error: null
      }),
      
      // UI Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setTheme: (theme) => set({ theme }),
      
      setAnimations: (enabled) => set({ animations: enabled }),
      
      // Computed values
      getCurrentDomain: () => {
        // This would typically fetch from a domains store or API
        // For now, return null - will be implemented with domain data
        return null;
      },
      
      getProgress: () => {
        const state = get();
        const currentDomain = state.getCurrentDomain();
        if (!currentDomain) return { current: 0, total: 0, percentage: 0 };
        
        const totalQuestions = currentDomain.questions.length;
        const answeredQuestions = Object.keys(state.answers).length;
        const percentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
        
        return {
          current: answeredQuestions,
          total: totalQuestions,
          percentage: Math.round(percentage)
        };
      }
    }),
    {
      name: 'prompt-generator-storage',
      partialize: (state) => ({
        currentDomain: state.currentDomain,
        currentStep: state.currentStep,
        answers: state.answers,
        generatedPrompt: state.generatedPrompt,
        theme: state.theme,
        animations: state.animations
      })
    }
  )
);
