import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { AudienceSelect } from '@/components/ui/AudienceSelect';
import { OtherInput } from '@/components/ui/OtherInput';
import { useAppStore } from '@/stores/appStore';
import { getDomainQuestions, getDomainById } from '@/lib/domainLoader';
import { generatePrompt, validateAnswers } from '@/lib/promptGenerator';
import { ProgressBar } from './ProgressBar';

export function QuestionWizard() {
  const { 
    currentDomain, 
    answers, 
    updateAnswer, 
    setGeneratedPrompt, 
    setCurrentStep,
    setError 
  } = useAppStore();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const domain = currentDomain ? getDomainById(currentDomain) : null;
  const questions = domain ? getDomainQuestions(currentDomain!) : [];
  const currentQuestion = questions[currentQuestionIndex];
  
  const progress = {
    current: currentQuestionIndex + 1,
    total: questions.length,
    percentage: Math.round(((currentQuestionIndex + 1) / questions.length) * 100)
  };

  useEffect(() => {
    if (!domain) {
      setCurrentStep('domain-selection');
    }
  }, [domain, setCurrentStep]);

  const handleAnswerChange = (questionId: string, value: any) => {
    updateAnswer(questionId, value);
    
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
    
    // Clear global error when user makes changes
    setError(null);
  };

  const handleOtherSelect = (questionId: string, otherValue: string) => {
    updateAnswer(questionId, otherValue);
    
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
    
    // Clear global error when user makes changes
    setError(null);
  };

  const validateCurrentQuestion = (): boolean => {
    if (!currentQuestion) return true;
    
    // Only validate the current question
    if (currentQuestion.required && !answers[currentQuestion.id]) {
      setErrors(prev => ({ ...prev, [currentQuestion.id]: `${currentQuestion.question} is required` }));
      return false;
    }
    
    // Special validation for "Other" options
    if (answers[currentQuestion.id] === 'Other' && !answers[`${currentQuestion.id}_other`]) {
      setErrors(prev => ({ ...prev, [`${currentQuestion.id}_other`]: 'Please provide details for your custom option' }));
      return false;
    }
    
    // Validate specific validation rules for the current question
    if (answers[currentQuestion.id] && currentQuestion.validation) {
      const value = answers[currentQuestion.id];
      
      if (currentQuestion.validation?.minLength && String(value).length < currentQuestion.validation.minLength) {
        setErrors(prev => ({ ...prev, [currentQuestion.id]: `Minimum length is ${currentQuestion.validation!.minLength} characters` }));
        return false;
      }
      
      if (currentQuestion.validation?.maxLength && String(value).length > currentQuestion.validation.maxLength) {
        setErrors(prev => ({ ...prev, [currentQuestion.id]: `Maximum length is ${currentQuestion.validation!.maxLength} characters` }));
        return false;
      }
      
      // Validate number min/max
      if (currentQuestion.validation?.min !== undefined && Number(value) < currentQuestion.validation.min) {
        setErrors(prev => ({ ...prev, [currentQuestion.id]: `Minimum value is ${currentQuestion.validation!.min}` }));
        return false;
      }
      
      if (currentQuestion.validation?.max !== undefined && Number(value) > currentQuestion.validation.max) {
        setErrors(prev => ({ ...prev, [currentQuestion.id]: `Maximum value is ${currentQuestion.validation!.max}` }));
        return false;
      }
    }
    
    // Clear any existing error for this question
    setErrors(prev => ({ ...prev, [currentQuestion.id]: '' }));
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) return;
    
    // Clear any global errors when moving to next question
    setError(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleGeneratePrompt();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Clear any global errors when going back
      setError(null);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleGeneratePrompt = () => {
    try {
      setError(null);
      const validation = validateAnswers(currentDomain!, answers);
      
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return;
      }
      
      const prompt = generatePrompt(currentDomain!, answers);
      setGeneratedPrompt(prompt);
      setCurrentStep('result');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate prompt');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  if (!domain || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <ProgressBar progress={progress} />
        <div className="flex justify-between text-sm text-secondary-600 mt-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{progress.percentage}% complete</span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg border border-secondary-200 p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-secondary-900 mb-2">
            {currentQuestion.question}
          </h2>
          {currentQuestion.description && (
            <p className="text-secondary-600">{currentQuestion.description}</p>
          )}
        </div>

        {/* Answer Input */}
        <div className="mb-6">
                     {currentQuestion.type === 'text' && (
             <Input
               value={answers[currentQuestion.id] || ''}
               onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
               onKeyPress={handleKeyPress}
               placeholder="Enter your answer..."
               error={errors[currentQuestion.id]}
             />
           )}

                     {currentQuestion.type === 'textarea' && (
             <Textarea
               value={answers[currentQuestion.id] || ''}
               onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
               onKeyPress={handleKeyPress}
               placeholder="Enter your answer..."
               error={errors[currentQuestion.id]}
               rows={4}
             />
           )}

                     {currentQuestion.type === 'select' && currentQuestion.options && (
             <>
               <Select
                 value={answers[currentQuestion.id] || ''}
                 onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                 onKeyPress={handleKeyPress}
                 options={currentQuestion.options.map(option => ({ value: option, label: option }))}
                 error={errors[currentQuestion.id]}
                 onOtherSelect={handleOtherSelect}
                 questionId={currentQuestion.id}
                 questionContext={currentQuestion.id}
               />
               
               {/* Show OtherInput when "Other" is selected */}
               {answers[currentQuestion.id] === 'Other' && (
                 <div className="mt-3">
                   <OtherInput
                     value={answers[`${currentQuestion.id}_other`] || ''}
                     onChange={(value) => handleOtherSelect(`${currentQuestion.id}_other`, value)}
                     onKeyPress={handleKeyPress}
                     questionContext={currentQuestion.id}
                     error={errors[`${currentQuestion.id}_other`]}
                   />
                 </div>
               )}
             </>
           )}

                      {currentQuestion.type === 'number' && (
             <Input
               type="number"
               value={answers[currentQuestion.id] || ''}
               onChange={(e) => handleAnswerChange(currentQuestion.id, parseInt(e.target.value) || '')}
               onKeyPress={handleKeyPress}
               placeholder="Enter a number..."
               min={currentQuestion.validation?.min}
               max={currentQuestion.validation?.max}
               error={errors[currentQuestion.id]}
             />
           )}

           {currentQuestion.type === 'audience_select' && currentQuestion.options && (
             <AudienceSelect
               value={answers[currentQuestion.id] || ''}
               onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
               onKeyPress={handleKeyPress}
               options={currentQuestion.options}
               error={errors[currentQuestion.id]}
             />
           )}

           {currentQuestion.type === 'scale' && (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={value}
                    checked={answers[currentQuestion.id] === value}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, parseInt(e.target.value))}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-secondary-700">{value}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id] && currentQuestion.required}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Generate Prompt' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
