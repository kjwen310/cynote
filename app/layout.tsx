import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ModalProvider } from '@/components/providers/modal-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });
const { title, description } = siteConfig;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${description}`,
  },
  description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <main>{children}</main>
          <ModalProvider />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
