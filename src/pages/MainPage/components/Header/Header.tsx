import React from 'react'
import styles from './styles.module.css'
import { MenuSettings } from '../../../../modules/MenuSettings'
const Header = () => {

  return (
    <div className={styles.wrap}>
      <div style={{width:'720px'}}>
        <div style={{display:'flex', gap:'20px'}}>
          <MenuSettings/>
        </div>
      </div>
    </div>
  )
}

export default Header