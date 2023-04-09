import React from 'react'
import styles from './styles.module.css'
interface IGraphic{
  id:string
}
const Graphic:React.FC<IGraphic> = ({id}) => {
  return (
    <div className={styles.wrap}>Graphic {id}</div>
  )
}

export default Graphic