export interface CompanyAdminMessageItem {
  _id: string;
  thread_id: string;
  username: string;
  sender: 'ADMIN' | 'USER' | 'AI';
  message: string;
  timestamp: string;
  negotiation_id?: string;
  content_id?: string | null;
  video_url?: string | null;
  video_approve_admin?: string | null;
  video_approve_brand?: string | null;
}

export interface CompanyAdminMessagesResponse {
  messages: CompanyAdminMessageItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
