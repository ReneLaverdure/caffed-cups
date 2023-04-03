import styles from './PopUp.module.css'

export default function PopUp({message}) {

  return (
    <div className={styles.PopUpContainer}>
        <div className={styles.PopUpWrapper}>
            <p>{message}</p>
        </div>
       
    </div>
  )
}
