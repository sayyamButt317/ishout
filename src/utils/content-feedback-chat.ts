import { TimedFeedbackPayloadV1, TimelineMarkerData } from "../types/Admin-Type/timeline-type";

export const TIMED_FEEDBACK_PREFIX_V1 = 'CFB:';
export function serializeTimedFeedbackMessage(payload: TimedFeedbackPayloadV1): string {
  const body: Record<string, unknown> = {
    timestamp: payload.t,
    message: payload.m,
  };
  if (payload.s) body.snapshot = payload.s;
  if (payload.u) body.contentUrl = payload.u;
  return `${TIMED_FEEDBACK_PREFIX_V1}${JSON.stringify(body)}`;
}

export function parseTimedFeedbackMessage(raw: string): TimedFeedbackPayloadV1 | null {
  if (typeof raw !== 'string' || !raw.startsWith(TIMED_FEEDBACK_PREFIX_V1)) {
    return null;
  }
  try {
    const o = JSON.parse(raw.slice(TIMED_FEEDBACK_PREFIX_V1.length)) as Record<
      string,
      unknown
    >;
    if (typeof o.t !== 'number' || typeof o.m !== 'string') return null;
    return {
      t: o.t,
      m: o.m,
      s: typeof o.s === 'string' ? o.s : undefined,
      u: typeof o.u === 'string' ? o.u : undefined,
    };
  } catch {
    return null;
  }
}

export function captureVideoFrameDataUrl(
  video: HTMLVideoElement,
  maxWidth = 480,
  quality = 0.72,
): string | null {
  try {
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return null;
    const scale = Math.min(1, maxWidth / vw);
    const w = Math.round(vw * scale);
    const h = Math.round(vh * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', quality);
  } catch {
    return null;
  }
}

export function extractTimelineMarkersFromMessages(
  messages: Array<{ _id: string; message: unknown }>,
  contentUrlFilter?: string | null,
): TimelineMarkerData[] {
  const out: TimelineMarkerData[] = [];
  for (const msg of messages) {
    const raw = msg.message;
    if (typeof raw !== 'string') continue;
    const parsed = parseTimedFeedbackMessage(raw);
    if (!parsed) continue;
    if (
      contentUrlFilter &&
      parsed.u &&
      parsed.u !== contentUrlFilter
    ) {
      continue;
    }
    out.push({
      id: msg._id,
      timestamp: parsed.t,
      text: parsed.m,
      snapshot: parsed.s,
      contentUrl: parsed.u,
    });
  }
  return out;
}
