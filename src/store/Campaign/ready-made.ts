import { ReadyMadeInfluencersApiResponse, ReadyMadeInfluencersRequest } from "@/src/types/readymadeinfluencers-type";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface TemplateProps {
    platform: string[];
    category: string[];
    limit: string;
    followers: string[];
    country: string[];
    iseditable: boolean;
    isSelected: boolean;
    results?: ReadyMadeInfluencersApiResponse | ReadyMadeInfluencersRequest;

    setField: <K extends keyof Omit<TemplateProps, 'setField' | 'getField' | 'addToArray' | 'removeFromArray' | 'clearArray'>>(
        field: K,
        value: TemplateProps[K]
    ) => void;

    getField: <K extends keyof Omit<TemplateProps, 'setField' | 'getField' | 'addToArray' | 'removeFromArray' | 'clearArray'>>(
        field: K
    ) => TemplateProps[K];

    addToArray: (field: "platform" | "category" | "followers" | "country", value: string) => void;
    removeFromArray: (field: "platform" | "category" | "followers" | "country", value: string) => void;
    clearArray: (field: "platform" | "category" | "followers" | "country") => void;
    clearTemplate: () => void;
    setResults: (results: ReadyMadeInfluencersApiResponse | ReadyMadeInfluencersRequest) => void;
}


export const useReadyMadeTemplateStore = create<TemplateProps>()(
    devtools(
        persist(
            (set, get) => ({
                category: [],
                platform: [],
                limit: "",
                followers: [],
                country: [],
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
                clearTemplate: () => set({
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
            }
        )
    )
);
