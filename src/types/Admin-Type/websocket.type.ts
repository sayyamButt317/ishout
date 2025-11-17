export type InstagramWebhookMessage = {
    message?: {
        mid?: string;
        text?: string;
        attachments?: Array<{
            type: string;
            payload: { url: string };
        }>;
    };
    sender: { id: string; username?: string };
    timestamp: number;
};

export type Attachment = {
    type: "image" | "video" | "audio" | "file";
    payload: { url: string };
    url?: string;
};
export type InstagramWebhookEntry = {
    messaging?: InstagramWebhookMessage[];
};

export type InstagramWebhookData = {
    object?: string;
    entry?: InstagramWebhookEntry[];
    type?: string;
    from_username?: string;
    text?: string;
};