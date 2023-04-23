import styles from './TypeSection.module.css'
import { TypeSectionInterface } from '@/types'


export default function TypesSection({title, items, handleTypes}: TypeSectionInterface) {

    title = title.split("_").join(" ")

  return (
    <div>
        <h2>{title}</h2>
        {
            items.map((item) => {
                return <button className={styles.Button} value={item} key={item} onClick={handleTypes}>{item}</button>
            })
        }
    </div>
  )
}
