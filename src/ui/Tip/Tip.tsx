import React from 'react'
import styles from './styles.module.css'
interface ITip{
    children: React.ReactNode
}
const Tip:React.FC<ITip> = ({children}) => {
  return (
    <div className={styles.wrap}>{children}</div>
  )
}

export default Tip