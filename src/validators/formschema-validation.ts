import { z } from "zod";

export const guidedQuestionsSchema = z.object({

  goal: z.string().min(1, "Please specify your campaign goal"),
  industry: z.string().min(1, "Please select an industry"),
  targetCountry: z.string().min(1, "Please specify target country"),
  targetDemographics: z.string().min(1, "Please specify target demographics"),
  platforms: z.array(z.string()).min(1, "Please select at least one platform"),
  startDate: z.string().min(1, "Please specify start date"),
  endDate: z.string().min(1, "Please specify end date"),
  
  // Step 6: Budget
  budgetRange: z.string().min(1, "Please specify budget range"),
  
  // Step 7: Number of Influencers
  influencerCount: z.string().min(1, "Please specify number of influencers"),
  
  // Step 8: Influencer Tier
  influencerTier: z.string().min(1, "Please select influencer tier"),
  
  // Step 9: Key Requirements
  keyRequirements: z.string().min(1, "Please specify key requirements"),
  
  // Step 10: Nationalities
  nationalities: z.array(z.string()).min(1, "Please select at least one nationality"),
  
  // Step 11: Content Type
  contentType: z.array(z.string()).min(1, "Please select at least one content type"),
  
  // Step 12: Content Quantity
  contentQuantity: z.string().min(1, "Please specify content quantity per influencer"),
  
  // Step 13: Messaging & Guidelines
  messaging: z.string().optional(),
  hashtags: z.string().optional(),
  brandGuidelines: z.string().optional(),
  
  // Step 14: Restrictions
  restrictions: z.string().optional(),
  
  // Step 15: Usage Rights
  usageRights: z.boolean().default(false),
});

export type GuidedQuestionsType = z.infer<typeof guidedQuestionsSchema>;