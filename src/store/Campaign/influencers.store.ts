import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";


interface ApprovedInfluencersProps {
    approvedInfluencers: ReadyMadeInfluencerResponse[];
    RejectedInfluencerId: string[];

    addApprovedInfluencer: (influencer: ReadyMadeInfluencerResponse) => void;
    addRejectedInfluencerId: (influencerId: string) => void;
    removeRejectedInfluencerId: (influencerId: string) => void;
    clearRejectedInfluencerId: () => void;
    clearApprovedInfluencers: () => void;
}

export const ApprovedInfluencersStore = create<ApprovedInfluencersProps>()(
    devtools(
        persist(
            (set, get) => ({
                approvedInfluencers: [],
                RejectedInfluencerId: [],

                addRejectedInfluencerId: (influencerId: string) =>
                    set({ RejectedInfluencerId: [...get().RejectedInfluencerId, influencerId] }),
                removeRejectedInfluencerId: (influencerId: string) =>
                    set({ RejectedInfluencerId: get().RejectedInfluencerId.filter((id) => id !== influencerId) }),

                clearRejectedInfluencerId: () => set({ RejectedInfluencerId: [] }),
                addApprovedInfluencer: (influencer: ReadyMadeInfluencerResponse) =>
                    set({ approvedInfluencers: [...get().approvedInfluencers, influencer] }),
                clearApprovedInfluencers: () => set({ approvedInfluencers: [] }),
            }),
            {
                name: "InfluencersStore",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);