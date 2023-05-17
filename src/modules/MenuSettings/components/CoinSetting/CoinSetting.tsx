import React from 'react'
import styles from './styles.module.css'
import { ICoin } from '../../../../pages/MainPage/api/CoinApi'
import SettingCoin from '../../../../ui/SettingCoin/SettingCoin'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { changeCoin } from '../../slices/CoinSlice'
import { setGlobalCoin } from '../../../../pages/MainPage/slices/GraphicSlice'
import { changeDistance } from '../../slices/DistanceSetSlice'
interface ICoinSetting{
    symbol:ICoin
}
const CoinSetting:React.FC<ICoinSetting>= ({symbol}) => {
    const settings=[1,2,4,5,6,7,8,9]
    const graphic=useAppSelector(state=>state.graphics.find(item=>item.choosed===true))
    const dispatch=useAppDispatch()
    const chooseCoin=(symbol:string)=>{
        dispatch(changeCoin(symbol))
        if(graphic?.coin==''){
            dispatch(changeDistance("Д"))
        }
        dispatch(setGlobalCoin(symbol))
        
    }
  return (
    <div className={styles.wrap} onClick={()=>chooseCoin(symbol.symbol)}>
        <div>
            {symbol.symbol}
        </div>
        <div className={styles.settings}>
            {settings.map((setting:number)=>(
                <SettingCoin key={setting} setting={setting}/>
            ))}
        </div>
    </div>
  )
}

export default CoinSetting