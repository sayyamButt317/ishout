import { ReadyMadeInfluencersApiResponse, ReadyMadeInfluencersRequest } from "@/src/types/readymadeinfluencers-type";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface TemplateProps {
    _id: string[];
    username: string[];
    platform: string[];
    category: string[];
    limit: string;
    followers: string[];
    country: string[];
    campaign_id: string;
    iseditable: boolean;
    isSelected: boolean;
    results?: ReadyMadeInfluencersApiResponse | ReadyMadeInfluencersRequest;

    setField: <K extends keyof Omit<TemplateProps, 'setField' | 'getField' | 'addToArray' | 'removeFromArray' | 'clearArray' | 'clearTemplate' | 'setResults' | 'removeInfluencer'>>(
        field: K,
        value: TemplateProps[K]
    ) => void;

    getField: <K extends keyof Omit<TemplateProps, 'setField' | 'getField' | 'addToArray' | 'removeFromArray' | 'clearArray' | 'clearTemplate' | 'setResults' | 'removeInfluencer'>>(
        field: K
    ) => TemplateProps[K];

    addToArray: (field: "platform" | "category" | "followers" | "country", value: string) => void;
    removeFromArray: (field: "platform" | "category" | "followers" | "country" | "limit", value: string) => void;
    clearArray: (field: "platform" | "category" | "followers" | "country" | "limit", value: string) => void;
    clearTemplate: () => void;
    setResults: (results: ReadyMadeInfluencersApiResponse | ReadyMadeInfluencersRequest) => void;
    removeInfluencer: (influencerId: string) => void;
}


export const useReadyMadeTemplateStore = create<TemplateProps>()(
    devtools(
        persist(
            (set, get) => ({
                _id: [],
                username: [],
                category: [],
                platform: [],
                limit: "",
                followers: [],
                country: [],
                campaign_id: "",
                results: undefined,
                iseditable: false,
                isSelected: false,

                setField: (field, value) => set((state) => ({ ...state, [field]: value })),
                getField: (field) => get()[field],

                addToArray: (field, value) => set((state) => ({
                    ...state,
                    [field]: [...(Array.isArray(state[field]) ? state[field] : []), value]
                })),
                removeFromArray: (field, value) => set((state) => ({
                    ...state,
                    [field]: (Array.isArray(state[field]) ? state[field] : []).filter((v) => v !== value)
                })),
                clearArray: (field) => set((state) => ({ ...state, [field]: [] })),

                setResults: (results: ReadyMadeInfluencersApiResponse | ReadyMadeInfluencersRequest) => set({ results }),
                removeInfluencer: (influencerId: string) =>
                    set((state) => {
                        const currentResults = state.results;

                        if (!currentResults || !currentResults.influencers) {
                            return {};
                        }

                        const updatedInfluencers = currentResults.influencers.filter(
                            (influencer) => influencer._id !== influencerId
                        );

                        const nextResults: ReadyMadeInfluencersApiResponse | ReadyMadeInfluencersRequest = {
                            ...currentResults,
                            influencers: updatedInfluencers,
                        };

                        if ('notes' in nextResults && nextResults.notes) {
                            nextResults.notes = {
                                ...nextResults.notes,
                                returned: updatedInfluencers.length,
                            };
                        }

                        return { results: nextResults };
                    }),
                clearTemplate: () => set({
                    _id: [],
                    username: [],
                    campaign_id: "",
                    category: [],
                    platform: [],
                    limit: "",
                    followers: [],
                    country: [],
                    iseditable: false,
                    results: undefined,
                }),
            }),

            {
                name: "campaign-store",
                storage: createJSONStorage(() => localStorage),
                // partialize: (state) => ({
                //     results: state.results,
                // }),
            }
        )
    )
);
