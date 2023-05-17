import React from 'react'
import styles from './styles.module.css'
import { MenuSettings } from '../../../../modules/MenuSettings'
const Header = () => {

  return (
    <div className={styles.wrap}>
      <div style={{width:'100%', maxWidth:'790px'}}>
        <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
          <MenuSettings/>
        </div>
      </div>
    </div>
  )
}

export default Header