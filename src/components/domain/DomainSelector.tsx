import React from 'react';
import { getAllDomains } from '@/lib/domainLoader';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/utils/cn';

export function DomainSelector() {
  const { setCurrentDomain, setCurrentStep } = useAppStore();
  const domains = getAllDomains();

  const handleDomainSelect = (domainId: string) => {
    setCurrentDomain(domainId);
    setCurrentStep('questions');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          Choose Your Prompt Type
        </h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Select the type of content you want to create. We'll guide you through 
          a series of questions to generate the perfect prompt for your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className={cn(
              'group relative bg-white rounded-lg border-2 border-secondary-200 p-6 cursor-pointer transition-all duration-200 hover:border-primary-300 hover:shadow-lg',
              `hover:border-${domain.color}-300`
            )}
            onClick={() => handleDomainSelect(domain.id)}
          >
            <div className="flex items-center mb-4">
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-semibold',
                `bg-${domain.color}-500`
              )}>
                {getIcon(domain.icon)}
              </div>
              <h3 className="ml-4 text-xl font-semibold text-secondary-900">
                {domain.name}
              </h3>
            </div>
            
            <p className="text-secondary-600 mb-4">
              {domain.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-500">
                {domain.questions.length} questions
              </span>
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-white text-sm',
                `bg-${domain.color}-500`
              )}>
                →
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-secondary-500">
          More prompt types coming soon!
        </p>
      </div>
    </div>
  );
}

function getIcon(iconName: string): string {
  const icons: Record<string, string> = {
    'share-2': '📱',
    'type': '📝',
    'mail': '✉️',
    'message-square': '💬',
    'file-text': '📄',
    'code': '💻',
    'image': '🖼️',
    'video': '🎥',
    'music': '🎵',
    'book': '📚'
  };
  
  return icons[iconName] || '📋';
}
