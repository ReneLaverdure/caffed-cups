import '../../styles/globals.css'
import type { AppProps } from 'next/app'

import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'

import {store} from '../store/store'
import { Provider } from 'react-redux'
import "../db/mongoose.js"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Navbar />
          <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
    
  )
}
