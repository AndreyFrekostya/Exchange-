import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import styles from './styles.module.css'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
const InfoBarCoin = () => {
  return (
    <div className={styles.wrap}>
        <h4><StarIcon/> Монета</h4>
        <NotificationsActiveIcon/>
        <h5>1h</h5>
        <h5>4h</h5>
        <h5>1d</h5>
        <h5>T</h5>
        <h5>O</h5>
        <h5>V</h5>
        <ChangeHistoryOutlinedIcon/>
        <h5>P</h5>     
    </div>
  )
}

export default InfoBarCoin