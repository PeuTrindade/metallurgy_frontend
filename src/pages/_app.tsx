import { UserContextProvider } from '@/context/userContext'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Roboto_Flex } from 'next/font/google'
import { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<string>
}

export const robotoFlex = Roboto_Flex({
  variable: '--roboto_flex',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
  adjustFontFallback: false,
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return (
    <>
      <ToastContainer />

      <UserContextProvider>
        <main className={robotoFlex.className}>{getLayout(<Component {...pageProps} />)}</main>
      </UserContextProvider>
    </>
  )
}
