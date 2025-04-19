import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Modam = localFont({
  src: [
    {
      path: "./Modam-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./Modam-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Modam-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Modam-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Modam-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Modam-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Modam-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Modam-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});
export const metadata: Metadata = {
  title: "کیکاو",
  description: "keykav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <body className={`${Modam.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
