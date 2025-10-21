import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 items-center justify-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
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
        </div>
      </nav>
    </>
  );
};

export default Header;
