'use client';

import { useState, useMemo, type ComponentType } from 'react';
import { X, Search, Check } from 'lucide-react';

type CountryOption = { value?: string; label: string };
type FlagIcon      = ComponentType<{ country: string; title: string; className?: string }>;

function MobileCountrySelect({ value, onChange, options, iconComponent: Flag }: {
  value?: string; onChange: (v?: string) => void;
  options: CountryOption[]; iconComponent: FlagIcon;
}) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState('');

  const label = options.find(o => o.value === value)?.label ?? '';

  const filtered = useMemo(() =>
    options.filter(o => o.value && o.label.toLowerCase().includes(search.toLowerCase())),
    [options, search],
  );

  const handleClose = () => { setOpen(false); setSearch(''); };

  return (
    <>
      {/* Trigger — inline flag + chevron, no border */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-white/10 cursor-pointer transition-colors shrink-0"
      >
        {value
          ? <Flag country={value} title={label} className="w-5 h-3.5 rounded-[2px] object-cover" />
          : <span className="text-white/30 text-xs">🌐</span>
        }
        <svg className="w-3 h-3 text-white/40" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Bottom sheet — NO backdrop-blur so page doesn't blur */}
      {open && (
        <div className="fixed inset-0 z-200 flex items-end" onClick={handleClose}>
          {/* Plain dark overlay, no blur */}
          <div className="absolute inset-0 bg-black/60" />

          <div
            className="relative z-10 w-full flex flex-col rounded-t-3xl bg-[#131318] border-t border-x border-white/10 shadow-2xl"
            style={{ maxHeight: '70vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <span className="text-white font-bold text-base">Select Country</span>
              <button
                type="button"
                onClick={handleClose}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 pb-3 shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search country…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-primaryButton/40 transition-colors"
                />
              </div>
            </div>

            {/* List */}
            <ul className="flex-1 overflow-y-auto divide-y divide-white/5 pb-6">
              {filtered.length === 0 ? (
                <li className="px-5 py-10 text-center text-sm text-white/30">No countries found</li>
              ) : filtered.map(o => {
                const isSelected = o.value === value;
                return (
                  <li key={o.value}>
                    <button
                      type="button"
                      className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                        isSelected ? 'bg-primaryButton/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                      onClick={() => { onChange(o.value); handleClose(); }}
                    >
                      <Flag country={o.value!} title={o.label} className="w-6 h-4 rounded-sm object-cover shrink-0" />
                      <span className="flex-1 text-left">{o.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-primaryButton shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileCountrySelect;