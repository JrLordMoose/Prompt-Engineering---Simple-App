export interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  questions: Question[];
  templates: PromptTemplate[];
  examples: Example[];
}

export interface Question {
  id: string;
  type: 'text' | 'select' | 'multiselect' | 'textarea' | 'scale' | 'number' | 'audience_select';
  question: string;
  description?: string;
  required: boolean;
  validation?: ValidationRule;
  dependencies?: Dependency[];
  options?: string[]; // for select types
  order: number;
}

export interface ValidationRule {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  custom?: (value: any) => boolean | string;
}

export interface Dependency {
  questionId: string;
  value: any;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string; // with {variable} placeholders
  variables: Record<string, VariableConfig>;
  examples: TemplateExample[];
}

export interface VariableConfig {
  type: 'string' | 'number' | 'boolean' | 'array';
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface TemplateExample {
  inputs: Record<string, any>;
  output: string;
  description: string;
}

export interface Example {
  title: string;
  description: string;
  prompt: string;
  result?: string;
}

export interface UserSession {
  sessionId: string;
  domainId: string;
  answers: Record<string, any>;
  generatedPrompt?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionAnswer {
  questionId: string;
  value: any;
  timestamp: Date;
}
