import React from 'react'
import styles from './styles.module.css'
import { MenuSettings } from '../../../../modules/MenuSettings'
const Header = () => {
  return (
    <div className={styles.wrap}>
      <MenuSettings/>
    </div>
  )
}

export default Header