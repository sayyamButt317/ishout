'use client';

import { useRef, useEffect } from 'react';

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  items: string[];
  editable: boolean;
  onChange: (updated: string[]) => void;
  badge?: string;
}

function AutoRow({
  value,
  placeholder,
  onChange,
  onKeyDown,
  refCallback,
}: {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  refCallback: (el: HTMLTextAreaElement | null) => void;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={el => {
        ref.current = el;
        refCallback(el);
        if (el) { el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px`; }
      }}
      value={value}
      rows={1}
      placeholder={placeholder}
      onChange={e => {
        onChange(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      onKeyDown={onKeyDown}
      className="flex-1 min-w-0 w-full bg-transparent text-sm text-[#acaab1] leading-relaxed placeholder:text-[#acaab1]/20 focus:outline-none resize-none overflow-hidden"
    />
  );
}

export const Section = ({ title, icon, items, editable, onChange, badge }: SectionProps) => {
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const visibleCount = items.filter(i => i.trim()).length;

  const handleChange = (i: number, val: string) => {
    const updated = [...items];
    updated[i] = val;
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, i: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const updated = [...items];
      updated.splice(i + 1, 0, '');
      onChange(updated);
      setTimeout(() => textareaRefs.current[i + 1]?.focus(), 0);
    }
    if (e.key === 'Backspace' && items[i] === '' && items.length > 1) {
      e.preventDefault();
      onChange(items.filter((_, idx) => idx !== i));
      setTimeout(() => textareaRefs.current[Math.max(0, i - 1)]?.focus(), 0);
    }
  };

  const displayItems = editable
    ? (items.length === 0 ? [''] : items)
    : items.filter(i => i.trim());

  return (
    <div className="relative rounded-3xl border border-white/8 bg-white/3 backdrop-blur-xl">

      {/* Pink bar on outer left boundary */}
      <div className="absolute left-0 top-4 bottom-4 w-0.75 bg-[#ff4e7e]/70 rounded-full " />

      {/* Header — display only, no click */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="w-7 h-7 rounded-lg bg-[#ff4e7e]/10 flex items-center justify-center text-[#ff4e7e]">
              {icon}
            </span>
          )}
          <h3 className="text-sm font-bold text-[#f8f5fd] tracking-tight">{title}</h3>
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#ff4e7e]/10 border border-[#ff4e7e]/20 text-[#ff4e7e] text-[10px] font-black uppercase tracking-widest">
              {badge}
            </span>
          )}
        </div>
        <span className="text-[10px] text-[#acaab1]/30 tabular-nums">
          {visibleCount} item{visibleCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Body — always visible */}
      <div className="px-6 pb-5">
        <div className="rounded-2xl border border-white/8 bg-black/20 backdrop-blur-xl focus-within:border-[#ff4e7e]/25 transition-colors duration-200">
          <div className="pl-5 pr-4 py-4 space-y-2.5">

            {displayItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.75 w-1 h-1 rounded-full bg-[#ff4e7e]/60 shrink-0" />

                {editable ? (
                  <AutoRow
                    value={item}
                    placeholder={i === 0 ? 'Type a point…' : ''}
                    onChange={v => handleChange(i, v)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    refCallback={el => { textareaRefs.current[i] = el; }}
                  />
                ) : (
                  <span className="flex-1 text-sm text-[#acaab1] leading-relaxed">{item}</span>
                )}
              </div>
            ))}

            {editable && (
              <p className="text-[10px] text-[#acaab1]/20 pl-4 pt-1">
                ↵ Enter adds · Backspace on empty removes
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;