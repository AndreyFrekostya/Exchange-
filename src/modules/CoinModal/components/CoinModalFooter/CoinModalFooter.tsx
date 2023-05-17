import React from 'react'
import styles from './styles.module.css'
import { Checkbox } from '@mui/material'
import { ICoin } from '../../../../pages/MainPage/api/CoinApi'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAppSelector } from '../../../../hooks/redux-hooks'
import Tip from '../../../../ui/Tip/Tip';
interface ICoinModalFooter{
    coins: ICoin[],
    requestingSymbols: ICoin[],
    setActive:(arg:boolean)=>void,
    coinsInList:ICoin[]
}
const CoinModalFooter:React.FC<ICoinModalFooter> = ({coins,requestingSymbols,setActive,coinsInList }) => {
    
  return (
    <div className={styles.wrap}>
        <div className={styles.info}>
            <div><p>Всего: {coins.length}</p></div>
            <div><p>Отфильтровано: {requestingSymbols.length}</p></div>
            <div><p>Всего включено: {coinsInList.length}</p></div>
        </div>
        <div className={styles.second}>
          <div className={styles.tip}>
            <InfoOutlinedIcon/>
            <Tip>Будьте осторожны! Фильтрация может производиться по нескольким параметрам.<br/> Так что всегда имейте в виду какие фильтры у Вас включены.</Tip>
          </div>
          <div className={styles.filter} onClick={()=>setActive(false)}>
              Сохранить
          </div>
        </div>
    </div>
  )
}

export default CoinModalFooter