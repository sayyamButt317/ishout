import { NegotiationItem } from "../Content-type";

export type SelectedContentFeedbackCard = {
    item: NegotiationItem;
    title: string;
    campaign: string;
    briefId?: string;
};

export type ContentFeedbackModalProps = {
    selectedCard: SelectedContentFeedbackCard | null;
    onClose: () => void;
    asPage?: boolean;
};
