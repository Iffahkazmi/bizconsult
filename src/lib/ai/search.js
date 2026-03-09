/**
 * Execute web searches using Serper.dev
 */
export async function executeWebSearches(queries) {
  const API_KEY = process.env.SERPER_API_KEY;
  
  if (!API_KEY) {
    throw new Error('SERPER_API_KEY is not configured');
  }

  try {
    // Execute all searches in parallel
    const searchPromises = queries.map(async (query) => {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: query,
          num: 10, // Get top 10 results per query
        }),
      });

      if (!response.ok) {
        throw new Error(`Search failed for query: ${query}`);
      }

      const data = await response.json();
      return {
        query,
        results: data.organic || [],
        answerBox: data.answerBox || null,
        knowledgeGraph: data.knowledgeGraph || null,
      };
    });

    const results = await Promise.all(searchPromises);
    return results;
  } catch (error) {
    console.error('Web search error:', error);
    throw error;
  }
}