'use client';

import { useState } from 'react';
const CAPTION_PREVIEW_WORDS = 15;
const BLOCKQUOTE_CLASS =
  'max-w-full border-l-2 border-primaryButton/70 pl-3 text-xs italic leading-relaxed text-muted-foreground wrap-anywhere whitespace-pre-wrap sm:text-sm dark:text-white/45';

const TOGGLE_CLASS =
  'not-italic font-semibold text-primaryButton hover:text-primaryHover';

type CaptionBlockProps = {
  caption: string;
  previewWords?: number;
  className?: string;
};

export default function CaptionBlock({
  caption,
  previewWords = CAPTION_PREVIEW_WORDS,
  className,
}: CaptionBlockProps) {
  const blockquoteClass = className
    ? `${BLOCKQUOTE_CLASS} ${className}`
    : BLOCKQUOTE_CLASS;
  const [expanded, setExpanded] = useState(false);
  const trimmed = caption?.trim() ?? '';
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const isTruncated = words.length > previewWords;

  if (!trimmed) return null;

  if (!isTruncated) {
    return <blockquote className={blockquoteClass}>{trimmed}</blockquote>;
  }

  if (expanded) {
    return (
      <blockquote className={blockquoteClass}>
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
    <blockquote className={blockquoteClass}>
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
