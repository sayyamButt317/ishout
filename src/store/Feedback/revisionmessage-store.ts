import { SendRevisionPayload } from "@/src/types/Admin-Type/Feedback/revision-type"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type MediaType = "VIDEO" | "IMAGE" | "REEL" | "POST" | "STORY"
export type Status = "UNDER_REVIEW" | "NEED_REVISION" | "APPROVED"

export interface Timestamp {
    time: number
    feedback: string
}
interface RevisionMessageStoreProps {
    negotiation_id: string
    thread_id: string
    message_id: string
    contentType: MediaType
    contentUrl: string
    current_version: number
    status: Status
    timestamps: Timestamp[]

    // setters
    setNegotiationId: (value: string) => void
    setThreadId: (value: string) => void
    setMessageId: (value: string) => void
    setContentType: (value: MediaType) => void
    setContentURL: (value: string) => void
    setCurrentVersion: (value: number) => void
    setStatus: (value: Status) => void

    // bulk setter
    setAll: (data: Partial<RevisionMessageStoreProps>) => void

    // timestamps
    addTimestamp: (timestamp: Timestamp) => void
    updateTimestamp: (index: number, value: Timestamp) => void
    removeTimestamp: (index: number) => void
    clearTimestamps: () => void

    // payload 
    buildPayload: () => SendRevisionPayload

    reset: () => void
}

const useRevisionMessageStore = create<RevisionMessageStoreProps>()(
    devtools((set, get) => ({
        negotiation_id: "",
        thread_id: "",
        message_id: "",
        contentType: "VIDEO",
        contentUrl: "",
        current_version: 0,
        status: "UNDER_REVIEW",
        timestamps: [],

        // setters
        setNegotiationId: (value) => set({ negotiation_id: value }),
        setThreadId: (value) => set({ thread_id: value }),
        setMessageId: (value) => set({ message_id: value }),
        setContentType: (value) => set({ contentType: value }),
        setContentURL: (value) => set({ contentUrl: value }),
        setCurrentVersion: (value) => set({ current_version: value }),
        setStatus: (value) => set({ status: value }),

        //bulk setter
        setAll: (data) => set(data),

        // timestamps
        addTimestamp: (timestamp) =>
            set((state) => ({
                timestamps: [...state.timestamps, timestamp],
            })),

        updateTimestamp: (index, value) =>
            set((state) => {
                const updated = [...state.timestamps]
                updated[index] = value
                return { timestamps: updated }
            }),

        removeTimestamp: (index) =>
            set((state) => ({
                timestamps: state.timestamps.filter((_, i) => i !== index),
            })),

        clearTimestamps: () => set({ timestamps: [] }),

        // BUILD FINAL
        buildPayload: () => {
            const state = get()
            return {
                negotiation_id: state.negotiation_id,
                thread_id: state.thread_id,
                message_id: state.message_id,
                contentType: state.contentType,
                contentUrl: state.contentUrl,
                current_version: state.current_version,
                status: state.status,
                revisions: [
                    {
                        version: state.current_version,
                        timestamps: state.timestamps,
                        status: "OPEN",
                    },
                ],
            }
        },

        reset: () =>
            set({
                negotiation_id: "",
                thread_id: "",
                message_id: "",
                contentType: "VIDEO",
                contentUrl: "",
                current_version: 0,
                status: "UNDER_REVIEW",
                timestamps: [],
            }),
    }))
)

export default useRevisionMessageStore