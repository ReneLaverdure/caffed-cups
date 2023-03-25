import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './ProductCard.module.css'

export default function ProductCard({item}) {
    const {name, price, product_type, _id, image} = item
    
    let link = product_type + '/' + _id;

  

  return (
    <div className={styles.ProductCard}>
        
        <Image className={styles.ProductCardImage} src={image} alt={name} width={125} height={175} />
        <h4 className={styles.ProductCardTitle}>{name}</h4>
        <h5 className={styles.ProductPrice}>${price}.00</h5>
        <Link className={styles.LinkButton} href={link}>
            view product
        </Link>
    </div>
  )
}
