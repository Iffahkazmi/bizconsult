/**
 * Simple monitoring utilities
 * In production, integrate with services like Sentry, LogRocket, etc.
 */

class Monitor {
  constructor() {
    this.metrics = {
      apiCalls: 0,
      errors: 0,
      reportGenerated: 0,
      chatMessages: 0,
    };
  }

  trackApiCall() {
    this.metrics.apiCalls++;
  }

  trackError(error, context = '') {
    this.metrics.errors++;
    console.error(`[Monitor] Error in ${context}:`, error.message);
  }

  trackReportGenerated() {
    this.metrics.reportGenerated++;
  }

  trackChatMessage() {
    this.metrics.chatMessages++;
  }

  getMetrics() {
    return { ...this.metrics };
  }

  logMetrics() {
    console.log('📊 Metrics:', this.metrics);
  }
}

export const monitor = new Monitor();

// Log metrics every 5 minutes in development
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    monitor.logMetrics();
  }, 5 * 60 * 1000);
}