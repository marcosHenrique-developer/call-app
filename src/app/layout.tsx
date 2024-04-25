import NextAuthSessionProvider from '@/context/NextAuthProvider'
import { StitchesRegistry } from '@/styles/global'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: 'Call',
  description: 'Call web app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <NextAuthSessionProvider>
          <StitchesRegistry>{children}</StitchesRegistry>
          <ToastContainer />
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
