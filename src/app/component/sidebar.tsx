"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import CustomButton from "./button";
import LogoutDialogue from "./logoutdialogue";
import Image from "next/image";

export interface SidebarLink {
  label: string;
  route: string;
  icon?: React.ReactNode;
}

export interface SidebarProps {
  links: SidebarLink[];
  onLogout?: () => void;
}

export default function Sidebar({ links }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);

  const handleClick = useCallback(
    (route: string) => {
      if (pathname !== route) {
        router.push(route);
      }
    },
    [pathname, router]
  );

  const renderLink = useCallback(
    (link: SidebarLink) => {
      const isSelected =
        link.route === pathname ||
        (link.route !== "/auth/login" && pathname.includes(link.route));

      return (
        <button
          key={link.route}
          onClick={() => handleClick(link.route)}
          className={cn(
            "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out outline-none cursor-pointer",
            isSelected
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20 border border-transparent"
          )}
          aria-current={isSelected ? "page" : undefined}
        >
          <div className="flex-shrink-0">{link.icon}</div>
          <span className="font-medium text-sm">{link.label}</span>

          {isSelected && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full shadow-lg" />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </button>
      );
    },
    [pathname, handleClick]
  );

  // Memoize rendered links to prevent recreation on every render
  const renderedLinks = useMemo(
    () => links.map(renderLink),
    [links, renderLink]
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-[280px] p-6 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}

        <div className="mb-2 flex flex-row items-start gap-1">
          <Image src="/assets/favicon.png" alt="logo" width={40} height={40} />
          <h2 className="text-2xl font-bold text-slate-100 mt-1">iShout</h2>
          <span className="text-primarytext font-extrabold text-2xl mt-1">
            .
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">{renderedLinks}</nav>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <CustomButton
            onClick={() => setIsLogout(true)}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-primaryButton hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/30 border border-transparent transition-all duration-300 ease-out w-full"
          >
            <LogOut className="w-5 h-5" /> Logout
          </CustomButton>
        </div>
      </aside>

      <LogoutDialogue open={isLogout} onOpenChange={setIsLogout} />

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col w-[280px] p-6 bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-zinc-900/95 backdrop-blur-xl border-white/10"
          >
            {/* Mobile Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-sm opacity-75" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold shadow-lg">
                    iS
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">iShout</h2>
                  <p className="text-slate-400 text-xs">Influencer Platform</p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-2">{renderedLinks}</nav>

            {/* Mobile Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <CustomButton
                onClick={() => setIsLogout(true)}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/30 border border-transparent transition-all duration-300 ease-out w-full"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </CustomButton>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
