'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LogOut, Menu, ChevronDown } from 'lucide-react';
import { useState, useCallback } from 'react';
import LogoutDialogue from './logoutdialogue';
import Image from 'next/image';
import { SidebarGroupLink } from '@/src/constant/sidebaritems'; // ← adjust if path differs

export interface SidebarProps {
  links: SidebarGroupLink[];
}

// ─── Collapsible group ────────────────────────────────────────────────────────

function NavGroup({
  group,
  onLinkClick,
}: {
  group: SidebarGroupLink;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  // auto-open if a child is currently active
  const hasActive = group.children.some(
    (c) => c.route && (pathname === c.route || pathname.startsWith(c.route)),
  );

  const [open, setOpen] = useState(hasActive || true);

  const isActive = useCallback(
    (route: string) =>
      !!route && (pathname === route || pathname.startsWith(route)),
    [pathname],
  );

  return (
    <div className="mb-3">
      {/* Group header button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl
          text-white/55 hover:text-white hover:bg-white/0.04
          transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${group.iconBg}`}
          >
            <span className={group.iconColor}>{group.icon}</span>
          </div>
          <span className="text-sm font-bold tracking-tight">{group.label}</span>
        </div>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 opacity-40 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Sub-links */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          open ? 'max-h-96 mt-0.5' : 'max-h-0',
        )}
      >
        <div className="pl-3 space-y-0.5">
          {group.children
            .filter((child) => !!child?.route)
            .map((child) => {
              const active = isActive(child.route);
              return (
                <Link
                  key={child.route}
                  href={child.route}
                  onClick={onLinkClick}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-full text-sm transition-all duration-200',
                    active
                      ? 'bg-primaryButton/10 text-primarytext font-semibold border border-primaryButton/15 shadow-[0_0_10px_rgba(255,78,126,0.10)]'
                      : 'text-white/40 hover:text-white hover:bg-white/0.04',
                  )}
                >
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full shrink-0 transition-colors',
                      active ? 'bg-primaryButton' : 'bg-white/20',
                    )}
                  />
                  {child.label}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar inner content (shared by desktop + mobile) ───────────────────────

function SidebarContent({
  links,
  onLogout,
  onLinkClick,
}: {
  links: SidebarGroupLink[];
  onLogout: () => void;
  onLinkClick?: () => void;
}) {
  return (
    <div className="flex flex-col h-full">

      {/* ── Brand logo ── */}
      <div className="flex justify-center mb-8 mt-2 px-4">
        <a
          href="https://ishout.ae"
          rel="noopener noreferrer"
          onClick={onLinkClick}
          className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primaryButton/20 blur-xl rounded-full scale-110" />
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-primaryButton/20 shadow-lg">
              <Image
                src="/assets/iShout-gif-black-background.gif"
                alt="iShout"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </a>
      </div>

      {/* ── Nav groups ── */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-1">
        {links.map((group) => (
          <NavGroup
            key={group.label}
            group={group}
            onLinkClick={onLinkClick}
          />
        ))}
      </nav>

      {/* ── Logout ── */}
      <div className="px-4 pt-4 mt-2 border-t border-white/0.05">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
            text-sm font-semibold text-red-400/70 hover:text-red-400
            hover:bg-red-500/0.08 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Sidebar({ links }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogout, setIsLogout]     = useState(false);

  return (
    <>
      {/* ── DESKTOP ── */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col z-50 border-r border-white/0.05 py-6"
        style={{
          background:
            'radial-gradient(circle at 100% 50%, rgba(255,78,126,0.06) 0%, transparent 65%), #0e0e13',
        }}
      >
        <SidebarContent
          links={links}
          onLogout={() => setIsLogout(true)}
        />
      </aside>

      {/* ── MOBILE ── */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center
                rounded-xl bg-black/70 backdrop-blur-xl border border-white/0.08
                text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 p-0 border-r border-white/0.05"
            style={{ background: '#0e0e13' }}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="h-full py-6">
              <SidebarContent
                links={links}
                onLogout={() => { setMobileOpen(false); setIsLogout(true); }}
                onLinkClick={() => setMobileOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />
    </>
  );
}