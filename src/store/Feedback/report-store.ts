import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ProfileProps {
    username: string;
    name: string;
    profile_image: string;
    biography: string;
    followers: number;
    following: number;
    media_count: number;
}

interface MediaProps {
    url: string;
    thumbnail: string;
    media_url: string;
    likes: number;
    comments: number;
    views: number | "N/A";
    interaction: number;
    caption: string;
    timestamp: string;
}

interface ReportProps {
    campaign_id: string;
    profile: ProfileProps | null;
    reel: MediaProps | null;
    isLoading: boolean;

    setcampaignIdForReport: (value: string) => void;
    setReport: (data: { profile: ProfileProps; reel: MediaProps }) => void;
    reset: () => void;
    setLoading: (val: boolean) => void;
}

const useReportStore = create<ReportProps>()(
    devtools(
        persist(
            (set) => ({

                campaign_id: "",
                profile: null,
                reel: null,
                isLoading: false,

                setcampaignIdForReport: (value) =>
                    set({ campaign_id: value }, false, "report/setCampaignId"),

                setReport: (data) =>
                    set(
                        {
                            profile: data.profile,
                            reel: data.reel,
                            isLoading: false,
                        },
                        false,
                        "report/setReport"
                    ),

                setLoading: (val) =>
                    set({ isLoading: val }, false, "report/setLoading"),

                reset: () =>
                    set(
                        {
                            campaign_id: "",
                            profile: null,
                            reel: null,
                            isLoading: false,
                        },
                        false,
                        "report/reset"
                    ),
            }),
            {
                name: "Report-store",
            }
        )
    )
);

export default useReportStore;