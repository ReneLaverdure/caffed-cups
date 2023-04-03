import {CircleContainer} from './Circle.style.jsx'

export default function Circle({top, right, colour, width, height}) {
  return (
    <CircleContainer  
      top={top} 
      right={right} 
      colour={colour} 
      width={width} 
      height={height}    
    />
  )
}
