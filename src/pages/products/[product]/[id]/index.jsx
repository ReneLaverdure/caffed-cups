import React from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from "react-redux"
import { addCartItem, removeCartItem, getCartItems, updateCartTotal, toggleCart} from '../../../../store/features/cart'
import Button from '../../../../components/Button/Button'

import "../../../../db/mongoose"
import Product from '../../../../models/products'
import styles from '../../../../../styles/ProductItem.module.css'

export default function ItemId({item}) {

  const {name, image, price} = item


  const dispatch = useDispatch()

  const addItemHandler = () => {
    dispatch(addCartItem(item))
    dispatch(updateCartTotal())
    dispatch(toggleCart())
  }

  if (typeof item === "undefined"){
    return "Loading..."
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
      </div>

    </div>
  )
}

export async function getStaticPaths() {

  let products = await Product.find()
  products = JSON.stringify(products)
  products = JSON.parse(products)

  const paths = products.map((item) => ({
    params: { product: item.product_type, id: item._id },
  }))


  return { paths, fallback: false }
}



export async function getStaticProps(context) {
    let id = context.params.id
    let item = await Product.findById(id)
    item = JSON.stringify(item)
    item = JSON.parse(item)

  return {
    props: {
      item,
    }, 
  }
}
