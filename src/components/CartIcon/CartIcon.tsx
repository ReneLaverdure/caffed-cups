import ShoppingIcon from '../../../public/CartIcon.svg'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux'
import { toggleCart, getCatItemCount } from '@/store/features/cart'
import styles from './CartIcon.module.css'

export default function CartIcon() {

    const dispatch = useDispatch();
    const itemsCount = useSelector(getCatItemCount)

  return (
    <div className={styles.CartIconContainer} onClick={() => dispatch(toggleCart(''))}>
      {
        itemsCount > 0 ?  <span className={styles.ItemCount}>{itemsCount}</span> : null
      }
       
        <Image className={styles.CartIcon} src={ShoppingIcon} height={32} width={32} alt="shopping cart icon" />
    </div>
  )
}
