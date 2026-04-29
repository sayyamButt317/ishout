'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import CustomButton from './button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  clearAuthTokenProvider,
  getAuthTokenProvider,
  getRoleProvider,
} from '@/src/provider/auth-provide';

const Header = () => {
  const router = useRouter();
  const token = getAuthTokenProvider();
  const role = getRoleProvider();
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardRoute = useMemo(() => {
    if (token && role === 'company') return '/client/choose-campaign';
    if (token && role === 'admin') return '/Admin/all-campaign';
    return '/auth/login';
  }, [token, role]);

  const DashboardRedirect = () => {
    router.replace(dashboardRoute);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Image
          src="/assets/iShout-gif-black-background.gif"
          alt="logo"
          width={60}
          height={60}
          className="w-16 sm:w-20 h-auto object-contain"
          priority
          unoptimized
        />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-md font-thin">
          <Link href="https://app.ishout.ae/#about-us" className="text-white hover:text-pink-400">
            About Us
          </Link>
          <Link href="https://app.ishout.ae/#how-it-works" className="text-white hover:text-pink-400">
            How It Works
          </Link>
          <Link href="https://app.ishout.ae/#case-studies" className="text-white hover:text-pink-400">
            Case Studies
          </Link>
          <Link href="/feedback" className="text-white hover:text-pink-400">
            Feedback
          </Link>
        </div>


        {/* Mobile Hamburger */}
        <div className="flex flex-row gap-2 pt-2 ">

            {!token ? (
              <>
                <CustomButton asChild className="w-fit  max-sm:w-fit bg-secondaryButton text-white sm:text-sm">
                  <Link href="/auth/login">Login</Link>
                </CustomButton>
                <CustomButton asChild className="w-fit  max-sm:w-fit bg-primaryButton text-white sm:text-sm">
                  <Link href="/auth/register">Register</Link>
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton onClick={DashboardRedirect} className="w-fit max-sm:w-fit bg-secondaryButton sm:text-sm">
                  Dashboard
                </CustomButton>
                <CustomButton asChild className="w-fit max-sm:w-fit bg-primaryButton sm:text-sm">
                  <Link href="/auth/login" onClick={() => clearAuthTokenProvider()}>
                    Sign Out
                  </Link>
                </CustomButton>
              </>
            )}
                    <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
          </div>
        
        {/* <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button> */}
        </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 bg-black/90 backdrop-blur rounded-xl p-4 flex flex-col gap-4">
          
          <Link href="https://app.ishout.ae/#about-us" onClick={() => setMenuOpen(false)} className="text-white">
            About Us
          </Link>
          <Link href="https://app.ishout.ae/#how-it-works" onClick={() => setMenuOpen(false)} className="text-white">
            How It Works
          </Link>
          <Link href="https://app.ishout.ae/#case-studies" onClick={() => setMenuOpen(false)} className="text-white">
            Case Studies
          </Link>
          <Link href="/feedback" onClick={() => setMenuOpen(false)} className="text-white">
            Feedback
          </Link>

          
        </div>
      )}
    </nav>
  );
};

export default Header;