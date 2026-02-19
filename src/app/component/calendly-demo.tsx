'use client';

import React from 'react';

interface CalendlyDemoProps {
  children: React.ReactNode;
  url?: string;
}

export default function CalendlyDemo({
  children,
  url = 'https://calendly.com/info-hbap/30min?month=2026-03',
}: CalendlyDemoProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
      {children}
    </a>
  );
}
