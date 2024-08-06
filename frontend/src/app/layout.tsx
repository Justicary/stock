import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cn } from "@/lib/utils";
import DashboardWrapper from "./dashboard/Wrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Stock",
  description: "Sistema de control de inventarios en la nube.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={cn("font-sans antialiased", inter.variable)}>
        <NextIntlClientProvider messages={messages}>
          <DashboardWrapper>{children}</DashboardWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
