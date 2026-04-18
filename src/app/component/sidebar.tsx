'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ChevronDown, LogOut, Menu } from 'lucide-react';
import { useCallback, useState } from 'react';
import LogoutDialogue from './logoutdialogue';
import Image from 'next/image';
import type { SidebarGroupLink } from '@/src/constant/sidebaritems';

export interface SidebarProps {
  links: SidebarGroupLink[];
}

function NavGroup({
  group,
  onLinkClick,
}: {
  group: SidebarGroupLink;
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  const hasActive = group.children.some(
    (c) => c.route && (pathname === c.route || pathname.startsWith(c.route)),
  );

  const [open, setOpen] = useState(hasActive);

  const isChildActive = useCallback(
    (route: string) =>
      !!route && (pathname === route || (route !== '/auth/login' && pathname.startsWith(route))),
    [pathname],
  );

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-white/55 transition-all duration-200 hover:bg-white/4 hover:text-white"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
              group.iconBg,
            )}
          >
            <span className={group.iconColor}>{group.icon}</span>
          </div>
          <span className="text-sm font-bold tracking-tight">{group.label}</span>
        </div>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 opacity-40 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          open ? 'mt-0.5 max-h-96' : 'max-h-0',
        )}
      >
        <div className="space-y-0.5 pl-3">
          {group.children
            .filter((child) => !!child?.route)
            .map((child) => {
              const active = isChildActive(child.route);
              return (
                <Link
                  key={child.route}
                  href={child.route}
                  onClick={onLinkClick}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ease-out',
                    active
                      ? 'border border-white/10 bg-white/5 text-white shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-xl'
                      : 'border border-transparent text-slate-400 hover:bg-white/5 hover:text-white',
                  )}
                >
                  {active && (
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-transparent opacity-80 blur-xl" />
                  )}
                  <span className="text-sm font-medium tracking-wide">{child.label}</span>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function SidebarNav({
  groups,
  onLinkClick,
}: {
  groups: SidebarGroupLink[];
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
      {groups.map((group) => {
        const groupHasActive = group.children.some(
          (c) => c.route && (pathname === c.route || pathname.startsWith(c.route)),
        );
        return (
          <NavGroup
            key={`${group.label}-${groupHasActive}`}
            group={group}
            onLinkClick={onLinkClick}
          />
        );
      })}
    </nav>
  );
}

export default function Sidebar({ links }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden md:flex fixed top-6 left-6 h-[calc(100vh-3rem)] w-65 flex-col
        rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.4)] p-6"
      >
        <a
          href="https://ishout.ae"
          rel="noopener noreferrer"
          className="mb-8 flex cursor-pointer items-center justify-center transition-opacity hover:opacity-80"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl" />
            <Image
              src="/assets/iShout-gif-black-background.gif"
              alt="logo"
              width={50}
              height={50}
              className="relative z-10"
              unoptimized={true}
            />
          </div>
        </a>

        <SidebarNav groups={links} />

        <div className="cursor-pointer border-t border-white/10 pt-6">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-xl text-red-400 hover:bg-red-500/10"
            onClick={() => setIsLogout(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />

      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="fixed left-4 top-4 z-50 rounded-xl border border-white/10 bg-white/10 p-2 text-white backdrop-blur-xl"
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-65 border-r border-white/10 bg-slate-950 p-6"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <a
              href="https://ishout.ae"
              rel="noopener noreferrer"
              className="mb-6 flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src="/assets/iShout-gif-black-background.gif"
                alt="logo"
                width={36}
                height={36}
                unoptimized={true}
              />
              <h2 className="text-xl font-bold text-white">iShout</h2>
            </a>

            <SidebarNav groups={links} onLinkClick={() => setMobileOpen(false)} />

            <div className="border-t border-white/10 pt-6">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl text-red-400 hover:bg-red-500/10"
                onClick={() => {
                  setMobileOpen(false);
                  setIsLogout(true);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
