import React,{useRef, useState, useEffect, useContext} from 'react'
import styles from './styles.module.css'
import useOutsideClick from '../../../../hooks/useOutClick'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useGetCoinQuery, useLazyGetCoinQuery } from '../../../../pages/MainPage/api/CoinApi';
import CoinSetting from '../../../MenuSettings/components/CoinSetting/CoinSetting';
import { ICoin, ICoinQuery } from '../../../../pages/MainPage/api/CoinApi'
import Loader from '../../../../components/Loading/Loader';
import CoinModalFooter from '../CoinModalFooter/CoinModalFooter';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import CoinModalList from '../CoinModalList/CoinModalList';
import CoinsHeaderSettings from '../CoinsHeaderSettings/CoinsHeaderSettings';
import { ContextIsLoadingDataModal } from '../../../../pages/MainPage/components/MainPage/MainPage';
import { sortByNameAndInt } from '../../helpers/SortByNameAndInt';
import { ContextFilter } from '../../helpers/ContextFilter';
import { sortByVolume } from '../../helpers/SortByVolume';
import { sortByPercent } from '../../helpers/SortByPercent';
import { sortByMarket } from '../../helpers/SortByMarket';
import { setCoins } from '../../../../pages/MainPage/slices/AllCoinsSlice';
interface ICoinModal{
  active:boolean,
  setActive: (arg: boolean)=>void
}

export const CoinModal:React.FC<ICoinModal> = ({setActive, active}) => {
  const coins=useAppSelector(state=>state.coins)
  const [getCoin, {isFetching,error, data}]=useLazyGetCoinQuery()
  const dispatch=useAppDispatch()
  const isLoadingDataFirst=useContext(ContextIsLoadingDataModal)
  const coinsInList=useAppSelector(state=>state.coinInList)
  const [filterByAtoZ, setFilterByAtoZ]=useState<boolean | null | string>(false)
  const [filterByMarket, setFilterByMarket]=useState<string | null>(null)
  const [filterByChangePercent, setFilterByChangePercent]=useState<number>(0)
  const [filterByPercentFromHtoL, setFilterByPercentFromHtoL]=useState<boolean | null>(null)
  const [filterByVFromHtoL, setFilterByVFromHtoL]=useState<boolean | null>(null)
  const [filterByBaseV, setFilterByBaseV]=useState<boolean | null>(null)
  const [filterByV, setFilterByV]=useState<number | null>(0)
  const [visibleRows, setVisibleRows]=useState<number>(10)
  const wrapRef=useRef<HTMLDivElement | null>(null)
  const ref=useRef<HTMLTableSectionElement | null>(null)
  const [requestingSymbols, setRequestingSymbols]=useState<ICoin[]>(coins)
  const [text, setText]=useState<string>('')
  const onClose=()=>{
      setActive(false)
  }
  useEffect(()=>{
    if(data){
      dispatch(setCoins(data))
    }
  },[data])
  useEffect(()=>{
    const copy=[...coins]
    let sortedMarket=sortByMarket(filterByMarket,copy)
    if(sortedMarket!==undefined){
      let sortedByPercent=sortByPercent(filterByChangePercent,sortedMarket)
      if(sortedByPercent!==undefined){
        let sortedByPerentFromHtoL=sortedByPercent.sort(sortByNameAndInt('priceChangePercent', filterByPercentFromHtoL,undefined))
        if(sortedByPerentFromHtoL!==undefined){
          let sortedByBaseVolume=sortedByPercent.sort(sortByNameAndInt('quoteVolume', filterByBaseV,undefined))
          if(sortedByBaseVolume!==undefined){
            let sortedByVolume=sortByVolume(filterByV, sortedByBaseVolume)
            if(sortedByVolume!==undefined){
              let sortedByVolumeFromHtoL=sortedByVolume.sort(sortByNameAndInt('volume', filterByVFromHtoL,undefined))
              if(filterByAtoZ!=='added'){
                let sortedByAlpha=sortedByVolume.sort(sortByNameAndInt('symbol', filterByAtoZ, undefined))
                const copyarr:ICoin[]=[]
                sortedByAlpha?.forEach((symbol)=>{
                    if(symbol.symbol.includes(text.toUpperCase())){
                        copyarr.push(symbol)
                    }
                })
                setRequestingSymbols(copyarr)
              }else{
                setRequestingSymbols(coinsInList)
              }
            }
          }
        }
      }
    }
  },[filterByAtoZ, filterByMarket,filterByChangePercent,filterByBaseV, filterByV,text,
    filterByVFromHtoL,filterByPercentFromHtoL])
  useEffect(()=>{
      setRequestingSymbols(coins)
      if(ref.current?.clientHeight!==undefined){
          setVisibleRows((ref.current?.clientHeight-22)/31)
      }
  },[coins])
  return (
    <>
      <div className={styles.blur}></div>
        <div className={styles.wrap} ref={wrapRef} >
          <div className={styles.header}>
            <button className={styles.reset} onClick={()=>getCoin()}>
              Обновить статистику за 24 часа
            </button>
              <div className={styles.close} onClick={onClose}>
                <CloseRoundedIcon/>
            </div>
            </div>
            <div className={styles.input}>
              <input id='preset_input' type="text" value={text} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setText(e.target.value)} placeholder='Найти монету'/>
            </div>
            <div style={{overflowX: 'auto', flexBasis: '100%', overflowY:'hidden'}}>
              {isLoadingDataFirst && <Loader/>}
              {isFetching && <Loader/>}
              <div className={styles.table}>
                <ContextFilter.Provider value={{filterByAtoZ,
                  filterByMarket,
                  filterByChangePercent,
                  filterByBaseV, 
                  filterByV,
                  setFilterByAtoZ,
                  setFilterByMarket,
                  setFilterByChangePercent,
                  setFilterByBaseV,
                  setFilterByV,
                  filterByPercentFromHtoL,
                  filterByVFromHtoL,
                  setFilterByPercentFromHtoL,
                  setFilterByVFromHtoL
                  }}>
                  <CoinsHeaderSettings />
                </ContextFilter.Provider>
                <div className={styles.coinsWrap} ref={ref}>
                  <CoinModalList data={coins} text={text} visibleRows={visibleRows} requestingSymbols={requestingSymbols}/>
                </div>
              </div>
            </div>
          <div>
          <CoinModalFooter requestingSymbols={requestingSymbols} coins={coins} coinsInList={coinsInList} setActive={setActive}/>
        </div>
      </div>
    </>
  )
}

