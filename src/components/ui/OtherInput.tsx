import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface OtherInputProps {
  value?: string;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  questionContext: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function OtherInput({
  value = '',
  onChange,
  onKeyPress,
  questionContext,
  placeholder = "Describe your specific need...",
  error,
  className
}: OtherInputProps) {
  const [otherValue, setOtherValue] = useState('');

  useEffect(() => {
    setOtherValue(value);
  }, [value]);

  const handleInputChange = (inputValue: string) => {
    setOtherValue(inputValue);
    onChange(inputValue);
  };

  const getContextualHelp = (context: string): string => {
    const helpTexts: Record<string, string> = {
      'platform': 'Describe the specific platform you\'re creating content for. Include any unique features or requirements.',
      'content_type': 'Describe the specific type of content you\'re creating. Include format, style, or purpose details.',
      'tone': 'Describe the specific tone or voice you want. Include examples or adjectives that capture your desired style.',
      'target_audience': 'Describe your specific target audience in detail. Include demographics, interests, behaviors, or characteristics.',
      'call_to_action': 'Describe the specific action you want readers to take. Include details about the desired outcome.',
      'hashtags': 'Describe your specific hashtag strategy or requirements. Include any particular hashtags or themes.',
      'naming_type': 'Describe what you\'re specifically naming. Include details about the product, service, or feature.',
      'product_category': 'Describe the specific category or industry. Include any unique characteristics or niche details.',
      'naming_style': 'Describe the specific naming style you prefer. Include examples or adjectives that capture your desired approach.',
      'brand_personality': 'Describe the specific personality traits you want to convey. Include adjectives or characteristics.',
      'length_preference': 'Describe your specific length requirements. Include any constraints or preferences.',
      'email_type': 'Describe the specific type of email you\'re writing. Include context, purpose, or unique requirements.',
      'recipient_relationship': 'Describe your specific relationship with the recipient. Include context or unique circumstances.',
      'urgency': 'Describe the specific urgency level or timeline. Include any time constraints or deadlines.',
      'desired_outcome': 'Describe the specific outcome you want. Include details about the desired response or action.',
      'headline_style': 'Describe the specific headline style you prefer. Include examples or adjectives that capture your desired approach.',
      'goal': 'Describe your specific goal or objective. Include details about what you want to achieve.'
    };

    return helpTexts[context] || 'Please provide additional details to help generate a more accurate prompt.';
  };

  const getContextualPlaceholder = (context: string): string => {
    const placeholders: Record<string, string> = {
      'platform': 'e.g., "A niche gaming forum with 18-25 demographic"',
      'content_type': 'e.g., "A comprehensive case study with customer testimonials"',
      'tone': 'e.g., "Warm and encouraging, like a supportive mentor"',
      'target_audience': 'e.g., "Small business owners in the healthcare industry"',
      'call_to_action': 'e.g., "Schedule a free consultation call"',
      'hashtags': 'e.g., "Focus on #SmallBusiness and #Healthcare"',
      'naming_type': 'e.g., "A premium subscription tier for enterprise clients"',
      'product_category': 'e.g., "B2B SaaS for project management"',
      'naming_style': 'e.g., "Modern and tech-forward, like Tesla or Apple"',
      'brand_personality': 'e.g., "Innovative and trustworthy, with a touch of playfulness"',
      'length_preference': 'e.g., "Must fit within a 280-character Twitter limit"',
      'email_type': 'e.g., "A follow-up email after a successful sales call"',
      'recipient_relationship': 'e.g., "A potential client I met at a networking event"',
      'urgency': 'e.g., "Need response within 24 hours due to project deadline"',
      'desired_outcome': 'e.g., "Get them to schedule a product demo"',
      'headline_style': 'e.g., "Compelling and curiosity-driven, like BuzzFeed"',
      'goal': 'e.g., "Increase newsletter signups by 25%"'
    };

    return placeholders[context] || 'Describe your specific requirements...';
  };

  return (
    <div className={cn('w-full space-y-3', className)}>
      {/* Helpful guidance */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-800 mb-2">
          <strong>💡 Help the AI understand your needs:</strong>
        </p>
        <p className="text-sm text-blue-700 mb-2">
          {getContextualHelp(questionContext)}
        </p>
        <p className="text-xs text-blue-600">
          <strong>Pro tip:</strong> You can copy and paste your final prompt to an AI tool for even better results!
        </p>
      </div>

      {/* Input field */}
      <textarea
        value={otherValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={getContextualPlaceholder(questionContext)}
        className={cn(
          'flex min-h-[100px] w-full rounded-md border border-secondary-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-secondary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-red-500 focus-visible:ring-red-500' : '',
        )}
        rows={4}
      />
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
