import { ReadyMadeInfluencerResponse } from "../readymadeinfluencers-type";
import { UpdateInfluencerStatusRequestProps } from "./Campaign.type";

export interface InfluencerCardProps {
    influencer: ReadyMadeInfluencerResponse;
    adminStatus?: "pending" | "approved" | "rejected";

    onAccept?: (
        payload: UpdateInfluencerStatusRequestProps & {
            minAmount?: number;
            maxAmount?: number;
        }
    ) => Promise<void> | void;
    onReject?: (
        payload: UpdateInfluencerStatusRequestProps
    ) => Promise<void> | void;

    showAccept?: boolean;
    showReject?: boolean;
    showDelete?: boolean;
}