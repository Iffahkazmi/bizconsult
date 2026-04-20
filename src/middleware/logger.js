/**
 * Simple request logger middleware
 */

export function logRequest(req, startTime) {
  const duration = Date.now() - startTime;
  const { method, url } = req;
  
  console.log(`[API] ${method} ${url} - ${duration}ms`);
  
  // Log slow requests
  if (duration > 3000) {
    console.warn(`⚠️  Slow request detected: ${method} ${url} took ${duration}ms`);
  }
}

export function createRequestLogger() {
  return (req) => {
    const startTime = Date.now();
    
    // Return cleanup function
    return () => logRequest(req, startTime);
  };
}