const ROLE = 'influencer';
export class INFLUENCER_ENDPOINT {
    static CONTENTDETAILSFORINFLUENCER = (negotiation_id: string) => `/${ROLE}/feedback/${negotiation_id}`;
    static INFLUENCER_POSTING_DETAILS = `/${ROLE}/posting-details`;
}