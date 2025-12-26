import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface RejectedInfluencersProps {
    platform: string;
    category: string;
    followers: string[];
    country: string[];
    limit: number;
    campaign_id: string;
    generated_influencers_id: string[];
    rejected_influencers_id: string[];

    // setters and getters
    setField: <K extends keyof Omit<
        RejectedInfluencersProps,
        "setField" | "addToArray" | "removeFromArray" | "clearStore"
    >>(
        field: K,
        value: RejectedInfluencersProps[K]
    ) => void;
    getField: <K extends keyof Omit<
        RejectedInfluencersProps,
        "setField" | "addToArray" | "removeFromArray" | "clearStore"
    >>(
        field: K
    ) => RejectedInfluencersProps[K];

    // array helpers
    addToArray: (
        field: "followers" | "country" | "generated_influencers_id" | "rejected_influencers_id",
        value: string
    ) => void;


    removeFromArray: (
        field: "followers" | "country" | "generated_influencers_id" | "rejected_influencers_id",
        value: string
    ) => void;

    clearStore: () => void;
}

export const useRejectedInfluencersStore = create<RejectedInfluencersProps>()(
    devtools(
        persist(
            (set, get) => ({
                platform: "",
                category: "",
                followers: [],
                country: [],
                limit: 1,
                campaign_id: "",
                generated_influencers_id: [],
                rejected_influencers_id: [],

                setField: (field, value) =>
                    set((state) => ({ ...state, [field]: value })),

                addToArray: (field, value) =>
                    set((state) => ({
                        ...state,
                        [field]: state[field].includes(value)
                            ? state[field]
                            : [...state[field], value],
                    })),

                getField: (field) => get()[field],

                removeFromArray: (field, value) =>
                    set((state) => ({
                        ...state,
                        [field]: state[field].filter((v) => v !== value),
                    })),

                clearStore: () =>
                    set({
                        platform: "",
                        category: "",
                        followers: [],
                        country: [],
                        limit: 1,
                        campaign_id: "",
                        generated_influencers_id: [],
                        rejected_influencers_id: [],
                    }),
            }),
            {
                name: "RejectedInfluencersStore",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
