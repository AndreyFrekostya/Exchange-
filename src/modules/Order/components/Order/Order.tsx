import React from 'react'
import styles from './styles.module.css'
import TableLineOrder from '../TableLineOrder/TableLineOrder'
export const Order = () => {
  return (
    <div className={styles.wrap}>
        <div className={styles.name}>Топ ордеров +-5% от цены</div>
        <div className={styles.thead}>
            <div>ACH</div>
            <div>BTC</div>
            <div>Цена</div>
            <div>%</div>
        </div>
        <TableLineOrder/>
        <TableLineOrder/>
        <TableLineOrder/>
        <TableLineOrder/>
    </div>
  )
}
