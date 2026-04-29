export interface AdminInfluencerMessageItem {
  _id: string;
  thread_id: string;
  username: string;
  sender: 'ADMIN' | 'USER' | 'AI';
  message: string;
  timestamp: string;
  negotiation_id?: string;
  content_id?: string | null;
}

export interface AdminInfluencerMessagesResponse {
  messages: AdminInfluencerMessageItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
