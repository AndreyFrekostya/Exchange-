import React, { useRef } from 'react'
import styles from './styles.module.css'
import useOutsideClick from '../../../hooks/useOutClick'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { ICoin } from '../../../pages/MainPage/api/CoinApi'
import { useContextFilter } from '../../../modules/CoinModal/helpers/ContextFilter'
interface IPopUpMarket{
    isOpenMarketPopUp: boolean,
    setIsOpenMarketPopUp: (arg:boolean)=>void,
}
const PopUpMarket: React.FC<IPopUpMarket> = ({isOpenMarketPopUp, setIsOpenMarketPopUp}) => {
    const coins=useAppSelector(state=>state.coins)
    const {filterByMarket, setFilterByMarket}=useContextFilter()
    const ref=useRef<HTMLDivElement>(null)
    const onClose=()=>{
        setIsOpenMarketPopUp(false)
    }
    const setFilter=(arg:string)=>{
      if(arg==filterByMarket){
        setFilterByMarket('nothing')
      }else{
        setFilterByMarket(arg)
      }
    }
    useOutsideClick(ref, onClose, isOpenMarketPopUp)
    if(!isOpenMarketPopUp)return null;
  return (
    <div className={styles.wrap} ref={ref}>
        <div onClick={()=>setFilter('spot')} style={{backgroundColor: filterByMarket=='spot' ? '#2b395f' : ''}}>Спот</div>
        <div onClick={()=>setFilter('spot_with_f')} style={{backgroundColor: filterByMarket=='spot_with_f' ? '#2b395f' : ''}}>Спот (есть фьючерс)</div>
        <div onClick={()=>setFilter('futures')} style={{backgroundColor: filterByMarket=='futures' ? '#2b395f' : ''}}>Фьючерсы</div>
    </div>
  )
}

export default PopUpMarket