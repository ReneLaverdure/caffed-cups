import ShoppingIcon from '../../../public/CartIcon.svg'
import Image from 'next/image';
import { useDispatch } from 'react-redux'
import { toggleCart } from '@/store/features/cart'
import styles from './CartIcon.module.css'

export default function CartIcon() {

    const dispatch = useDispatch();

  return (
    <div className={styles.CartIconContainer} onClick={() => dispatch(toggleCart())}>
        <Image className={styles.CartIcon} src={ShoppingIcon} height={32} width={32} alt="shopping cart icon" />
    </div>
  )
}
