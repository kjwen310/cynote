import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/constant/site-config';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });
const { title, description } = siteConfig;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  icons: [
    {
      url: '/images/logo.svg',
      href: '/images/logo.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-white dark:bg-[#313338]', inter.className)}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="cynote-theme"
          >
            <main>
              {children}
            </main>
            <ModalProvider />
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
