import React from 'react'
import styles from './styles.module.css'
import Header from '../Header/Header'
import { Glass } from '../../../../modules/Glass'
import { Order } from '../../../../modules/Order'
import {Graphics} from '../../../../modules/Graphics/components/Graphics/Graphics'
const MainPage = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.firstColomn}>
        <Header/>
        <Graphics/>
      </div>
      <div className={styles.secondColomn}>
        <Glass/>
        <Order/>
      </div>
    </div>
  )
}

export default MainPage