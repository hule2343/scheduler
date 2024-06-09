import { Inter } from "next/font/google";
import NextAuthProvider from "@/components/provider/NextAuth";
import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Theme } from "@/components/provider/Theme";
import { SnackbarProvider } from "@/components/provider/SnackBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "xxxxxxx",
  description: "xxxxxxx",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <NextAuthProvider>
            <Theme>
              <SnackbarProvider>{children}</SnackbarProvider>
            </Theme>
          </NextAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
