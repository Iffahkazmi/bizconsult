import OpenAI from 'openai';

// Use OpenAI if available, otherwise fall back to OpenRouter
const useOpenRouter = !process.env.OPENAI_API_KEY && !!process.env.OPENROUTER_API_KEY;

console.log('Using OpenRouter:', useOpenRouter);

const openai = new OpenAI({
  apiKey: useOpenRouter ? process.env.OPENROUTER_API_KEY : process.env.OPENAI_API_KEY,
  baseURL: useOpenRouter ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1',
  defaultHeaders: useOpenRouter 
    ? {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'BizConsult AI',
      } 
    : {},
});

export default openai;