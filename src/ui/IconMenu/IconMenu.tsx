import React,{FC} from 'react'
import styles from './styles.module.css'
interface I_IconMenu{
    children: React.ReactNode
}
const IconMenu:FC<I_IconMenu> = ({children}) => {
  return (
    <div className={styles.wrap}>
        {children}
    </div>
  )
}

export default IconMenu