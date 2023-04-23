import React from 'react'
import Image from 'next/image'
import styles from './cartItem.module.css';

import { useDispatch } from 'react-redux';

import { clearCartItem, addCartItem, removeCartItem } from '@/store/features/cart';
import { CartItemInterface } from '@/types';

export default function CartItem({cartItem}: CartItemInterface) {
  
    const {name, price, image, quantity} = cartItem
    const dispatch = useDispatch()


  return (
    <div  className={styles.CartItem}>
      
      <Image src={image} alt={name} height={100} width={75} />
      <h4>{name}</h4>

      <div className={styles.CartItemControl}>
        <button className={styles.CartItemControlButton} onClick={() => dispatch(removeCartItem(cartItem))}>-</button>
        <p>{quantity}</p>
        <button className={styles.CartItemControlButton} onClick={() => dispatch(addCartItem(cartItem))}>+</button>
      </div>

      <h4>${price}.00</h4>

      <button className={styles.CartItemControlButton} onClick={() => dispatch(clearCartItem(cartItem))}>X</button>
    </div>
  )
}
