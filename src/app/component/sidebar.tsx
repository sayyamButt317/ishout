"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { useState, useMemo } from "react";
import LogoutDialogue from "./logoutdialogue";
import Image from "next/image";

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
          (link.route !== "/auth/login" && pathname.startsWith(link.route));

        return (
          <Link
            key={link.route}
            href={link.route}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              isSelected
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-white"
                : "text-slate-300 hover:bg-white/10 hover:text-white border border-transparent"
            )}
          >
            {link.icon}
            <span className="text-sm font-medium">{link.label}</span>

            {isSelected && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full" />
            )}
          </Link>
        );
      }),
    [links, pathname]
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[280px] h-4/4 p-6 bg-slate-900 border border-white/10 rounded-2xl">
        <div className="mb-4 flex items-center gap-2">
          <Image src="/assets/favicon.png" alt="logo" width={36} height={36} />
          <h2 className="text-xl font-bold text-white">iShout</h2>
        </div>
        <nav className="flex flex-col gap-2">{renderedLinks}</nav>
        <div className="mt-4 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full text-red-400 hover:bg-red-500/10"
            onClick={() => setIsLogout(true)}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            onCloseAutoFocus={(e) => e.preventDefault()}
            className="w-[280px] p-6 bg-slate-900"
          >
            <div className="mb-4 flex items-center gap-2">
              <Image src="/assets/favicon.png" alt="logo" width={36} height={36} />
              <h2 className="text-xl font-bold text-white">iShout</h2>
            </div>
            <nav className="flex flex-col gap-2">{renderedLinks}</nav>
            <div className="mt-auto pt-6 border-t border-white/10">
              <Button
                variant="ghost"
                className="w-full text-red-400 hover:bg-red-500/10"
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