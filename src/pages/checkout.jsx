import { useSelector, useDispatch } from "react-redux"
import {getCartItems} from '../store/features/cart'

import Link from "next/link"
import CartItem from "../components/CartItem/CartItem"

export default function checkout() {
    const items = useSelector(getCartItems)

    return (
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
    )
}
 