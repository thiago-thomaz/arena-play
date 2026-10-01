import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { Toast } from '@/components/Toast';
import { brandConfig } from '@/config/brand.config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${brandConfig.brandName} · ${brandConfig.tagline}`,
  description: brandConfig.subheadline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.className} dark`}>
      <body className="bg-[#0B0F0E] text-[#F5F7F4] min-h-screen flex flex-col selection:bg-[#B8F34A] selection:text-[#0B0F0E]">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-24 md:pb-12">{children}</main>
          <BottomNav />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
