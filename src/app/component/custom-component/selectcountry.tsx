import { ComponentType, useState } from "react";
import { createPortal } from "react-dom";

type CountryOption = { value?: string; label: string };
type FlagIconComponent = ComponentType<{ country: string; title: string; className?: string }>;

export function MobileCountrySelect({
  value,
  onChange,
  options,
  iconComponent: FlagIcon,
  disabled,
}: {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  iconComponent: FlagIconComponent;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <>
      <button
        type="button"
        onClick={() => { if (!disabled) setOpen(true); }}
        className={`flex items-center gap-1 rounded px-1 py-0.5 transition-colors ${
          disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10 cursor-pointer'
        }`}
      >
        {value && <FlagIcon country={value} title={selectedLabel} />}
        <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && !disabled && typeof document !== 'undefined' && createPortal(
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: '15%',
              bottom: 80,
              left: 40,
              right: 40,
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '16px',
              background: 'rgb(23,23,23)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>Select Country</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <ul style={{ flex: 1, overflowY: 'auto', margin: 0, padding: 0, listStyle: 'none' }}>
              {options.filter((o) => o.value).map((o) => (
                <li key={o.value}>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 16px',
                      fontSize: '14px',
                      background: o.value === value ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: o.value === value ? 'white' : 'rgb(212,212,212)',
                      fontWeight: o.value === value ? 600 : 400,
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onClick={() => { onChange(o.value); setOpen(false); }}
                  >
                    <FlagIcon country={o.value!} title={o.label} />
                    <span>{o.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
