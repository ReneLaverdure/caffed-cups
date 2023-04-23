import React from 'react'
import { CheckedInputInterface } from '@/types'

export default function CheckedInput({name}: CheckedInputInterface) {
  return (
    <div>
        <input type="check" />
        <label htmlFor={name}>{name}</label>
        
    </div>
  )
}
