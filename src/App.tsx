import { Header } from '@/components/layout/Header';
import { DomainSelector } from '@/components/domain/DomainSelector';
import { QuestionWizard } from '@/components/forms/QuestionWizard';
import { PromptResult } from '@/components/prompt/PromptResult';
import { useAppStore } from '@/stores/appStore';

function App() {
  const { currentStep, error } = useAppStore();

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />
      
      <main className="flex-1">
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-3">
            <div className="max-w-7xl mx-auto">
              <p className="text-red-800 text-sm">
                <strong>Error:</strong> {error}
              </p>
            </div>
          </div>
        )}
        
        {currentStep === 'domain-selection' && <DomainSelector />}
        {currentStep === 'questions' && <QuestionWizard />}
        {currentStep === 'result' && <PromptResult />}
      </main>
      
      <footer className="bg-white border-t border-secondary-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-secondary-600">
            <p className="text-sm">
              Simple Prompt Generator - Built with Context Engineering
            </p>
            <p className="text-xs mt-2">
              Generate better AI prompts through guided questions and expert templates
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
