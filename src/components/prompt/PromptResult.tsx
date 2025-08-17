import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/stores/appStore';
import { getDomainById } from '@/lib/domainLoader';
import { copyToClipboard } from '@/utils/clipboard';

export function PromptResult() {
  const { 
    currentDomain, 
    generatedPrompt, 
    resetSession, 
    setCurrentStep,
    error 
  } = useAppStore();
  
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  
  const domain = currentDomain ? getDomainById(currentDomain) : null;

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    
    setCopyStatus('copying');
    const result = await copyToClipboard(generatedPrompt);
    
    if (result.success) {
      setCopyStatus('success');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } else {
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const handleStartOver = () => {
    resetSession();
  };

  const handleEditAnswers = () => {
    setCurrentStep('questions');
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Generating Prompt
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={handleStartOver}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  if (!generatedPrompt) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Generating your prompt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✅</span>
        </div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">
          Your Prompt is Ready!
        </h1>
        <p className="text-lg text-secondary-600">
          Here's your customized prompt for {domain?.name.toLowerCase()}
        </p>
      </div>

      {/* Generated Prompt */}
      <div className="bg-white rounded-lg border border-secondary-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900">
            Generated Prompt
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={copyStatus === 'copying'}
          >
            {copyStatus === 'copying' && 'Copying...'}
            {copyStatus === 'success' && 'Copied!'}
            {copyStatus === 'error' && 'Failed'}
            {copyStatus === 'idle' && 'Copy to Clipboard'}
          </Button>
        </div>
        
        <div className="bg-secondary-50 rounded-md p-4 border border-secondary-200">
          <pre className="whitespace-pre-wrap text-secondary-800 font-mono text-sm leading-relaxed">
            {generatedPrompt}
          </pre>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          How to Use This Prompt
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-blue-800">
          <li>Copy the prompt above</li>
          <li>Paste it into your preferred AI tool (ChatGPT, Claude, etc.)</li>
          <li>Review and adjust the generated content as needed</li>
          <li>Use the content for your intended purpose</li>
        </ol>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          onClick={handleEditAnswers}
        >
          Edit Answers
        </Button>
        
        <Button
          onClick={handleStartOver}
        >
          Create New Prompt
        </Button>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-secondary-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-3">
          💡 Tips for Better Results
        </h3>
        <ul className="space-y-2 text-secondary-700">
          <li>• Be specific about your requirements in the AI tool</li>
          <li>• Provide additional context if needed</li>
          <li>• Iterate and refine based on the AI's output</li>
          <li>• Save successful prompts for future use</li>
        </ul>
      </div>
    </div>
  );
}
