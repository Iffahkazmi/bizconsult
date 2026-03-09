import { z } from 'zod';

export const reportSchema = z.object({
  executiveSummary: z.string().min(10),
  ideaOverview: z.object({
    restatedIdea: z.string(),
    category: z.string(),
    targetAudience: z.string(),
  }),
  marketExistence: z.object({
    exists: z.boolean(),
    competitors: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        strengths: z.string(),
        weaknesses: z.string(),
      })
    ),
  }),
  marketDemand: z.object({
    level: z.enum(['high', 'medium', 'low']),
    trends: z.string(),
    searchVolume: z.string().optional(),
  }),
  marketSize: z.object({
    tam: z.string(),
    sam: z.string(),
    som: z.string(),
  }),
  customerPainPoints: z.array(z.string()).min(1),
  pros: z.array(z.string()).min(1),
  cons: z.array(z.string()).min(1),
  improvements: z.array(z.string()).min(1),
  verdict: z.object({
    decision: z.enum(['go', 'nogo', 'pivot']),
    reasoning: z.string(),
    confidence: z.enum(['high', 'medium', 'low']),
  }),
  sources: z.array(
    z.object({
      title: z.string(),
      url: z.string().url(),
    })
  ).optional(),
});