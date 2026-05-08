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
    tags: string[];
    tagpartners: string[];
    url: string;
    contentType: string;

    setDateForPosting: (value: string) => void;
    setTimeForPosting: (value: string) => void;
    setCaptionForPosting: (value: string) => void;
    setHashtagsForPosting: (value: string[]) => void;
    setTagpartnersForPosting: (value: string[]) => void;
    setTagsForPosting: (value: string[]) => void;
    setUrlForPosting: (value: string) => void;
    setContentTypeForPosting: (value: string) => void;
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
                tags: [],
                tagpartners: [],
                url: "",
                contentType: "",

                setDateForPosting: (value) => set({ date: value }),
                setTimeForPosting: (value) => set({ time: value }),
                setCaptionForPosting: (value) => set({ caption: value }),
                setHashtagsForPosting: (value) => set({ hashtags: value }),
                setTagsForPosting: (value) => set({ tags: value }),
                setTagpartnersForPosting: (value) => set({ tagpartners: value }),
                setUrlForPosting: (value) => set({ url: value }),
                setContentTypeForPosting: (value) => set({ contentType: value }),
                reset: () => set({ date: "", time: "", caption: "", hashtags: [], tags: [], tagpartners: [], url: "", contentType: "" }),
            }),
            {
                name: "Posting-store",
            }
        )
    ));

export default usePostingStore;