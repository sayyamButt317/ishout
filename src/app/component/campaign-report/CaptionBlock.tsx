'use client';

import { useState } from 'react';
const CAPTION_PREVIEW_WORDS = 15;
const BLOCKQUOTE_CLASS =
  'border-l-2 border-primaryButton/70 pl-3 text-xs italic leading-relaxed text-muted-foreground sm:text-sm dark:text-white/45';

const TOGGLE_CLASS =
  'not-italic font-semibold text-primaryButton hover:text-primaryHover';

type CaptionBlockProps = {
  caption: string;
  previewWords?: number;
};

export default function CaptionBlock({
  caption,
  previewWords = CAPTION_PREVIEW_WORDS,
}: CaptionBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const trimmed = caption?.trim() ?? '';
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const isTruncated = words.length > previewWords;

  if (!trimmed) return null;

  if (!isTruncated) {
    return <blockquote className={BLOCKQUOTE_CLASS}>{trimmed}</blockquote>;
  }

  if (expanded) {
    return (
      <blockquote className={BLOCKQUOTE_CLASS}>
        {trimmed}{' '}
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className={TOGGLE_CLASS}
          aria-label="Show less caption"
        >
          Show less
        </button>
      </blockquote>
    );
  }

  const preview = words.slice(0, previewWords).join(' ');

  return (
    <blockquote className={BLOCKQUOTE_CLASS}>
      {preview}{' '}
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className={TOGGLE_CLASS}
        aria-label="Show full caption"
      >
        ...
      </button>
    </blockquote>
  );
}
