export interface NegotiationAnalysis {
    intent?: string | null;
    pricing_mentioned?: boolean;
    budget_amount?: number | null;
    currency?: string | null;
    deliverables_mentioned?: boolean;
    deliverables?: string | null;
    timeline_mentioned?: boolean;
    timeline?: string | null;
    platforms_mentioned?: boolean;
    platforms?: string | null;
    usage_rights_mentioned?: boolean;
    exclusivity_mentioned?: boolean;
    missing_required_details?: string[];
    next_action?: string | null;
}

export interface NegotiationHistory {
    sender_type: "AI" | "USER";
    message: string;
}

export interface NegotiationStatsResponse {
    _id: string;
    thread_id: string;
    _updated_at?: string;
    agent_paused: boolean;
    conversation_mode: string;
    human_takeover: boolean;
    timestamp?: string;
    name?: string | null;
    sender_id?: string;
    user_message?: string | null;
    analysis?: NegotiationAnalysis | {};
    final_reply?: string | null;
    intent?: string | null;
    last_offered_price?: number | null;
    manual_negotiation: boolean;
    negotiation_round?: number;
    negotiation_status?: string | null;
    next_action?: string | null;
    user_offer?: number | null;
    history?: NegotiationHistory[];
    influencer_id?: string;
    max_price?: number | null;
    min_price?: number | null;
    negotiation_completed?: boolean;
    campaign_id?: string;
}