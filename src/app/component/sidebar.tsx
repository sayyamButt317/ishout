'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronRight, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import LogoutDialogue from './logoutdialogue';
import Image from 'next/image';
import type { SidebarGroupLink } from '@/src/constant/sidebaritems';
import { ThemeToggle } from './ThemeToggle';

export interface SidebarProps {
  links: SidebarGroupLink[];
}

function NavGroups({
  groups,
  onNavigate,
}: {
  groups: SidebarGroupLink[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const initialGroups = groups.reduce(
    (acc, group) => {
      const hasActive = group.children.some(
        (child) =>
          child.route &&
          (pathname === child.route ||
            (child.route !== '/auth/login' && pathname.startsWith(child.route))),
      );

      acc[group.label] = hasActive;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const [openGroups, setOpenGroups] =
    useState<Record<string, boolean>>(initialGroups);

  const toggle = (label: string) =>
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto no-scrollbar pr-1">
      {groups.map((group) => {
        const isOpen = !!openGroups[group.label];

        const isGroupActive = group.children.some(
          (child) =>
            child.route &&
            (pathname === child.route ||
              (child.route !== '/auth/login' &&
                pathname.startsWith(child.route))),
        );

        return (
          <div key={group.label}>
            {/* Group Header */}
            <button
              type="button"
              onClick={() => toggle(group.label)}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-2xl border py-2 transition-all duration-300 ease-out',
                isGroupActive && !isOpen
                  ? 'border-foreground/10 bg-foreground/5 text-foreground'
                  : 'border-transparent text-slate-400 hover:bg-foreground/5 hover:text-foreground',
              )}
            >
              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition-all duration-300',
                  isGroupActive && !isOpen
                    ? 'bg-linear-to-br from-indigo-500/20 to-purple-500/20 text-foreground'
                    : cn(
                        'text-slate-400 group-hover:bg-foreground/10',
                        group.iconBg,
                      ),
                )}
              >
                <span className={group.iconColor}>{group.icon}</span>
              </div>

              <span className="flex-1 text-left text-md font-medium tracking-wide">
                {group.label}
              </span>

              <ChevronRight
                size={14}
                className={cn(
                  'shrink-0 opacity-40 transition-transform duration-200',
                  isOpen && 'rotate-90 opacity-70',
                )}
              />
            </button>

            {/* Children */}
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
              )}
            >
              <div className="flex flex-col gap-0.5 pb-1 pt-1">
                {group.children
                  .filter((child) => !!child.route)
                  .map((child) => {
                    const isActive =
                      pathname === child.route ||
                      (child.route !== '/auth/login' &&
                        pathname.startsWith(child.route));

                    return (
                      <Link
                        key={child.route}
                        href={child.route!}
                        onClick={onNavigate}
                        className={cn(
                          'flex items-center gap-2.5 rounded-xl py-2 pl-4 text-md transition-all duration-200',
                          isActive
                            ? 'bg-violet-500/10 text-violet-400'
                            : 'text-slate-500 hover:bg-foreground/5 hover:text-foreground',
                        )}
                      >
                        <span
                          className={cn(
                            'h-2 w-2 shrink-0 rounded-full',
                            isActive
                              ? 'bg-violet-400'
                              : 'bg-foreground/20',
                          )}
                        />

                        <span className="flex-1">{child.label}</span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ links }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const sidebarContent = (onNavigate?: () => void) => (
    <>
      {/* Logo */}
      <a
        href="https://app.ishout.ae"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 flex cursor-pointer items-center justify-center transition-opacity hover:opacity-80"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl" />

          <Image
            src="/assets/iShout-gif-black-background.gif"
            alt="logo"
            width={60}
            height={60}
            className="relative z-10"
            unoptimized={true}
          />
        </div>
      </a>

      {/* Navigation */}
      <NavGroups groups={links} onNavigate={onNavigate} />

      {/* Footer */}
      <div className="justify-center border-t border-foreground/10 pt-6">
        <ThemeToggle />

        <Button
          variant="ghost"
          className="w-fit cursor-pointer rounded-xl text-red-400 hover:bg-red-500/10"
          onClick={() => {
            onNavigate?.();
            setIsLogout(true);
          }}
        >
          <LogOut className="mr-12 h-6 w-6" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-6 top-6 hidden h-[calc(100vh-3rem)] w-70 flex-col rounded-3xl border border-foreground/10 bg-foreground/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:flex">
        {sidebarContent()}
      </aside>

      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="fixed left-4 top-4 z-50 rounded-xl border border-foreground/10 bg-foreground/10 p-2 text-foreground backdrop-blur-xl"
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-65 border-r border-foreground/10 bg-slate-950 p-6"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <SheetTitle className="sr-only">
              Navigation Menu
            </SheetTitle>

            {sidebarContent(() => setMobileOpen(false))}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}