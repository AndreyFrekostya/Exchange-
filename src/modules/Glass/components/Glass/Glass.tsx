import React from 'react'
import styles from './styles.module.css'
import InfoBarCoin from '../InfoBar/InfoBarCoin'
import Table from '../Table/Table'
export const Glass = () => {
  return (
    <div className={styles.wrap}>
      <InfoBarCoin/>
      <Table/>
    </div>
  )
}

