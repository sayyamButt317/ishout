import { ReadyMadeInfluencersResponse } from "@/src/types/readymadeinfluencers-type";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type PlatformType = "Instagram" | "YouTube" | "TikTok" | ""

interface TemplateProps {
    platform: PlatformType;
    category: string;
    limit: string;
    followers: string;
    country: string;
    results?: ReadyMadeInfluencersResponse;

    setField: <K extends keyof Omit<TemplateProps, 'setField'>>(
        field: K,
        value: TemplateProps[K]
    ) => void;

    getField: <K extends keyof Omit<TemplateProps, 'getField'>>(
        field: K
    ) => TemplateProps[K];
    clearTemplate: () => void;
    setResults: (results: ReadyMadeInfluencersResponse) => void;
}

export const useReadyMadeTemplateStore = create<TemplateProps>()(
    devtools(
        persist(
            (set, get) => ({
                category: "",
                platform: "",
                limit: "1",
                followers: "1k-2k",
                country: "",
                results: undefined,

                setField: (field, value) => set((state) => ({ ...state, [field]: value })),
                getField: (field) => get()[field],
                setResults: (results: ReadyMadeInfluencersResponse) => set({ results }),
                clearTemplate: () => set({
                    category: "",
                    platform: "",
                    limit: "",
                    followers: "",
                    country: "",
                    results: undefined,
                }),
            }),

            {
                name: "campaign-store",
            }
        )
    )
);
