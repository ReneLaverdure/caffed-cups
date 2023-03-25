import React from 'react'
import styles from './Button.module.css'

export default function Button({children, ...otherProps}) {

  return (
    <button {...otherProps}>
        {children}
    </button>
  )
}
