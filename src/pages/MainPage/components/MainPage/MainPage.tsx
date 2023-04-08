import React from 'react'
import styles from './styles.module.css'
import Header from '../Header/Header'
import { Glass } from '../../../../modules/Glass'
import { Order } from '../../../../modules/Order'
const MainPage = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.firstColomn}>
        <Header/>
      </div>
      <div className={styles.secondColomn}>
        <Glass/>
        <Order/>
      </div>
    </div>
  )
}

export default MainPage