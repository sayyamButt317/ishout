'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { LogOut, Menu } from 'lucide-react';
import { useState, useMemo } from 'react';
import LogoutDialogue from './logoutdialogue';
import Image from 'next/image';

export interface SidebarLink {
  label: string;
  route: string;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  links: SidebarLink[];
}

export default function Sidebar({ links }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const renderedLinks = useMemo(
    () =>
      links.map((link) => {
        const isSelected =
          pathname === link.route ||
          (link.route !== '/auth/login' && pathname.startsWith(link.route));

        return (
          <Link
            key={link.route}
            href={link.route}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ease-out',
              isSelected
                ? 'bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent',
            )}
          >
            {isSelected && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent blur-xl opacity-80 -z-10" />
            )}

            {link.icon && (
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300',
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-white'
                    : 'bg-white/5 text-slate-400 group-hover:bg-white/10',
                )}
              >
                {link.icon}
              </div>
            )}

            <span className="text-sm font-medium tracking-wide">{link.label}</span>
          </Link>
        );
      }),
    [links, pathname],
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden md:flex fixed top-6 left-6 h-[calc(100vh-3rem)] w-[260px] flex-col 
        rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.4)] p-6"
      >
        {/* Logo */}
        <a
          href="https://ishout.ae"
          rel="noopener noreferrer"
          className="mb-8 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full" />
            <Image
              src="/assets/iShout-gif-black-background.gif"
              alt="logo"
              width={70}
              height={70}
              className="relative z-10"
              unoptimized={true}
            />
          </div>
        </a>

        {/* Links */}
        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
          {renderedLinks}
        </nav>

        {/* Logout */}
        <div className="pt-6 border-t border-white/10 cursor-pointer">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:bg-red-500/10 rounded-xl"
            onClick={() => setIsLogout(true)}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
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
            <a
              href="https://ishout.ae"
              //    target="_blank"
              rel="noopener noreferrer"
              className="mb-6 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
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

            <nav className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {renderedLinks}
            </nav>

            <div className="pt-6 border-t border-white/10">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-400 hover:bg-red-500/10 rounded-xl"
                onClick={() => {
                  setMobileOpen(false);
                  setIsLogout(true);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
