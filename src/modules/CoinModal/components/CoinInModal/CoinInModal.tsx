import React,{ useEffect, useRef, useState} from 'react'
import { ICoin } from '../../../../pages/MainPage/api/CoinApi'
import styles from './styles.module.css'
import { useAppDispatch } from '../../../../hooks/redux-hooks'
import { addCoinList } from '../../../../pages/MainPage/slices/CoinChoosedListSlice'
interface ICoinModal{
    sym: ICoin,
    requestingSymbols: ICoin[],
    coinsInList:ICoin[]
}
export default React.memo(function CoinInModal({sym, requestingSymbols, coinsInList}:ICoinModal){
    const getIsAdded=()=>{
        const thisCoinName=coinsInList.find(item=>item.symbol===sym.symbol)
        if(thisCoinName){
            const type=sym.permissions!==undefined ? 'spot' : 'futures'
            if(thisCoinName.permissions===undefined && type==='futures'){
                return true
            }
            if(thisCoinName.permissions!==undefined && type==='spot'){
                return true
            }
        }
        return false
    }
    const dispatch=useAppDispatch()
    const [isAdded, setIsAdded]=useState<boolean>(getIsAdded())
    const addCoinToList=(symbol:string, type: string)=>{
        dispatch(addCoinList({sym, type}))
        setIsAdded(!isAdded)
    }
    function nFormatter(num:number) {
        if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/.0$/, '') + 'B';
        }
        if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/.0$/, '') + 'M';
        }
        if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/.0$/, '') + 'k';
        }
        return num;
    }
    const FixNumber=(num:number)=>{
        return num.toFixed(4)
    }
    useEffect(()=>{
        const flag=getIsAdded()
        setIsAdded(flag)
    },[requestingSymbols])
    useEffect(()=>{
        const flag=getIsAdded()
        setIsAdded(flag)
    },[])
  return (
    <div onClick={()=>addCoinToList(sym.symbol, sym.permissions===undefined ? 'futures' : 'spot')}>
        <div className={styles.symbolWrap} style={{backgroundColor: isAdded ? '#2b395f' : ''}} >
            <div className={styles.symbol}>
                <p>{sym.symbol}</p>
            </div>
            <div>Binance</div>
            <div><p className={sym.permissions===undefined ? styles.futures : styles.spot}>{ sym.permissions===undefined ? 'futures' : 'spot'}</p></div>
            <div  style={{paddingLeft:'13px'}}>{FixNumber(sym.lastPrice)}</div>
            <div>{sym.priceChangePercent}</div>
            <div className={styles.quoteVolume}>{nFormatter(sym.quoteVolume)} </div>
            <div>{nFormatter(sym.volume)}</div>
            </div>
    </div>
  )
})
