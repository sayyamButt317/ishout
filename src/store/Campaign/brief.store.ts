import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface CampaignSBriefStoreProps {
    imageUrls: string[]

    setImageUrls: (urls: string[]) => void
    addImageUrls: (urls: string[]) => void
    removeImage: (url: string) => void
    clearImages: () => void
}

export const CampaignSBriefStore = create<CampaignSBriefStoreProps>()(
    devtools(
        persist(
            (set) => ({
                imageUrls: [],

                setImageUrls: (urls) =>
                    set({ imageUrls: urls }),

                addImageUrls: (urls) =>
                    set((state) => ({
                        imageUrls: [...state.imageUrls, ...urls],
                    })),

                removeImage: (url) =>
                    set((state) => ({
                        imageUrls: state.imageUrls.filter((img) => img !== url),
                    })),

                clearImages: () =>
                    set({ imageUrls: [] }),
            }),
            {
                name: "Brief-store",
            }
        )
    )
)