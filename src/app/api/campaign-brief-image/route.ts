import { readFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { PDF_PROXY_ALLOWED_IMAGE_HOSTS } from '@/src/constants/pdf-proxy-allowed-hosts';

const ASSETS = path.join(process.cwd(), 'public', 'assets');

function isAllowedImageUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false;
    return PDF_PROXY_ALLOWED_IMAGE_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

async function thankYouLogoPng(): Promise<Buffer | null> {
  try {
    return await readFile(path.join(ASSETS, 'iShout-gif-black-background.png'));
  } catch {
    /* optional */
  }
  try {
    const svg = await readFile(path.join(ASSETS, 'logo.svg'), 'utf8');
    const m = svg.match(/href="(data:image\/png;base64,[^"]+)"/);
    const b64 = m?.[1]?.split(',')[1];
    return b64 ? Buffer.from(b64, 'base64') : null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get('asset') === 'thank-you-logo') {
    const buf = await thankYouLogoPng();
    if (!buf) return NextResponse.json({ error: 'Logo unavailable' }, { status: 404 });
    return new NextResponse(new Uint8Array(buf), {
      headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
    });
  }

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
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 });
  }
}
