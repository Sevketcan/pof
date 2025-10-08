import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sevketcan Kalyoncuoglu - Computer Science Engineer",
  description: "Personal portfolio showcasing innovative projects and technical expertise in computer science engineering.",
  keywords: ["Computer Science", "Engineering", "Portfolio", "Developer", "Software Engineer"],
  authors: [{ name: "Sevketcan Kalyoncuoglu" }],
  openGraph: {
    title: "Sevketcan Kalyoncuoglu - Portfolio",
    description: "Computer Science Engineer Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sevketcan Kalyoncuoglu - Portfolio",
    description: "Computer Science Engineer Portfolio",
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
        className={`${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
