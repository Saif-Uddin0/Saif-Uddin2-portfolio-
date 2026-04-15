import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saif Uddin | Mern-Stack Web Developer",
  description:
    "Portfolio of Saif Uddin — Mern-Stack Web Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Saif Uddin",
    "Mern-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Portfolio",
    "Web Developer",
  ],
  openGraph: {
    title: "Saif Uddin | Mern-Stack Web Developer",
    description:
      "Portfolio of Saif Uddin — Mern-Stack Web Developer specializing in React, Next.js, Node.js & modern web technologies.",
    type: "website",
  },
  icons: {
    icon: "person.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable}`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
