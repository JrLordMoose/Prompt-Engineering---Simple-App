import type { Domain } from '@/types/domain';

// Import domain configurations
import socialMediaDomain from '@/data/domains/social-media.json';
import webCopyDomain from '@/data/domains/web-copy.json';
import productNamesDomain from '@/data/domains/product-names.json';
import emailsDomain from '@/data/domains/emails.json';

// Domain registry
const domains: Record<string, Domain> = {
  'social-media': socialMediaDomain as Domain,
  'web-copy': webCopyDomain as Domain,
  'product-names': productNamesDomain as Domain,
  'emails': emailsDomain as Domain,
};

/**
 * Get all available domains
 */
export function getAllDomains(): Domain[] {
  return Object.values(domains);
}

/**
 * Get a specific domain by ID
 */
export function getDomainById(id: string): Domain | null {
  return domains[id] || null;
}

/**
 * Get domain IDs
 */
export function getDomainIds(): string[] {
  return Object.keys(domains);
}

/**
 * Validate domain configuration
 */
export function validateDomain(domain: Domain): boolean {
  if (!domain.id || !domain.name || !domain.description) {
    return false;
  }
  
  if (!Array.isArray(domain.questions) || domain.questions.length === 0) {
    return false;
  }
  
  if (!Array.isArray(domain.templates) || domain.templates.length === 0) {
    return false;
  }
  
  return true;
}

/**
 * Get questions for a domain, sorted by order
 */
export function getDomainQuestions(domainId: string): Domain['questions'] {
  const domain = getDomainById(domainId);
  if (!domain) return [];
  
  return domain.questions.sort((a, b) => a.order - b.order);
}

/**
 * Get templates for a domain
 */
export function getDomainTemplates(domainId: string): Domain['templates'] {
  const domain = getDomainById(domainId);
  if (!domain) return [];
  
  return domain.templates;
}

/**
 * Get examples for a domain
 */
export function getDomainExamples(domainId: string): Domain['examples'] {
  const domain = getDomainById(domainId);
  if (!domain) return [];
  
  return domain.examples;
}
