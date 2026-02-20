export interface NegotiationStatsResponse {
    _id: string;
    thread_id: string;
    conversation_mode: string;
    min_price: number;
    max_price: number;
    last_offered_price: number;
    intent: string;
    next_action: string;
    manual_negotiation: boolean;
    agent_paused: boolean;
}