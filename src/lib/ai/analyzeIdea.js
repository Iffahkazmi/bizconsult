import { generateSearchQueries } from './generateQueries';
import { executeWebSearches } from './search';
import { synthesizeResults } from './synthesizeResults';
import { generateReport } from './generateReport';
import { reportSchema } from '../schemas/reportSchema';

/**
 * Main orchestrator: Takes an idea and returns a complete report
 */
export async function analyzeIdea(idea, reportId, updateProgress) {
  try {
    // Step 1: Generate search queries
    updateProgress?.('Generating search queries...', 1);
    const queries = await generateSearchQueries(idea);
    
    // Step 2: Execute web searches
    updateProgress?.('Searching the web...', 2);
    const searchResults = await executeWebSearches(queries);
    
    // Step 3: Synthesize insights
    updateProgress?.('Analyzing data...', 3);
    const insights = await synthesizeResults(idea, searchResults);
    
    // Step 4: Generate full report
    updateProgress?.('Generating report...', 4);
    const report = await generateReport(idea, insights);
    
    // Step 5: Validate report structure
    updateProgress?.('Validating report...', 5);
    const validatedReport = reportSchema.parse(report);
    
    // Step 6: Add metadata
    updateProgress?.('Finalizing...', 6);
    const finalReport = {
      ...validatedReport,
      metadata: {
        ideaInput: idea,
        generatedAt: new Date().toISOString(),
        queriesUsed: queries,
        searchResultsCount: searchResults.reduce((acc, r) => acc + r.results.length, 0),
      },
    };
    
    return finalReport;
  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
}