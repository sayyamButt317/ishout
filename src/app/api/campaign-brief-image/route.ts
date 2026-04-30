import { NextRequest, NextResponse } from 'next/server';

/** Hostnames allowed for brief PDF image proxy (avoid open SSRF). */
const ALLOWED_IMAGE_HOSTS = new Set([
  'ishout.s3.us-east-2.amazonaws.com',
  'ishout.s3.amazonaws.com',
]);

function isAllowedImageUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false;
    return ALLOWED_IMAGE_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

/**
 * Proxies campaign product images for client-side PDF generation.
 * Browser fetch() to S3 is blocked by CORS; server fetch has no such limit.
 */
export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('url');
  if (!raw?.trim()) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  const decoded = decodeURIComponent(raw.trim());
  if (!isAllowedImageUrl(decoded)) {
    return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
  }

  try {
    const upstream = await fetch(decoded, {
      next: { revalidate: 3600 },
      headers: { Accept: 'image/*' },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: 'Upstream fetch failed' },
        { status: upstream.status === 404 ? 404 : 502 },
      );
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'Not an image' }, { status: 415 });
    }

    const buf = await upstream.arrayBuffer();
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 });
  }
}
