/**
 * Performance optimization utilities
 */

/**
 * Measure function execution time
 */
export async function measurePerformance(fn, label = 'Operation') {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    
    if (duration > 1000) {
      console.warn(`⚠️  ${label} took ${duration.toFixed(2)}ms`);
    } else {
      console.log(`✓ ${label} completed in ${duration.toFixed(2)}ms`);
    }
    
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`✗ ${label} failed after ${duration.toFixed(2)}ms`);
    throw error;
  }
}

/**
 * Debounce function for search inputs
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle(fn, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}