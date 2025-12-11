import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mom's Sick Day Protocol",
  description: "A cozy 8-bit companion for tracking your recovery activities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
