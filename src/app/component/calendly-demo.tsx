'use client';

import React from 'react';

interface CalendlyDemoProps {
  children: React.ReactNode;
  url?: string;
}

export default function CalendlyDemo({
  children,
  url = 'https://calendly.com/info-harb/30-minutes-demo-with-ishout',
}: CalendlyDemoProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
      {children}
    </a>
  );
}
