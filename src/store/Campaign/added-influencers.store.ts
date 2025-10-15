import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";


interface AddedInfluencersProps{
    influencers: ReadyMadeInfluencerResponse[];
    setField: <K extends keyof Omit<AddedInfluencersProps, 'setField'>>(
        field: K,
        value: AddedInfluencersProps[K]
    ) => void;
    getField: <K extends keyof Omit<AddedInfluencersProps, 'getField'>>(
        field: K
    ) => AddedInfluencersProps[K];
    clearInfluencers: () => void;
}

export const AddedInfluencersStore = create<AddedInfluencersProps>()(
    devtools(
        persist(
            (set, get) => ({
                influencers: [],
                setField: (field, value) => set((state) => ({ ...state, [field]: value })),
                getField: (field) => get()[field],
                clearInfluencers: () => set({ influencers: [] }),
            }),
            {
                name: "added-influencers-store",
            }
        )
    )
)