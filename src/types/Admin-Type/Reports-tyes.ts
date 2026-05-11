export class ReportsTyes {}

export interface InfluencerDemographicsAsset {
  id: string;
  image_url: string;
  content_type: string;
  content_id: string;
}

export interface InfluencerDemographicsAssetsResponse {
  demographics: InfluencerDemographicsAsset[];
}
