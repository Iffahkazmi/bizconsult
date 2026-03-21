import openai from './openai';

/**
 * Generate search queries from a business idea
 */
export async function generateSearchQueries(idea) {
  try {
    const prompt = `You are a business research assistant. Given a business idea, generate 8 diverse search queries that will help research its market viability.

Business Idea: "${idea}"

Generate queries covering:
1. Direct competitors in this space
2. Market size and growth trends
3. Customer reviews and pain points
4. Similar products or services
5. Industry reports and statistics
6. Target audience research
7. Pricing and business models
8. Recent news or developments

Return ONLY a JSON array of 8 search query strings, nothing else. No markdown, no explanations.

Example format: ["query 1", "query 2", "query 3", ...]`;

    const response = await openai.chat.completions.create({
      model: process.env.NVIDIA_API_KEY ? 'meta/llama-3.1-8b-instruct' : 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a business research expert. Return only valid JSON arrays.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content.trim();
    
    // Clean the response
    let cleanContent = content;
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    
    // Parse the JSON response
    const queries = JSON.parse(cleanContent);
    
    if (!Array.isArray(queries) || queries.length === 0) {
      throw new Error('Invalid queries format');
    }

    console.log('Generated queries:', queries);
    return queries;
  } catch (error) {
    console.error('Query generation error:', error);
    throw new Error('Failed to generate search queries');
  }
}