import styles from './Navbar.module.css'
import Link from 'next/link'

import CartSide from '../CartSide/CartSide'
import CartIcon from '../CartIcon/CartIcon'

import { getCartStatus } from '@/store/features/cart'
import { useSelector } from 'react-redux'
import {useSession, signOut} from 'next-auth/react'


export default function Navbar() {

  const cartStatus = useSelector(getCartStatus)
  const {data: session} = useSession()

  return (
    <nav className={styles.Nav}>
      <div className={styles.NavContainer}>
        <Link className={styles.NavHeading} href="/">
          Caffed Cups
        </Link>

        <div className={styles.NavLinksContainer}>
          <Link className={styles.NavLinks} href="/products/coffee">
            coffee
          </Link>
          <Link className={styles.NavLinks} href="/products/tea">
            tea
          </Link>
          <Link className={styles.NavLinks} href="/about-us">
            About us
          </Link>
          <Link className={styles.NavLinks} href="/contact">
            Contact us
          </Link>
          {
            session ?
            <Link onClick={signOut} className={styles.NavLinks} href="/">
              Logout
            </Link> :
              <Link className={styles.NavLinks} href="/login">
              Login
            </Link>

          }
                      {/* <Link className={styles.NavLinks} href="/register">
              Register
            </Link> */}
          <div className={styles.NavLinks}>
            <CartIcon />
          </div>
          {cartStatus && <CartSide />}
        </div>
      </div>
    </nav>
  )
}
