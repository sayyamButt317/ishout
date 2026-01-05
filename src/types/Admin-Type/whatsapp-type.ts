export interface WhatsAppUserSessionResponse {
    _id: string;
    name: string;
    thread_id: string;
    ready_for_campaign: boolean;
    acknowledged: boolean;
    conversation_round: number;
    last_active: string;
    last_message: Date;
    campaign_created: boolean;
    status?: string;
}