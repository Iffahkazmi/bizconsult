/**
 * Centralized error handling utility
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error) {
  // Log error
  console.error('API Error:', {
    message: error.message,
    stack: error.stack,
    statusCode: error.statusCode || 500,
  });

  // Determine response
  if (error instanceof AppError) {
    return {
      error: error.message,
      statusCode: error.statusCode,
    };
  }

  // Default error response (don't expose internal errors)
  return {
    error: 'An unexpected error occurred. Please try again.',
    statusCode: 500,
  };
}

export function logError(context, error, additionalInfo = {}) {
  console.error(`[${context}] Error:`, {
    message: error.message,
    stack: error.stack,
    ...additionalInfo,
    timestamp: new Date().toISOString(),
  });
}