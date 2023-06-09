import React, { ChangeEvent, useEffect, useState, useRef, RefObject } from 'react'
import styles from './styles.module.css'
import { ICoin} from '../../../../pages/MainPage/api/CoinApi';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import useOutsideClick from '../../../../hooks/useOutClick';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AllCoins from '../AllCoins/AllCoins';
interface ICoinList{
    active: boolean,
    setActive:(arg:boolean)=>void,
    id: number,
    graphicRef: RefObject<HTMLDivElement>
}
export const CoinList:React.FC<ICoinList> = ({setActive, active,id, graphicRef}) => {
    const filterSettings:string[]=['all', 'f', 's']
    const coins=useAppSelector(state=>state.coinsInListInGraphics)
    const [visibleRows, setVisibleRows]=useState<number>(30)
    const ref=useRef<HTMLDivElement | null>(null)
    const [requestingSymbols, setRequestingSymbols]=useState<ICoin[]>(coins)
    const [text, setText]=useState<string>('')
    const [filteredBy, setFilteredBy]=useState<string>('all')
    const isFutures=filteredBy==='f' ? true : false 
    const isSpot=filteredBy==='s' ? true : false
    const isFuturesNext=filterSettings[filterSettings.indexOf(filteredBy)+1]==='f' ? true : false 
    const isSpotNext=filterSettings[filterSettings.indexOf(filteredBy)+1]==='s' ? true : false 
    useEffect(()=>{
        if(!text){setRequestingSymbols([])}
        if(coins){
            const copyarr:ICoin[]=[]
            coins?.forEach((symbol)=>{
                if(filteredBy==='f'){
                    if(symbol.symbol.includes(text.toUpperCase()) && symbol.permissions===undefined){
                        copyarr.push(symbol)
                    }
                }else if(filteredBy==='s'){
                    if(symbol.symbol.includes(text.toUpperCase()) && symbol.permissions!==undefined){
                        copyarr.push(symbol)
                    }
                }else{
                    if(symbol.symbol.includes(text.toUpperCase())){
                        copyarr.push(symbol)
                    }
                }
            })
            setRequestingSymbols(copyarr)
        }    
    },[text])
    const onClose=()=>{
        setActive(false)
    }
    const setFilter=()=>{
        let i=filterSettings.indexOf(filteredBy)
        const nextSet=filterSettings[i+1]
        if(i===2){
            setFilteredBy( 'all' )
            setRequestingSymbols(coins)
        }else{
            setFilteredBy(filterSettings[i+1])
            if(nextSet==='s'){
                const copyarr: ICoin[]=[]
                coins?.forEach((symbol)=>{

                        if(symbol.symbol.includes(text.toUpperCase()) && symbol.permissions!==undefined){
                            copyarr.push(symbol)
                    }
                    
                })
                setRequestingSymbols(copyarr)
            }else if(nextSet==='f'){
                const copyarr: ICoin[]=[]
                coins?.forEach((symbol)=>{
                        if(symbol.symbol.includes(text.toUpperCase()) && symbol.permissions===undefined){
                            copyarr.push(symbol)
                        }
                })
                setRequestingSymbols(copyarr)
            }
        }
    } 
    const setRows=()=>{
        if(ref.current?.clientHeight!==undefined){
            setVisibleRows((ref.current?.clientHeight-31)/29.5)
        }
    }
    useEffect(()=>{
        if(text.length===0 && filteredBy==='all'){
            setRequestingSymbols(coins)
        }
        setRows()
    },[coins, text])
    useOutsideClick(ref, onClose,active)
    useEffect(()=>{
        if(ref.current!==null){
            ref.current.addEventListener('resize', setRows)
            return()=>{
                if(ref.current!==null){
                    ref.current.removeEventListener('resize', setRows) 
                }
            }
        }
    },[ref.current?.clientHeight])
  return (
    <div className={styles.wrap} ref={ref}>
        <div className={styles.coiIinp}>
            <form autoComplete="off">
                <input id='preset_input' type="text" value={text} onChange={(e:ChangeEvent<HTMLInputElement>)=>setText(e.target.value)} placeholder='Найти монету'/>
            </form>
            <div className={styles.filter} onClick={setFilter}>
                <p className={isFutures ? styles.futures : isSpot ? styles.spot  : ''}>{filteredBy}</p>
                <KeyboardArrowRightIcon/>
                <p className={isFuturesNext ? styles.futures : isSpotNext ? styles.spot  : ''}>{filterSettings.map(item=>{
                    if(item===filteredBy){
                        let i=filterSettings.indexOf(item)  
                        if(i===2){
                            return 'all'
                        }
                        return filterSettings[i+1]
                    }else{
                        return
                    }
                })}</p>
            </div>
        </div>
        <AllCoins requestingSymbols={requestingSymbols} visibleRows={visibleRows} graphicRef={graphicRef} data={coins} onClose={onClose}  text={text} id={id}/>
    </div>
  )
}