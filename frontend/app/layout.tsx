import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Targeted Daily",
  description: "Business, lifestyle, wellbeing and marketing stories in English and Albanian."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
