import openai from './openai';

/**
 * Synthesize search results into structured insights
 */
export async function synthesizeResults(idea, searchResults) {
  try {
    // Prepare search results as text
    const searchData = searchResults
      .map((result) => {
        const snippets = result.results
          .slice(0, 5)
          .map((r) => `- ${r.title}: ${r.snippet}`)
          .join('\n');
        return `Query: "${result.query}"\nResults:\n${snippets}`;
      })
      .join('\n\n');

    const prompt = `You are a business analyst. Analyze the following web search results about a business idea and extract key insights.

Business Idea: "${idea}"

Web Search Results:
${searchData}

Extract and return a JSON object with:
{
  "competitors": [
    {
      "name": "Company name",
      "description": "What they do",
      "strengths": "Their advantages",
      "weaknesses": "Their weaknesses"
    }
  ],
  "marketDemand": {
    "level": "high/medium/low",
    "evidence": "Evidence from search results",
    "trends": "Growing/stable/declining with explanation"
  },
  "customerPainPoints": [
    "Pain point 1",
    "Pain point 2"
  ],
  "marketSize": {
    "estimation": "Market size estimate if found",
    "sources": "Where this info came from"
  }
}

Return ONLY valid JSON, no markdown, no explanations.`;

    const response = await openai.chat.completions.create({
      model: process.env.NVIDIA_API_KEY ? 'meta/llama-3.1-70b-instruct' : 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a business analyst. Return only valid JSON objects.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content.trim();
    
    let cleanContent = content;
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }
    
    const insights = JSON.parse(cleanContent);

    console.log('Synthesized insights:', insights);
    return insights;
  } catch (error) {
    console.error('Synthesis error:', error);
    throw new Error('Failed to synthesize search results');
  }
}