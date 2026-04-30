export type Status = "UNDER_REVIEW" | "NEED_REVISION" | "APPROVED"

export type RevisionStatus = "OPEN" | "RESOLVED"

export type MediaType = "VIDEO" | "IMAGE" | "REEL" | "POST" | "STORY"

export interface Timestamp {
    time: number
    feedback: string
}

export interface Revision {
    version?: number
    timestamps: Timestamp[]
    status?: RevisionStatus
}

export interface SendRevisionPayload {
    negotiation_id: string
    thread_id: string
    review_side?: 'admin' | 'brand'
    message_id?: string
    contentType: MediaType
    contentUrl?: string
    status?: Status
    revisions: Revision[]
    created_at?: string
    updated_at?: string
}