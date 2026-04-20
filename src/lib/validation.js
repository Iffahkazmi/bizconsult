/**
 * Sanitize user input to prevent XSS and injection attacks
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .slice(0, 1000); // Max length
}

/**
 * Validate business idea input
 */
export function validateBusinessIdea(idea) {
  if (!idea || typeof idea !== 'string') {
    return { valid: false, error: 'Business idea is required' };
  }

  const sanitized = sanitizeInput(idea);
  
  if (sanitized.length < 10) {
    return { valid: false, error: 'Business idea must be at least 10 characters' };
  }

  if (sanitized.length > 500) {
    return { valid: false, error: 'Business idea must be less than 500 characters' };
  }

  return { valid: true, sanitized };
}

/**
 * Validate email format
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate chat message
 */
export function validateChatMessage(message) {
  if (!message || typeof message !== 'string') {
    return { valid: false, error: 'Message is required' };
  }

  const sanitized = sanitizeInput(message);
  
  if (sanitized.length < 1) {
    return { valid: false, error: 'Message cannot be empty' };
  }

  if (sanitized.length > 2000) {
    return { valid: false, error: 'Message must be less than 2000 characters' };
  }

  return { valid: true, sanitized };
}