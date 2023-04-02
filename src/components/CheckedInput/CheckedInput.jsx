import React from 'react'

export default function CheckedInput({name}) {
  return (
    <div>
        <input type="check" />
        <label htmlFor={name}>{name}</label>
        
    </div>
  )
}
