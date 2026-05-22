
export interface PostingDetail {
  _id: string;
  campaign_id: string;
  campaign_name: string;
  company_name?: string;
  logo_url: string;
  posting_date: string;
  posting_time: string;
  caption: string;
  hashtag: string[] | string;
  tag_users: string[];
  created_at: string;
  updated_at: string;
}

export interface CompanyPostingDetailsApiResponse {
  success: boolean;
  posting_details: PostingDetail | PostingDetail[] | null;
}

export interface CompanyPostingDetailsListData {
  success: boolean;
  posting_details: PostingDetail[];
}

/** DELETE /admin/posting/delete-details/{id} — query: posting_id */
export interface DeletePostingDetailResponse {
  success: boolean;
  message: string;
  id: string;
}

export interface AdminPostingDetailsListResponse {
  success: boolean;
  count: number;
  posting_details: PostingDetail[];
}
