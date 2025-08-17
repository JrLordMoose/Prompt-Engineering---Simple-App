import React from 'react';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/stores/appStore';

export function Header() {
  const { resetSession, currentStep } = useAppStore();

  return (
    <header className="bg-white border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary-600">
              Simple Prompt Generator
            </h1>
            <span className="ml-2 text-sm text-secondary-500">
              AI-powered prompt creation
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentStep !== 'domain-selection' && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetSession}
              >
                Start Over
              </Button>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-secondary-600">
              <span>Powered by</span>
              <span className="font-semibold text-primary-600">Context Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
