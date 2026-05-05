/** POST `/admin/store/Influencer-demographics` */
export interface StoreInfluencerDemographicsRequest {
  campaign_id: string;
  content_id: string;
  image_url: string;
  content_type: string;
}

export interface StoreInfluencerDemographicsResponse {
  message: string;
  _id: string;
}

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
    videoRef?: React.RefObject<HTMLVideoElement | null>;
    setFeedbackId?: (
        negotiationId: string,
        contentUrl: string | null,
        feedbackId: string,
    ) => void;
};
