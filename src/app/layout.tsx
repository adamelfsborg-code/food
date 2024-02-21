import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { MainHeader } from "@/components/main-header";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarNav from "@/components/sidebar-nav";

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
            <MainHeader session={session} />
            <div className="flex" >
              <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.6rem)] border-r border-border/40 w-[20rem] shrink-0 md:sticky md:block">
                <ScrollArea className="h-full">
                  <SidebarNav />
                </ScrollArea>
              </aside>
              <main className="flex-1 w-full h-full relative">
                {children}
              </main>
            </div>
          </div>
        </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
