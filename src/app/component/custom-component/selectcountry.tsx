'use client';

import { ComponentType, useState } from 'react';
import { Input } from '@/components/ui/input';

type CountryOption = { value?: string; label: string };
type FlagIconComponent = ComponentType<{
  country: string;
  title: string;
  className?: string;
}>;

const defaultSearchInputClassName =
  'h-10 border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-[#ff4e7e] focus:ring-[#ff4e7e]/30';

export function MobileCountrySelect({
  value,
  onChange,
  options,
  iconComponent: FlagIcon,
  disabled,
  searchInputClassName = defaultSearchInputClassName,
}: {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  iconComponent: FlagIconComponent;
  disabled?: boolean;
  /** Focus ring on search field — override to match page accent (e.g. register uses primarytext). */
  searchInputClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';
  const filteredOptions = options.filter((o) => {
    if (!o.value) return false;
    if (!searchTerm.trim()) return true;
    return o.label.toLowerCase().includes(searchTerm.toLowerCase().trim());
  });

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setSearchTerm('');
          setOpen(true);
        }}
        className={`flex items-center gap-1 rounded px-1 py-0.5 transition-colors ${
          disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10 cursor-pointer'
        }`}
      >
        {value && <FlagIcon country={value} title={selectedLabel} />}
        <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && !disabled && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => {
              setSearchTerm('');
              setOpen(false);
            }}
          />
          <div className="fixed inset-x-6 top-1/4 bottom-[15%] z-50 flex flex-col rounded-2xl border border-white/10 bg-[#0d0d1e] shadow-2xl overflow-hidden">
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-sm font-semibold text-white">Select Country</span>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setOpen(false);
                }}
                className="text-base leading-none text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="border-b border-white/10 px-4 py-3">
              <Input
                type="text"
                placeholder="Search country"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={searchInputClassName}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setSearchTerm('');
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/10 ${
                    o.value === value
                      ? 'bg-white/10 font-semibold text-white'
                      : 'text-white/80'
                  }`}
                >
                  <FlagIcon country={o.value!} title={o.label} />
                  <span>{o.label}</span>
                </button>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-white/60">
                  No countries found.
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
