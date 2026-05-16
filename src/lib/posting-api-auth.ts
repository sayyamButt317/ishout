import type { NextRequest } from 'next/server';

/** Server-side auth for influencer posting BFF routes (cookie or service token). */
export function getPostingBackendAuthHeader(
  request: NextRequest,
): Record<string, string> {
  const token =
    request.cookies.get('access_token')?.value ??
    process.env.POSTING_API_TOKEN ??
    '';

  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export function getPostingBackendBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!base) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not configured');
  }
  return base.replace(/\/$/, '');
}
