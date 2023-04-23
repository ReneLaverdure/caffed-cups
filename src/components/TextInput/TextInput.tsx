import styles from './TextInput.module.css'
import { TextInputInterface } from '@/types'


export default function TextInput({type = 'text',name, value, placeholder, handleChange, labelLogic, labelStyleLogic}: TextInputInterface) {
  
  return (
    <div className={styles.TextInputContainer}>
        <label className={labelStyleLogic} htmlFor={name}>{labelLogic}</label>
        <input type={type} onChange={handleChange} name={name} value={value} placeholder={placeholder} />
    </div>
  )
}
