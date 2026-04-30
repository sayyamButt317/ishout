'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ChevronRight, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import LogoutDialogue from './logoutdialogue';
import Image from 'next/image';
import { adminSidebarLinks } from '@/src/constant/sidebaritems';


function NavGroups({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Campaigns: true,
  });

  const toggle = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <nav className="flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar pr-1">
      {adminSidebarLinks.map((group) => {
        const isOpen = !!openGroups[group.label];
        const isGroupActive = group.children.some((c) => pathname === c.route);

        return (
          <div key={group.label}>

            {/* Group header */}
            <button
              onClick={() => toggle(group.label)}
              className={cn(
                'w-full group relative flex items-center gap-3 py-4 rounded-2xl transition-all duration-300 ease-out',
                isGroupActive && !isOpen
                  ? 'bg-white/5 border border-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent',
              )}
            >
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-2xl transition-all duration-300 shrink-0',
                  isGroupActive && !isOpen
                    ? 'bg-linear-to-br from-indigo-500/20 to-purple-500/20 text-white'
                    : cn('text-slate-400 group-hover:bg-white/10', group.iconBg),
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
                  'opacity-40 transition-transform duration-200 shrink-0',
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
              <div className="flex flex-col gap-0.5 pt-1 pb-1">
                {group.children.map((child) => {
                  const isActive = pathname === child.route;
                  return (
                    <Link
                      key={child.route}
                      href={child.route}
                      onClick={onNavigate}
                      className={cn(
                        'flex items-center gap-2.5 pl-2 pr-3 py-2 rounded-xl text-md transition-all duration-200',
                        isActive
                          ? 'text-violet-400 bg-violet-500/10'
                          : 'text-slate-500 hover:text-white hover:bg-white/5',
                      )}
                    >
                      <span
                        className={cn(
                          'w-2 h-2 rounded-full shrink-0',
                          isActive ? 'bg-violet-400' : 'bg-white/20',
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

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const sidebarContent = (onNavigate?: () => void) => (
    <>
      <a href="https://app.ishout.ae" target="_blank" rel="noopener noreferrer" className="mb-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
        {/* Logo */}

        {/* href="https://ishout.ae"
        rel="noopener noreferrer"
        
         /</>> */}

        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full" />
          <Image
            src="/assets/iShout-gif-black-background.gif"
            alt="logo"
            width={80}
            height={80}
            className="relative z-10"
            unoptimized={true}
          />
        </div>
      </a>

      <NavGroups onNavigate={onNavigate} />

      {/* Logout */}
      <div className="pt-6 border-t border-white/10 cursor-pointer ">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:bg-red-500/10 rounded-xl"
          onClick={() => {
            onNavigate?.();
            setIsLogout(true);
          }}
        >
          <LogOut className="w-6 h-6 mr-12" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex fixed top-6 left-6 h-[calc(100vh-3rem)] w-[280px] flex-col rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] p-6">
        {sidebarContent()}
      </aside>

      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />

      {/* Mobile */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="fixed top-4 left-4 z-50 text-white bg-white/10 backdrop-blur-xl p-2 rounded-xl border border-white/10"
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[260px] p-6 bg-slate-950 border-r border-white/10"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            {sidebarContent(() => setMobileOpen(false))}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}