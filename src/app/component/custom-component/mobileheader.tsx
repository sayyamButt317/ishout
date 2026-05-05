import React, { useMemo } from 'react';
import CustomButton from '../button';
import { Link } from 'lucide-react';
import {
  clearAuthTokenProvider,
  getAuthTokenProvider,
  getRoleProvider,
} from '@/src/provider/auth-provide';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MobileHeader = () => {
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
  return (
    <aside>
      <div className="w-2xl mx-auto flex items-center justify-between">
        <div className="flex flex-row gap-2">
          <Image
            src="/assets/iShout-gif-black-background.gif"
            alt="logo"
            width={60}
            height={60}
            className="w-20 h-auto object-contain"
            loading="eager"
            priority
            unoptimized={true}
          />
        </div>
        <div
          className="lg:flex items-center gap-8 sm:gap-2 text-md font-thin"
          style={{
            maxWidth: '900px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Link
            href="https://app.ishout.ae/about-us"
            className="text-white hover:text-pink-400 transition-colors text-md font-thin"
          >
            About Us
          </Link>
          <Link
            href="https://app.ishout.ae/#how-it-works"
            className="text-white hover:text-pink-400 transition-colors text-md font-thin"
          >
            How It Works
          </Link>
          <Link
            href="https://app.ishout.ae/#case-studies"
            className="text-white hover:text-pink-400 transition-colors text-md font-thin"
          >
            Case Studies
          </Link>
          <Link
            href="/feedback"
            className="text-white hover:text-pink-400 transition-colors text-md font-thin"
          >
            Feedback
          </Link>
        </div>

        {!token ? (
          <div className="flex flex-row gap-1 sm:gap-2 justify-end items-center shrink-0">
            <CustomButton
              asChild
              className="px-3 text-white sm:px-6 text-xs sm:text-sm bg-secondaryButton hover:bg-secondaryHover cursor-pointer whitespace-nowrap"
            >
              <Link href="/auth/login">Login</Link>
            </CustomButton>

            <CustomButton
              asChild
              className="px-3 text-white sm:px-6 text-xs sm:text-sm bg-primaryButton hover:bg-primaryHover cursor-pointer whitespace-nowrap"
            >
              <Link href="/auth/register">Register</Link>
            </CustomButton>
          </div>
        ) : (
          <div className="flex flex-row gap-1 sm:gap-2 justify-end items-center shrink-0">
            <CustomButton
              onClick={() => DashboardRedirect()}
              className="px-3 sm:px-6 text-xs sm:text-sm bg-secondaryButton hover:bg-secondaryHover cursor-pointer whitespace-nowrap"
            >
              Dashboard
            </CustomButton>
            <CustomButton
              asChild
              className="px-3 sm:px-6 text-xs sm:text-sm bg-primaryButton hover:bg-primaryHover cursor-pointer whitespace-nowrap"
            >
              <Link href="/auth/login" onClick={() => clearAuthTokenProvider()}>
                Sign Out
              </Link>
            </CustomButton>
          </div>
        )}
      </div>
    </aside>
  );
};

export default MobileHeader;
