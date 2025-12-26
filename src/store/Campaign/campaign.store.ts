import { ReadyMadeInfluencersApiResponse } from "@/src/types/readymadeinfluencers-type";
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
    results?: ReadyMadeInfluencersApiResponse[];

    setField: <K extends keyof Omit<TemplateProps, 'setField' | 'getField' | 'addToArray' | 'removeFromArray' | 'clearArray'>>(
        field: K,
        value: TemplateProps[K]
    ) => void;

    getField: <K extends keyof Omit<TemplateProps, 'setField' | 'getField' | 'addToArray' | 'removeFromArray' | 'clearArray'>>(
        field: K
    ) => TemplateProps[K];

    addToArray: (field: "platform" | "category" | "followers" | "country", value: string) => void;
    removeFromArray: (field: "platform" | "category" | "followers" | "country" | "limit", value: string) => void;
    clearArray: (field: "platform" | "category" | "followers" | "country" | "limit", value: string) => void;
    clearTemplate: () => void;
    setResults: (results: ReadyMadeInfluencersApiResponse[] | undefined) => void;
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

                setResults: (results: ReadyMadeInfluencersApiResponse[] | undefined) => set({ results }),
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
                name: "CampaignStore",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
