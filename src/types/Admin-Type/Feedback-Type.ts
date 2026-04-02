export interface SelectedCardType {
    id: string;
    campaign_id?: string;
    title: string;
    campaign: string;
    thread_id?: string;
    brand_thread_id?: string;
    admin_approved?: string | null;
}

export type ContentFeedbackPanelProps = {
    activeFeedbackId: string;
    selectedContentFeedback: string;
    setSelectedContentFeedback: (value: string) => void;
    selectedPreviewMediaUrl: string | null;
    negotiationId: string;
    selectedCard: SelectedCardType;
    setFeedbackId: (
        negotiationId: string,
        contentUrl: string | null,
        feedbackId: string,
    ) => void;
};
