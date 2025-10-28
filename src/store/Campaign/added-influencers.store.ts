import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";


interface AddedInfluencersProps {
    influencers: ReadyMadeInfluencerResponse[];
    addInfluencer: (influencer: ReadyMadeInfluencerResponse) => void;
    addInfluencers: (influencers: ReadyMadeInfluencerResponse[]) => void;
    getInfluencers: () => ReadyMadeInfluencerResponse[];
    removeInfluencerById: (_id: string) => void;
    clearAddedInfluencers: () => void;
}

export const AddedInfluencersStore = create<AddedInfluencersProps>()(
    devtools(
        persist(
            (set, get) => ({
                influencers: [],
                addInfluencer: (influencer: ReadyMadeInfluencerResponse) =>
                    set({ influencers: [...get().influencers, influencer] }),
                addInfluencers: (influencers: ReadyMadeInfluencerResponse[]) =>
                    set({ influencers: [...get().influencers, ...influencers] }),
                getInfluencers() {
                    return get().influencers;
                },
                removeInfluencerById: (_id: string) =>
                    set({ influencers: get().influencers.filter((i) => i._id !== _id) }),
                clearAddedInfluencers: () => set({ influencers: [] }),
            }),
            {
                name: "added-influencers-store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
)