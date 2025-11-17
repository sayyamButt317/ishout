import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";


interface ApprovedInfluencersProps {
    approvedInfluencers: ReadyMadeInfluencerResponse[];
    addApprovedInfluencer: (influencer: ReadyMadeInfluencerResponse) => void;
    clearApprovedInfluencers: () => void;
}

export const ApprovedInfluencersStore = create<ApprovedInfluencersProps>()(
    devtools(
        persist(
            (set, get) => ({
                approvedInfluencers: [],
                addApprovedInfluencer: (influencer: ReadyMadeInfluencerResponse) =>
                    set({ approvedInfluencers: [...get().approvedInfluencers, influencer] }),
                clearApprovedInfluencers: () => set({ approvedInfluencers: [] }),
            }),
            {
                name: "approved-influencers-store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);