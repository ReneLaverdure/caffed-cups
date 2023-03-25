import React from 'react'
import Image from 'next/image'
import styles from './cartItem.module.css';

import { useDispatch } from 'react-redux';

import { clearCartItem, addCartItem, removeCartItem } from '@/store/features/cart';

export default function CartItem({item}) {
    const {name, price, image, quantity} = item
    const dispatch = useDispatch()


  return (
    <div  className={styles.CartItem}>
      
      <Image src={image} alt={name} height={100} width={75} />
      <h4>{name}</h4>

      <div className={styles.CartItemControl}>
        <button onClick={() => dispatch(removeCartItem(item))}>-</button>
        <p>{quantity}</p>
        <button onClick={() => dispatch(addCartItem(item))}>+</button>
      </div>

      <h4>${price}.00</h4>

      <button onClick={() => dispatch(clearCartItem(item))}>X</button>
    </div>
  )
}
