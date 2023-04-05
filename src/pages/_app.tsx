import '../../styles/globals.css'
import type { AppProps } from 'next/app'

import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'

import {SessionProvider} from 'next-auth/react'

import {store} from '../store/store'
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
          <Navbar />
            <Component {...pageProps} />
          <Footer />
        </Provider>
    </SessionProvider>

    </>
    
  )
}
