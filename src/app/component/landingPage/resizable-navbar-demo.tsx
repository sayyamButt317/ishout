"use client";
import Link from 'next/link';
import { useMemo } from 'react';
import CustomButton from '../button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  clearAuthTokenProvider,
  getAuthTokenProvider,
  getRoleProvider,
} from '@/src/provider/auth-provide';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar";
import { useState } from "react";

export default function NavbarDemo() {
  const router = useRouter();
  const token = getAuthTokenProvider();
  const role = getRoleProvider();

  const dashboardRoute = useMemo(() => {
    if (token && role === 'company') return '/client/choose-campaign';
    if (token && role === 'admin') return '/Admin/all-campaign';
    return '/auth/login';
  }, [token, role]);

  const DashboardRedirect = () => {
    router.replace(dashboardRoute);
  };
  const navItems = [
    {
      name: "About Us",
      link: "https://app.ishout.ae/#about-us",
    },
    {
      name: "How it Works",
      link: "https://app.ishout.ae/#how-it-works",
    },
    {
      name: "Case Studies",
      link: "https://app.ishout.ae/#case-studies",
    },
    {
      name: "Feedback",
      link: "https://app.ishout.ae/feedback",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full  backdrop-blur px-4 sm:px-6 py-4 sticky top-0">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}