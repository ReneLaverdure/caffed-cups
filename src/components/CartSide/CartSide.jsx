import React from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import {toggleCart, getCartItems} from '../../store/features/cart'
import CartSideItem from '../CartSideItem/CartSideItem'

import styles from './CartSide.module.css'

export default function CartSide() {

    const dispatch = useDispatch()
    const cartItems = useSelector(getCartItems)

    const handleMouseMove = () => {
        console.log('off')
        dispatch(toggleCart())
    }

  return (
    <div onMouseLeave={handleMouseMove} id="mySidenav" className={styles.sidenav}>
        <div className={styles.CartTitle}>
            <h2>Cart</h2>
            <span  onClick={() => dispatch(toggleCart())}>&times;</span>
        </div>

        <div className='cart-items'>
            {cartItems.length ? (
                cartItems.map((cartItem) => (
                    <CartSideItem key={cartItem._id} cartItem={cartItem} />
                ))
            ) : (
                <span>Your cart is empty</span>
            )}
        </div>

        <Link href='/checkout' onClick={() => dispatch(toggleCart())}>
            proceed to Checkout
        </Link>



        {/* <div className='SideNavCheckout'>
            <Button onClick={goToCheckoutHandler}>Go to CheckOut</Button>
        </div> */}

    </div>
  )
}
