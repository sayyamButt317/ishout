import Link from "next/link";
import React from "react";
import CustomButton from "./button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 justify-between">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-Primary-text ">ishout</h1>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white hover:text-pink-400 transition-colors"
            >
              About US
            </Link>
            <Link
              href="#how-it-works"
              className="text-white hover:text-pink-400 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#case-studies"
              className="text-white hover:text-pink-400 transition-colors"
            >
              Case Studies
            </Link>
          </div>
          <div className="flex flex-row gap-2 justify-end items-center ">
            <CustomButton
              onClick={() => router.push("/auth/login")}
              className="w-full sm:w-auto bg-secondaryButton hover:bg-secondaryHover cursor-pointer"
            >
              Login
            </CustomButton>
            <CustomButton
              onClick={() => router.push("/auth/register")}
              className="w-full sm:w-auto bg-primaryButton hover:bg-primaryHover cursor-pointer"
            >
              Register
            </CustomButton>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
