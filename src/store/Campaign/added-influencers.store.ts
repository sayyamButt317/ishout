import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";


interface AddedInfluencersProps {
    influencers: ReadyMadeInfluencerResponse[];
    addInfluencer: (influencer: ReadyMadeInfluencerResponse) => void;
    addInfluencers: (influencers: ReadyMadeInfluencerResponse[]) => void;
    getInfluencers: () => void;
    removeInfluencerById: (_id: string) => void;
    clearInfluencers: () => void;
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
                },
                removeInfluencerById: (_id: string) =>
                    set({ influencers: get().influencers.filter((i) => i._id !== _id) }),
                clearInfluencers: () => set({ influencers: [] }),
            }),
            {
                name: "added-influencers-store",
            }
        )
    )
)