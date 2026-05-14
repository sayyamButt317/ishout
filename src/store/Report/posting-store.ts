import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


interface PostingProps {
    influencer_id: string;
    influencer_name: string;
    influencer_profile_image: string;
    date: string;
    time: string;
    caption: string;
    hashtags: string[];
    tagpartners: string[];
    url: string;
    contentType: string;
    postingDate: Date;

    setDateForPosting: (value: string) => void;
    setTimeForPosting: (value: string) => void;
    setCaptionForPosting: (value: string) => void;
    setHashtagsForPosting: (value: string[]) => void;
    setTagpartnersForPosting: (value: string[]) => void;
    setUrlForPosting: (value: string) => void;
    setContentTypeForPosting: (value: string) => void;
    setPostingDateForPosting: (value: Date) => void;
    reset: () => void;
}

const usePostingStore = create<PostingProps>()(
    devtools(
        persist(
            (set) => ({
                influencer_id: "",
                influencer_name: "",
                influencer_profile_image: "",
                date: "",
                time: "",
                caption: "",
                hashtags: [],
                tagpartners: [],
                url: "",
                contentType: "",
                postingDate: new Date(),

                setDateForPosting: (value) => set({ date: value }),
                setTimeForPosting: (value) => set({ time: value }),
                setCaptionForPosting: (value) => set({ caption: value }),
                setHashtagsForPosting: (value) => set({ hashtags: value }),
                setTagpartnersForPosting: (value) => set({ tagpartners: value }),
                setUrlForPosting: (value) => set({ url: value }),
                setContentTypeForPosting: (value) => set({ contentType: value }),
                setPostingDateForPosting: (value) => set({ postingDate: value }),
                reset: () => set({ date: "", postingDate: new Date(), time: "", caption: "", hashtags: [], tagpartners: [], url: "", contentType: "" }),
            }),
            {
                name: "Posting-store",
            }
        )
    ));

export default usePostingStore;