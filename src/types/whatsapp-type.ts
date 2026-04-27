export interface WhatsAppSession {
    thread_id: string;
    last_message?: string;
    last_active: string;
    human_takeover?: boolean;
}
