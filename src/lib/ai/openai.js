import OpenAI from 'openai';

// Use NVIDIA if available, otherwise OpenAI
const useNVIDIA = !!process.env.NVIDIA_API_KEY;

console.log('Using NVIDIA:', useNVIDIA);

const openai = new OpenAI({
  apiKey: useNVIDIA ? process.env.NVIDIA_API_KEY : process.env.OPENAI_API_KEY,
  baseURL: useNVIDIA 
    ? 'https://integrate.api.nvidia.com/v1' 
    : 'https://api.openai.com/v1',
});

export default openai; 