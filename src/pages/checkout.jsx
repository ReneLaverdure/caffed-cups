import { useSelector, useDispatch } from "react-redux"
import {getCartItems} from '../store/features/cart'
import styles from '../../styles/Checkout.module.css'
import Link from "next/link"
import CartItem from "../components/CartItem/CartItem"

export default function Checkout() {
    const items = useSelector(getCartItems)


    if(items.length === 0){
        return(
            <div className={styles.CheckoutContainer}>
                <div className={styles.CheckoutWrapper}>
                    <h1>Your Cart is Empty</h1>
                    <h1>(╥_╥)</h1> 
                </div>
            </div>
        )
    }

    return (
        <div >
            <div>
                {
                    items.map((item) => {
                        return (
                            <CartItem key={item._id} item={item} />
                        )
                    })
                }


                <Link href="/payment">
                    Head to payment
                </Link>
            </div>

        </div>
    )
}
 