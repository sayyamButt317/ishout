export interface GuidedQuestionsType {
    goal: string;
    industry: string;
    targetCountry: string;
    targetDemographics: string;
    platforms: string[];
    startDate: string;
    endDate: string;
    budgetRange: string;
    influencerCount: string;
    influencerTier: string;
    keyRequirements: string;
    nationalities: string[];
    contentType: string[];
    contentQuantity: string;
    messaging: string;
    hashtags: string;
    brandGuidelines: string;
    restrictions: string;
    usageRights: boolean;
  }
  
 export interface GuidedQuestionComponentProps {
    guidedQuestion: GuidedQuestionsType;
  setMultipleFields: (fields: Partial<GuidedQuestionsType>) => void;
}