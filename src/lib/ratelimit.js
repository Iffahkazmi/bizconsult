// Simple in-memory rate limiter (for development)
// In production, use Upstash Redis for distributed rate limiting

const rateLimitMap = new Map();

export function rateLimit({ 
  interval = 60 * 1000, // 1 minute
  uniqueTokenPerInterval = 500, // max requests per interval
}) {
  return {
    check: async (limit, token) => {
      const tokenCount = rateLimitMap.get(token) || [0, Date.now()];
      
      if (Date.now() - tokenCount[1] > interval) {
        // Reset if interval has passed
        rateLimitMap.set(token, [1, Date.now()]);
        return { success: true, limit, remaining: limit - 1, reset: Date.now() + interval };
      }
      
      if (tokenCount[0] >= limit) {
        // Rate limit exceeded
        return { success: false, limit, remaining: 0, reset: tokenCount[1] + interval };
      }
      
      // Increment count
      tokenCount[0]++;
      rateLimitMap.set(token, tokenCount);
      
      return { success: true, limit, remaining: limit - tokenCount[0], reset: tokenCount[1] + interval };
    },
  };
}

// Rate limiters for different endpoints
export const apiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 100,
});

export const reportLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 50,
});

export const chatLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 100,
});