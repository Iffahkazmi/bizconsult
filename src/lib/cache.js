/**
 * Simple in-memory cache for API responses
 * In production, use Redis for distributed caching
 */

class Cache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = 300000) { // Default 5 minutes
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

export const cache = new Cache();

// Helper to generate cache keys
export function getCacheKey(prefix, ...args) {
  return `${prefix}:${args.join(':')}`;
}