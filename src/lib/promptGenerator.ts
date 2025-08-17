import type { Domain, PromptTemplate } from '@/types/domain';
import { getDomainById, getDomainQuestions } from './domainLoader';

/**
 * Generate a prompt based on user answers and domain configuration
 */
export function generatePrompt(
  domainId: string,
  answers: Record<string, any>
): string {
  const domain = getDomainById(domainId);
  if (!domain) {
    throw new Error(`Domain not found: ${domainId}`);
  }

  // Get the first template (in a real app, you might want to select based on answers)
  const template = domain.templates[0];
  if (!template) {
    throw new Error(`No templates found for domain: ${domainId}`);
  }

  return processTemplate(template, answers, domain);
}

/**
 * Process a template with user answers
 */
function processTemplate(
  template: PromptTemplate,
  answers: Record<string, any>,
  domain: Domain
): string {
  let result = template.template;

  // Replace variables in the template
  for (const [variableName] of Object.entries(template.variables)) {
    const value = getVariableValue(variableName, answers, domain);
    const placeholder = `{${variableName}}`;
    
    if (value !== null && value !== undefined) {
      result = result.replace(placeholder, String(value));
    } else {
      // Remove the placeholder if no value is available
      result = result.replace(placeholder, '');
    }
  }

  // Clean up any extra whitespace
  result = result.replace(/\s+/g, ' ').trim();

  return result;
}

/**
 * Get the value for a template variable from user answers
 */
function getVariableValue(
  variableName: string,
  answers: Record<string, any>,
  _domain: Domain
): any {
  // Handle "Other" values - if the answer is "Other", use the custom value
  if (answers[variableName] === 'Other' && answers[`${variableName}_other`]) {
    return answers[`${variableName}_other`];
  }
  
  // Direct mapping from answers
  if (answers[variableName] !== undefined) {
    return answers[variableName];
  }

  // Handle special variable mappings
  switch (variableName) {
    case 'call_to_action_instruction':
      return getCallToActionInstruction(answers.call_to_action);
    
    case 'hashtag_instruction':
      return getHashtagInstruction(answers.hashtags);
    
    case 'goal_description':
      return getGoalDescription(answers.goal);
    
    case 'urgency_level':
      return getUrgencyLevel(answers.urgency);
    
    case 'length_instruction':
      return getLengthInstruction(answers.length_preference);
    
    case 'variations_instruction':
      return getVariationsInstruction(answers.variations);
    
    case 'length_instruction':
      return getLengthInstruction(answers.length_preference);
    
    default:
      return null;
  }
}

/**
 * Get call-to-action instruction based on user selection
 */
function getCallToActionInstruction(cta: string): string {
  switch (cta) {
    case 'Like/Comment':
      return 'Include a call-to-action asking readers to like and comment';
    case 'Share/Retweet':
      return 'Include a call-to-action asking readers to share the post';
    case 'Follow/Subscribe':
      return 'Include a call-to-action asking readers to follow or subscribe';
    case 'Visit Website':
      return 'Include a call-to-action directing readers to visit your website';
    case 'Download/Get':
      return 'Include a call-to-action for downloading or getting something';
    case 'Learn More':
      return 'Include a call-to-action encouraging readers to learn more';
    case 'Custom':
      return 'Include a custom call-to-action';
    default:
      return '';
  }
}

/**
 * Get hashtag instruction based on user selection
 */
function getHashtagInstruction(hashtags: string): string {
  switch (hashtags) {
    case 'Yes, include relevant hashtags':
      return 'Include 5-7 relevant hashtags';
    case 'Yes, but minimal (1-3)':
      return 'Include 1-3 relevant hashtags';
    case 'Yes, trending hashtags':
      return 'Include trending hashtags related to the topic';
    default:
      return '';
  }
}

/**
 * Get goal description based on user selection
 */
function getGoalDescription(goal: string): string {
  switch (goal) {
    case 'Drive Clicks/Traffic':
      return 'drives clicks and traffic';
    case 'Generate Leads':
      return 'generates leads and conversions';
    case 'Increase Engagement':
      return 'increases engagement and interaction';
    case 'Build Authority':
      return 'builds authority and credibility';
    case 'Sell Products/Services':
      return 'sells products or services';
    case 'Share Information':
      return 'shares valuable information';
    case 'Entertain/Amuse':
      return 'entertains and amuses the audience';
    case 'Inspire Action':
      return 'inspires action and motivation';
    default:
      return 'achieves the desired goal';
  }
}

/**
 * Get urgency level description
 */
function getUrgencyLevel(urgency: string): string {
  switch (urgency) {
    case 'Not urgent - informational':
      return 'informational and not time-sensitive';
    case 'Somewhat urgent - needs attention soon':
      return 'somewhat urgent and needs attention soon';
    case 'Urgent - requires immediate response':
      return 'urgent and requires immediate response';
    case 'Very urgent - time-sensitive matter':
      return 'very urgent and time-sensitive';
    default:
      return 'appropriate urgency level';
  }
}

/**
 * Get length instruction
 */
function getLengthInstruction(length: string): string {
  switch (length) {
    case 'Short (under 50 characters)':
      return 'Keep it under 50 characters';
    case 'Medium (50-100 characters)':
      return 'Keep it between 50-100 characters';
    case 'Long (100+ characters)':
      return 'Can be longer than 100 characters';
    default:
      return '';
  }
}

/**
 * Get variations instruction
 */
function getVariationsInstruction(variations: number): string {
  if (!variations || variations < 3) {
    return 'Generate 3 variations';
  }
  if (variations > 20) {
    return 'Generate 20 variations';
  }
  return `Generate ${variations} variations`;
}

/**
 * Validate user answers against domain questions
 */
export function validateAnswers(
  domainId: string,
  answers: Record<string, any>
): { isValid: boolean; errors: string[] } {
  const questions = getDomainQuestions(domainId);
  const errors: string[] = [];

  for (const question of questions) {
    if (question.required && !answers[question.id]) {
      errors.push(`${question.question} is required`);
      continue;
    }

    if (answers[question.id] && question.validation) {
      const validationError = validateAnswer(answers[question.id], question.validation);
      if (validationError) {
        errors.push(validationError);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate a single answer against validation rules
 */
function validateAnswer(value: any, validation: any): string | null {
  if (validation.minLength && String(value).length < validation.minLength) {
    return `Minimum length is ${validation.minLength} characters`;
  }

  if (validation.maxLength && String(value).length > validation.maxLength) {
    return `Maximum length is ${validation.maxLength} characters`;
  }

  if (validation.pattern) {
    const regex = new RegExp(validation.pattern);
    if (!regex.test(String(value))) {
      return 'Invalid format';
    }
  }

  if (validation.custom) {
    const result = validation.custom(value);
    if (result !== true) {
      return typeof result === 'string' ? result : 'Invalid value';
    }
  }

  return null;
}
