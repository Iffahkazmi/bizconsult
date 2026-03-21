import openai from './openai';

/**
 * Retry function with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 2) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000;
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/**
 * Generate complete business analysis report
 */
export async function generateReport(idea, insights) {
  return retryWithBackoff(async () => {
    try {
      const prompt = `You are a senior business consultant. Create a comprehensive business feasibility report based on the following data.

Business Idea: "${idea}"

Market Research Data:
${JSON.stringify(insights, null, 2)}

Generate a detailed report as a JSON object with this EXACT structure:

{
  "executiveSummary": "3-4 sentence high-level verdict",
  "ideaOverview": {
    "restatedIdea": "Clear restatement of the idea",
    "category": "Industry category",
    "targetAudience": "Primary target audience"
  },
  "marketExistence": {
    "exists": true/false,
    "competitors": [
      {
        "name": "Competitor name",
        "description": "What they do",
        "strengths": "Their advantages",
        "weaknesses": "Their gaps"
      }
    ]
  },
  "marketDemand": {
    "level": "high/medium/low",
    "trends": "Market trend analysis",
    "searchVolume": "Search interest if available"
  },
  "marketSize": {
    "tam": "Total addressable market estimate",
    "sam": "Serviceable addressable market",
    "som": "Serviceable obtainable market"
  },
  "customerPainPoints": [
    "Pain point 1",
    "Pain point 2",
    "Pain point 3"
  ],
  "pros": [
    "Pro 1",
    "Pro 2",
    "Pro 3"
  ],
  "cons": [
    "Con 1",
    "Con 2",
    "Con 3"
  ],
  "improvements": [
    "Improvement opportunity 1",
    "Improvement opportunity 2",
    "Improvement opportunity 3"
  ],
  "verdict": {
    "decision": "go/nogo/pivot",
    "reasoning": "Detailed explanation of the verdict",
    "confidence": "high/medium/low"
  },
  "sources": [
    {
      "title": "Source title",
      "url": "Source URL"
    }
  ]
}

Be honest and data-driven. If the idea faces major challenges, say so. Return ONLY valid JSON.`;

      const response = await openai.chat.completions.create({
        model: process.env.NVIDIA_API_KEY ? 'meta/llama-3.1-70b-instruct' : 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a senior business consultant. Provide thorough, honest analysis. Return only valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.6,
        max_tokens: 3000,
      });

      const content = response.choices[0].message.content.trim();
      
      // Remove markdown code blocks if present
      let cleanContent = content;
      if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }
      
      const report = JSON.parse(cleanContent);

      console.log('Generated report:', report);
      return report;
    } catch (error) {
      console.error('Report generation error:', error);
      throw new Error('Failed to generate report');
    }
  });
}