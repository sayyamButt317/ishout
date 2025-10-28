import { z } from "zod";

export const guidedQuestionsSchema = z.object({

  goal: z.string().min(1, "Please specify your campaign goal"),
  industry: z.string().min(1, "Please select an industry"),
  targetCountry: z.string().min(1, "Please specify target country"),
  targetDemographics: z.string().min(1, "Please specify target demographics"),
  platforms: z.array(z.string()).min(1, "Please select at least one platform"),
  startDate: z.string().min(1, "Please specify start date"),
  endDate: z.string().min(1, "Please specify end date"),

  budgetRange: z.string().min(1, "Please specify budget range"),
  influencerCount: z.string().min(1, "Please specify number of influencers"),
  influencerTier: z.string().min(1, "Please select influencer tier"),
  keyRequirements: z.string().min(1, "Please specify key requirements"),
  nationalities: z.array(z.string()).min(1, "Please select at least one nationality"),
  contentType: z.array(z.string()).min(1, "Please select at least one content type"),
  contentQuantity: z.string().min(1, "Please specify content quantity per influencer"),

  messaging: z.string().optional(),
  hashtags: z.string().optional(),
  brandGuidelines: z.string().optional(),
  restrictions: z.string().optional(),
  usageRights: z.boolean().default(false),
});

export type GuidedQuestionsType = z.infer<typeof guidedQuestionsSchema>;