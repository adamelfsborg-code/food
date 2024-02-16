import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/lib/auth";
export const metadata: Metadata = {
  title: "Food",
  description: "Nutrition app",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession()  
  console.log(session)

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <div vaul-drawer-wrapper="">
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader session={session} />
            <main className="flex-1">{children}</main>
          </div>
        </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
