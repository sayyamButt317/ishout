import Link from "next/link";
import React from "react";
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

  const DashboardRedirect = () => {
    if (token && role === "company") {
      router.replace("/client/create-campaign");
    } else if (token && role === "admin") {
      router.replace("/Admin/all-campaign");
    } else {
      router.replace("/auth/login");
    }
  };
  const handleSignOut = () => {
    clearAuthTokenProvider();
    router.replace("/auth/login");
  };

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 justify-between">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-row gap-2">
            <Image
              src="/assets/logo.svg"
              alt="logo"
              width={155}
              height={155}
              className="w-[155px] h-auto object-cover"
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
            <Link
              href="/"
              className="text-white hover:text-pink-400 transition-colors text-sm font-thin"
            >
              About US
            </Link>
            <Link
              href="#how-it-works"
              className="text-white hover:text-pink-400 transition-colors text-sm font-thin"
            >
              How It Works
            </Link>
            <Link
              href="#case-studies"
              className="text-white hover:text-pink-400 transition-colors text-sm font-thin"
            >
              Case Studies
            </Link>
          </div>
          {!token ? (
            <div className="flex flex-row gap-1 sm:gap-2 justify-end items-center flex-shrink-0">
              <CustomButton
                onClick={() => router.push("/auth/login")}
                className="px-3 sm:px-6 text-xs sm:text-sm bg-secondaryButton hover:bg-secondaryHover cursor-pointer whitespace-nowrap"
              >
                Login
              </CustomButton>
              <CustomButton
                onClick={() => router.push("/auth/register")}
                className="px-3 sm:px-6 text-xs sm:text-sm bg-primaryButton hover:bg-primaryHover cursor-pointer whitespace-nowrap"
              >
                Register
              </CustomButton>
            </div>
          ) : (
            <div className="flex flex-row gap-1 sm:gap-2 justify-end items-center flex-shrink-0">
              <CustomButton
                onClick={() => DashboardRedirect()}
                className="px-3 sm:px-6 text-xs sm:text-sm bg-secondaryButton hover:bg-secondaryHover cursor-pointer whitespace-nowrap"
              >
                Dashboard
              </CustomButton>
              <CustomButton
                onClick={() => handleSignOut()}
                className="px-3 sm:px-6 text-xs sm:text-sm bg-primaryButton hover:bg-primaryHover cursor-pointer whitespace-nowrap"
              >
                Sign Out
              </CustomButton>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
