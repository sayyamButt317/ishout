import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type AddInfluencerApiData = {
    campaign_id: string;
    influencer_id: string;
    username: string;
    platform: string;
    followers: number;
    engagementRate: number | null;
    country: string | null;
    bio: string;
    picture: string;
    created_at?: string;
    updated_at?: string;
};

export type AddInfluencerApiResponse = {
    success: boolean;
    data: AddInfluencerApiData;
};

type AddInfluencerStore = {
    success: boolean;
    data: AddInfluencerApiData | null;
    setAddInfluencerResponse: (response: AddInfluencerApiResponse) => void;
    reset: () => void;
};

const initialState: Pick<AddInfluencerStore, "success" | "data"> = {
    success: false,
    data: null,
};

const useAddInfluencerStore = create<AddInfluencerStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,

                setAddInfluencerResponse: (response) =>
                    set(
                        { success: response.success, data: response.data },
                        false,
                        "addInfluencer/setResponse",
                    ),

                reset: () =>
                    set({ ...initialState }, false, "addInfluencer/reset"),
            }),
            { name: "AddInfluencer-store" },
        ),
        { name: "AddInfluencerStore" },
    ),
);

export default useAddInfluencerStore;
