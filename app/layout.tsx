
import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Footer from '@/components/Footer'
// import { currentUser } from '@clerk/nextjs/server'
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Meal Hunter',
  description: 'Search and discover delicious meals',
}
const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const user = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen  mx-auto`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header  />
      <div className='flex-grow container mx-auto'>
          {children}</div>
          <Toaster />
          <Footer />
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}