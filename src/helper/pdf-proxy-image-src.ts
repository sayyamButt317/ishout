import { PDF_PROXY_ALLOWED_IMAGE_HOSTS } from '@/src/constants/pdf-proxy-allowed-hosts';
export function pdfProxyImageSrc(remoteUrl: string | undefined | null): string | undefined {
  if (!remoteUrl?.trim()) return undefined;
  const trimmed = remoteUrl.trim();
  if (!/^https?:\/\//i.test(trimmed)) return trimmed;
  try {
    const { hostname } = new URL(trimmed);
    if (!PDF_PROXY_ALLOWED_IMAGE_HOSTS.has(hostname)) return trimmed;
    const path = `/api/campaign-brief-image?url=${encodeURIComponent(trimmed)}`;
    if (typeof window !== 'undefined' && window.location?.origin) {
      return `${window.location.origin}${path}`;
    }
    return path;
  } catch {
    return trimmed;
  }
}
