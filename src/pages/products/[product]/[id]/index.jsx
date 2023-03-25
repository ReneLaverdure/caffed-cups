import React from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from "react-redux"
import { addCartItem, removeCartItem, getCartItems, updateCartTotal, toggleCart} from '../../../../store/features/cart'
import Button from '../../../../components/Button/Button'

import styles from '../../../../../styles/ProductItem.module.css'

export default function ItemId({item}) {
  const {name, image, price} = item[0]

  const itemCount = useSelector(getCartItems)
  const dispatch = useDispatch()

  const addItemHandler = () => {
    dispatch(addCartItem(item[0]))
    dispatch(updateCartTotal())
    dispatch(toggleCart())
  }

  const removeItemHandler = () => {
    dispatch(removeCartItem(item[0]))
    dispatch(updateCartTotal())
  }

  return (
    <div className={styles.ProductItemContainer}>
      
      <Image className={styles.ProductImage} src={image} alt={name} width={500} height={600} />
      <div className={styles.ProductItemContent}>
        <h2>{name}</h2>
        <h4>{price}</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat hic tenetur sit doloremque maxime accusantium? Impedit ad nihil, possimus, aliquam culpa numquam perspiciatis est voluptates nam deleniti
          amet? Corrupti libero iste beatae distinctio? Ab sint quae corporis tempore porro cumque quam, architecto vel! Praesentium inventore sint dignissimos, consequatur distinctio molestias.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod dolorem quibusdam quos excepturi omnis, tempore placeat ut dicta rerum reiciendis mollitia ullam quia nulla aspernatur natus. 
          Sed sit, quidem quasi ut mollitia iure ducimus id ipsa quisquam sint optio facere quia fuga necessitatibus minima, deleniti libero esse, ipsum unde voluptatibus nemo. Et nam eius, 
          consequuntur nostrum iste officia quos quod itaque vero id aperiam laborum, odit ipsa obcaecati. Inventore ipsam ratione tempora esse rem necessitatibus laudantium. Harum similique ipsa deserunt!
        </p>
        <Button className={styles.ProductItemButton} onClick={addItemHandler} >
          Add to Cart
        </Button>
       
        {/* <Button className={styles.ProductItemButton}  onClick={removeItemHandler} >
          -
        </Button> */}
      </div>

    </div>
  )
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.BASE_URL}/products/get-products`)
  const items = await response.json()

  console.log(items)
  const paths = items.map((item) => ({
    params: { product: item.product_type, id: item._id },
  }))

  console.log(paths)
  return { paths, fallback: 'blocking' }
}



export async function getStaticProps(context) {
  let id = context.params.id
  console.log('this is item id: ', id)
  let response = await fetch(`${process.env.BASE_URL}/products/${id}`)
 
  let item = await response.json()

  return {
    props: {
      item,
    }, 
  }
}
