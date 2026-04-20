/**
 * Validate required environment variables on startup
 */

const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
];

const optionalEnvVars = [
  'OPENAI_API_KEY',
  'NVIDIA_API_KEY',
  'GEMINI_API_KEY',
  'SERPER_API_KEY',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
];

export function validateEnv() {
  const missing = [];
  const warnings = [];

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Check optional but recommended variables
  const hasAnyAI = process.env.OPENAI_API_KEY || 
                   process.env.NVIDIA_API_KEY || 
                   process.env.GEMINI_API_KEY;
  
  if (!hasAnyAI) {
    warnings.push('No AI API key found (OPENAI_API_KEY, NVIDIA_API_KEY, or GEMINI_API_KEY)');
  }

  if (!process.env.SERPER_API_KEY) {
    warnings.push('SERPER_API_KEY not set - web search will not work');
  }

  // Log results
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(v => console.error(`  - ${v}`));
    throw new Error('Missing required environment variables');
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:');
    warnings.forEach(w => console.warn(`  - ${w}`));
  }

  console.log('✅ Environment variables validated');
}