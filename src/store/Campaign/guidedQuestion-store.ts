import { GuidedQuestionsType } from "@/src/types/guidedquestion-type";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface GuidedQuestionState {
    guidedQuestion: GuidedQuestionsType;

    // setField: <K extends keyof Omit<GuidedQuestionState, 'setField'>>(
    //     field: K,
    //     value: GuidedQuestionState[K]
    // ) => void;
    setMultipleFields: (fields: Partial<GuidedQuestionsType>) => void;
    getField: <K extends keyof Omit<GuidedQuestionState, 'getField'>>(
        field: K
    ) => GuidedQuestionState[K];
    // clearGuidedQuestion: () => void;
}

export const useGuidedQuestionStore = create<GuidedQuestionState>()(
    devtools(
        persist(
            (set, get) => ({

                guidedQuestion: {
                    goal: '',
                    industry: '',
                    targetCountry: '',
                    targetDemographics: '',
                    platforms: [],
                    startDate: '',
                    endDate: '',
                    budgetRange: '',
                    influencerCount: '',
                    influencerTier: '',
                    keyRequirements: '',
                    nationalities: [],
                    contentType: [],
                    contentQuantity: '',
                    messaging: '',
                    hashtags: '',
                    brandGuidelines: '',
                    restrictions: '',
                    usageRights: false,
                },
                // setField: (field: keyof GuidedQuestionsType, value: GuidedQuestionState[keyof GuidedQuestionState]) => set((state) => ({ ...state, [field]: value })),
                setMultipleFields: (fields: Partial<GuidedQuestionsType>) => set({ guidedQuestion: { ...get().guidedQuestion, ...fields } }),
                getField: (field) => get()[field],
                // clearGuidedQuestion: () => set({
                //     guidedQuestion: {
                //         goal: '',
                //         industry: '',
                //         targetCountry: '',
                //         targetDemographics: '',
                //         platforms: [],
                //         startDate: '',
                //         endDate: '',
                //         budgetRange: '',
                //         influencerCount: '',
                //         influencerTier: '',
                //         keyRequirements: '',
                //         nationalities: [],
                //         contentType: [],
                //         contentQuantity: '',
                //         messaging: '',
                //         hashtags: '',
                //         brandGuidelines: '',
                //         restrictions: '',
                //         usageRights: false,
                //     }
                // }),


            }),
            {
                name: 'guidedQuestion-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)