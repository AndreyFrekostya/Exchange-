import React,{FC} from 'react'
import styles from './styles.module.css'
interface I_IconMenu{
    children: React.ReactNode,
    onClick?: ()=>void,
    className?:string
}
const IconMenu:FC<I_IconMenu> = ({children, onClick,className}) => {
  return (
    <div className={className} id={styles.idIco} onClick={onClick}>
        {children}
    </div>
  )
}

export default IconMenu