/**
 * Security utilities
 */

/**
 * Check for common SQL injection patterns
 * Note: Prisma already protects against SQL injection, but this adds an extra layer
 */
export function detectSQLInjection(input) {
  if (typeof input !== 'string') return false;
  
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/i,
    /(UNION.*SELECT)/i,
    /(--|\#|\/\*)/,
    /('|";|";--|'--)/,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Sanitize database query params
 */
export function sanitizeQueryParam(param) {
  if (typeof param !== 'string') return param;
  
  if (detectSQLInjection(param)) {
    throw new Error('Invalid input detected');
  }
  
  return param.trim();
}

/**
 * Check if email is from a disposable email provider
 */
export function isDisposableEmail(email) {
  const disposableDomains = [
    'tempmail.com',
    'throwaway.email',
    'guerrillamail.com',
    'mailinator.com',
    '10minutemail.com',
  ];
  
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}

/**
 * Rate limit check helper
 */
export function shouldRateLimit(identifier, maxRequests = 100, windowMs = 60000) {
  // This is a simplified version - use proper rate limiting in production
  return false; // Handled by our rate limiter
}