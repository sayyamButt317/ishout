import Link from "next/link";
import React, { useMemo } from "react";
import CustomButton from "./button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  clearAuthTokenProvider,
  getAuthTokenProvider,
  getRoleProvider,
} from "@/src/provider/auth-provide";

const Header = () => {
  const router = useRouter();
  const token = getAuthTokenProvider();
  const role = getRoleProvider();

  const dashboardRoute = useMemo(() => {
    if (token && role === "company") return "/client/create-campaign";
    if (token && role === "admin") return "/Admin/all-campaign";
    return "/auth/login";
  }, [token, role]);

  const DashboardRedirect = () => {
    router.replace(dashboardRoute);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur px-4 sm:px-6 py-4 justify-between">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-row gap-2">
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={155}
              height={155}
              className="w-[155px] h-[40px]"
            />
          </div>

          <div
            className="hidden lg:flex items-center gap-8 text-sm font-thin"
            style={{
              maxWidth: "900px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <a
              href="#about-us"
              className="text-white hover:text-pink-400 transition-colors text-sm font-thin"
            >
              About Us
            </a>
            <a
              href="#how-it-works"
              className="text-white hover:text-pink-400 transition-colors text-sm font-thin"
            >
              How It Works
            </a>
            <a
              href="#case-studies"
              className="text-white hover:text-pink-400 transition-colors text-sm font-thin"
            >
              Case Studies
            </a>
          </div>

          {!token ? (
            <div className="flex flex-row gap-1 sm:gap-2 justify-end items-center flex-shrink-0">
              <Link href="/auth/login">
                <CustomButton className="px-3 text-white sm:px-6 text-xs sm:text-sm bg-secondaryButton hover:bg-secondaryHover cursor-pointer whitespace-nowrap">
                  Login
                </CustomButton>
              </Link>

              <Link href="/auth/register">
                <CustomButton className="px-3 text-white sm:px-6 text-xs sm:text-sm bg-primaryButton hover:bg-primaryHover cursor-pointer whitespace-nowrap">
                  Register
                </CustomButton>
              </Link>
            </div>
          ) : (
            <div className="flex flex-row gap-1 sm:gap-2 justify-end items-center flex-shrink-0">
              <CustomButton
                onClick={() => DashboardRedirect()}
                className="px-3 sm:px-6 text-xs sm:text-sm bg-secondaryButton hover:bg-secondaryHover cursor-pointer whitespace-nowrap"
              >
                Dashboard
              </CustomButton>
              <CustomButton className="px-3 sm:px-6 text-xs sm:text-sm bg-primaryButton hover:bg-primaryHover cursor-pointer whitespace-nowrap">
                <Link
                  href="/auth/login"
                  onClick={() => clearAuthTokenProvider()}
                >
                  Sign Out
                </Link>
              </CustomButton>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
