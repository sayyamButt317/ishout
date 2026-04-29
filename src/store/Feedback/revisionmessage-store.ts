import { SendRevisionPayload } from "@/src/types/Admin-Type/Feedback/revision-type"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

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


    setAll: (data: Partial<RevisionMessageStoreProps>) => void

    addTimestamp: (timestamp: Timestamp) => void
    updateTimestamp: (index: number, value: Timestamp) => void
    removeTimestamp: (index: number) => void
    clearTimestamps: () => void


    buildPayload: () => SendRevisionPayload | null

    reset: () => void
}

const useRevisionMessageStore = create<RevisionMessageStoreProps>()(
    devtools(
        persist(
            (set, get) => ({

                negotiation_id: "",
                thread_id: "",
                message_id: "",
                contentType: "VIDEO",
                contentUrl: "",
                current_version: 0,
                status: "UNDER_REVIEW",
                timestamps: [],
                setNegotiationId: (value) => set({ negotiation_id: value }),
                setThreadId: (value) => set({ thread_id: value }),
                setMessageId: (value) => set({ message_id: value }),
                setContentType: (value) => set({ contentType: value }),
                setContentURL: (value) => set({ contentUrl: value }),
                setCurrentVersion: (value) => set({ current_version: value }),
                setStatus: (value) => set({ status: value }),


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
                buildPayload: () => {
                    const state = get()

                    if (!state.timestamps.length) {
                        console.error("No timestamps added")
                        return null
                    }

                    const hasInvalid = state.timestamps.some(
                        (t) =>
                            !t.feedback?.trim() ||
                            typeof t.time !== "number" ||
                            t.time < 0
                    )

                    if (hasInvalid) {
                        console.error("Invalid timestamp data")
                        return null
                    }

                    if (!state.negotiation_id || !state.thread_id) {
                        console.error("Missing required IDs")
                        return null
                    }

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
            }),
            {
                name: "revision-message-store",
            }
        )
    )
)

export default useRevisionMessageStore