import styles from './PopUp.module.css'
import { MessageType } from '@/types'

export default function PopUp({message}: MessageType) {

  return (
    <div className={styles.PopUpContainer}>
        <div className={styles.PopUpWrapper}>
            <p>{message}</p>
        </div>
    </div>
  )
}
