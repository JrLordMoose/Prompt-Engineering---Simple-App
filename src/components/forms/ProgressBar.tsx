import React from 'react';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between text-sm text-secondary-600 mb-2">
        <span>Progress</span>
        <span>{progress.percentage}%</span>
      </div>
      
      <div className="w-full bg-secondary-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-secondary-500 mt-1">
        <span>Question {progress.current}</span>
        <span>of {progress.total}</span>
      </div>
    </div>
  );
}
