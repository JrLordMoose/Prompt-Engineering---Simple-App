import { describe, it, expect } from 'vitest';
import { generatePrompt, validateAnswers } from '../promptGenerator';

describe('promptGenerator', () => {
  describe('generatePrompt', () => {
    it('should generate a prompt for social media domain', () => {
      const answers = {
        platform: 'LinkedIn',
        content_type: 'Educational/Informative',
        topic: 'AI in business',
        tone: 'Professional/Formal',
        target_audience: 'business professionals',
        call_to_action: 'Like/Comment',
        hashtags: 'Yes, include relevant hashtags'
      };

      const prompt = generatePrompt('social-media', answers);
      
      expect(prompt).toContain('Create a Professional/Formal social media post');
      expect(prompt).toContain('AI in business');
      expect(prompt).toContain('LinkedIn');
      expect(prompt).toContain('business professionals');
    });

    it('should generate a prompt for headlines domain', () => {
      const answers = {
        content_type: 'Blog Post/Article',
        topic: 'productivity tips',
        headline_style: 'Benefit-focused',
        target_audience: 'busy professionals',
        goal: 'Drive Clicks/Traffic',
        tone: 'Professional/Formal',
        length_preference: 'Medium (50-100 characters)'
      };

      const prompt = generatePrompt('headlines', answers);
      
      expect(prompt).toContain('Create a Professional/Formal Benefit-focused headline');
      expect(prompt).toContain('productivity tips');
      expect(prompt).toContain('drives clicks and traffic');
    });

    it('should throw error for invalid domain', () => {
      expect(() => {
        generatePrompt('invalid-domain', {});
      }).toThrow('Domain not found: invalid-domain');
    });
  });

  describe('validateAnswers', () => {
    it('should validate required fields', () => {
      const answers = {
        platform: 'LinkedIn',
        // Missing required fields
      };

      const result = validateAnswers('social-media', answers);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate text length constraints', () => {
      const answers = {
        platform: 'LinkedIn',
        content_type: 'Educational/Informative',
        topic: 'A', // Too short
        tone: 'Professional/Formal',
        target_audience: 'business professionals',
        call_to_action: 'Like/Comment',
        hashtags: 'Yes, include relevant hashtags'
      };

      const result = validateAnswers('social-media', answers);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.some(error => error.includes('Minimum length'))).toBe(true);
    });

    it('should pass validation for complete answers', () => {
      const answers = {
        platform: 'LinkedIn',
        content_type: 'Educational/Informative',
        topic: 'AI in business',
        tone: 'Professional/Formal',
        target_audience: 'business professionals',
        call_to_action: 'Like/Comment',
        hashtags: 'Yes, include relevant hashtags'
      };

      const result = validateAnswers('social-media', answers);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });
});
