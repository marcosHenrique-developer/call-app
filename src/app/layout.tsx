import { StitchesRegistry } from '@/styles/global'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

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
        <StitchesRegistry>{children}</StitchesRegistry>
      </body>
    </html>
  )
}
