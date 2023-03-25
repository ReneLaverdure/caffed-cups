import React from 'react'
import Image from 'next/image'
import styles from './CartSideItem.module.css'
import { useDispatch } from 'react-redux';
import { clearCartItem, addCartItem, removeCartItem } from '@/store/features/cart';

export default function CartSideItem({cartItem}) {
    let {name, price, quantity, image} = cartItem;
    const dispatch = useDispatch()

    const clearItem = () => dispatch(clearCartItem(cartItem))
    const addItem = () => dispatch(addCartItem(cartItem));
    const removeItem = () => dispatch(removeCartItem(cartItem))

  return (
    <div className={styles.CartSideItem}>
      <div>
        <Image src={image} alt={name} width={75} height={100} />
      </div>

      <div className={styles.CartSideItemContent}>
          <div className={styles.CartSideItemTitle}>
              <h4>{name}</h4>
              <h5>${price}.00</h5>
          </div>

          {/* <button onClick={clearItem}>Remove Item</button> */}
          <div className={styles.CartSideItemControl}>
            <button onClick={removeItem}>-</button>
              <p>{quantity}</p>
            <button onClick={addItem}>+</button>
          </div>
      </div>



    </div>
  )
}
