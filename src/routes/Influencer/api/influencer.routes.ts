import { InfluencerPostingDetailsRequest } from "@/src/types/Posting/posting-type";
import axios from "axios";
import { INFLUENCER_ENDPOINT } from "./endpoint";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const ExtractContentRevisionforInfluencer = async (
    negotiation_id: string,
    message_id?: string,
) => {
    const response = await api.get(
        INFLUENCER_ENDPOINT.CONTENTDETAILSFORINFLUENCER(negotiation_id),
        {
            params: {
                message_id: message_id,
            },
        },
    );

    return response.data;
};


export const InfluencerPostingDetailsApi = async (
    payload: InfluencerPostingDetailsRequest
) => {
    const response = await api.post(
        INFLUENCER_ENDPOINT.INFLUENCER_POSTING_DETAILS,
        payload
    );

    return response.data;
};