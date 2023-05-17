import React, { RefObject, useContext, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { ICoin } from '../../../../pages/MainPage/api/CoinApi'
import CoinSetting from '../../../MenuSettings/components/CoinSetting/CoinSetting'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { setGlobalCoin } from '../../../../pages/MainPage/slices/GraphicSlice'
import { changeCoin } from '../../../MenuSettings/slices/CoinSlice'
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice'
import { Checkbox } from '@mui/material'
import { addCoinList } from '../../../../pages/MainPage/slices/CoinChoosedListSlice'
import activeContext, { Context, useActiveContext } from './../../../MenuSettings/components/CoinName/CoinName'
import CoinInModal from '../CoinInModal/CoinInModal'
import { ChangeEvent } from 'react'
import { FormEvent } from 'react'
interface ICoinModalList{
    data: ICoin[],
    requestingSymbols: ICoin[],
    text:string,
    visibleRows:number
}
const CoinModalList:React.FC<ICoinModalList>= ({data, requestingSymbols, text, visibleRows}) => {
    const [start, setStart] = useState<number>(0);
    const coinsInList=useAppSelector(state=>state.coinInList)
    const graphic=useAppSelector(state=>state.graphics.find(item=>item.choosed))
    const {active, setActive}=useActiveContext()
    const dispatch=useAppDispatch()
    const rootRef = useRef<HTMLDivElement | null>(null);
    function getTopHeight() {
        return 31 * start;
    }
    function getBottomHeight() {
        if(data!==undefined){
            if(requestingSymbols.length<visibleRows){
                return 31 * requestingSymbols.length
            }else{
                return 31 * (requestingSymbols.length - (start + visibleRows + 1));
            }
        }
    }
    
    useEffect(()=>{
        setStart(0)
        if(rootRef.current!==null){
            rootRef.current.scrollTop=0
        }
    },[requestingSymbols])
    useEffect(() => {
        function onScroll(e:any) {
            if(data!==undefined){
                setStart(Math.min(
                    data.length - visibleRows - 1,
                    Math.floor(e.target.scrollTop / 31)
                ));
            }
        }
        if(rootRef.current!==null){
            rootRef.current.addEventListener('scroll', onScroll);
        }
    
        return () => {
          if(rootRef.current!==null){
            rootRef.current.removeEventListener('scroll', onScroll);
          }
        }
      }, [data?.length, visibleRows]);
  return (
    <div className={styles.coins}>
        <div ref={rootRef} style={{ height: 31 * visibleRows + 1, overflow: 'auto'}}>
            <div style={{ height: getTopHeight() }} />
            {requestingSymbols?.slice(start, start + visibleRows + 1).map((sym:ICoin,index:number)=>(
                <CoinInModal requestingSymbols={requestingSymbols} coinsInList={coinsInList} key={start + index} sym={sym}/>
            ))}
            <div style={{ height: getBottomHeight() }} />  
        </div>
        {text.length!==0 && requestingSymbols.length==0 && <p className={styles.nothing}>Ничего не найдено!</p>}
    </div>
  )
}

export default CoinModalList