import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers"; // Named import for Providers

// Configure the Satoshi font
const satoshi = localFont({
  src: [
     {
      path: "../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi", // Optional: for Tailwind CSS or custom CSS
  display: "swap", // Prevents layout shift by using fallback font during load
});

export const metadata: Metadata = {
  title: "VibeStrings",
  description: "Online Guitar Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={satoshi.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}