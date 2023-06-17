import React from 'react'
import styles from './styles.module.css'
import { ICoin } from '../../../../pages/MainPage/api/CoinApi'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import Tip from '../../../../ui/Tip/Tip';
import { setGlobalCoin } from '../../../../pages/MainPage/slices/GraphicSlice';
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice';
interface ICoinModalFooter{
    coins: ICoin[],
    requestingSymbols: ICoin[],
    setActive:(arg:boolean)=>void,
    coinsInList:ICoin[]
}
const CoinModalFooter:React.FC<ICoinModalFooter> = ({coins,requestingSymbols,setActive,coinsInList }) => {
  const dispatch=useAppDispatch()
  const choosedGarphic=useAppSelector(state=>state.graphics.find(i=>i.choosed===true))
  const setCoins=()=>{
    dispatch(setGlobalCoin({coin:coinsInList[0].symbol, type:coinsInList[0].t}))
    if(choosedGarphic?.distance==='0'){
      dispatch(changeDistance('Д'))
    }else{
      dispatch(changeDistance(choosedGarphic?.distance))
    }
    setActive(false)
  }
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
          <div className={styles.filter} onClick={setCoins}>
              Сохранить
          </div>
        </div>
    </div>
  )
}

export default CoinModalFooter