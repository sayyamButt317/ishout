import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "react-phone-number-input/style.css";
import QueryProvider from "@/src/context/QueryProvider";
import CustomToast from "./component/customtoast";
import ErrorBoundary from "@/src/errors/ErrorBoundary";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iShout",
  icons: {
    icon: "/assets/iShout-gif-black-background.gif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <CustomToast />
          <Analytics />
          <SpeedInsights />
          <ErrorBoundary>{children}</ErrorBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
