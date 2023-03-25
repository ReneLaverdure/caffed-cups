import styles from './ImageLink.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function ImageLink({image, alt, name, link}) {

  return (
    <Link href={link}>
        <div className={styles.ImageLinkContainer}>
            <Image className={styles.ImageLinkImage} src={image} alt={alt} />
            <h2>{name}</h2>
        </div>
    </Link>
  )
}
