import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NodeWave Todo",
  description: "Todo Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}