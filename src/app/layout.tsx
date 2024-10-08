import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./Provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo App | Organize Your Tasks Efficiently",
  description:
    "Streamline your productivity with our powerful Todo application. Stay organized, track your progress, and achieve your goals.",
  keywords: [
    "todo app",
    "task management",
    "productivity",
    "organization",
    "time management",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://todo.auenkr.me",
    title: "Todo App | Organize Your Tasks Efficiently",
    description:
      "Streamline your productivity with our powerful Todo application. Stay organized, track your progress, and achieve your goals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
