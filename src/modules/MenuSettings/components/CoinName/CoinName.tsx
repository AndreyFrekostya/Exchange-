import React, { createContext, useContext, useEffect, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from './styles.module.css'
import ModalCopied from '../../../../ui/modalCopied/ModalCopied';
import { useAppSelector } from '../../../../hooks/redux-hooks';
import {CoinModal} from '../../../CoinModal/components/CoinModal/CoinModal';
export type Context={
  active: boolean,
  setActive: (arg:boolean)=>void
}
interface KeyboardEvent {
  code: string;
}
const activeContext=createContext<Context>({active: false, setActive: (arg:boolean)=>{}})
export const useActiveContext=()=>useContext(activeContext)
const CoinName = () => {
    const coin=useAppSelector(state=>state.coin)
    const [isActiveModal, setIsActiveModal]=useState<boolean>(false)
    const [active, setActive]=useState<boolean>(false)
    const copyText=()=>{
      navigator.clipboard.writeText(coin.coin)
      setIsActiveModal(true)
      setTimeout(()=>{
        setIsActiveModal(false)
      }, 1000)
    }
    const closeActive=(e:KeyboardEvent)=>{
      if(e.code==='Escape' && active){
        setActive(false)
      }
    }
    useEffect(()=>{
      document.addEventListener('keydown', closeActive)
      return () => {
        document.removeEventListener("keydown",closeActive);
      };
    },[active])
  return (
    <div className={styles.wrap}>
      {coin.coin==='' ? (
        <div className={styles.container}  onClick={()=>setActive(!active)}> 
          <div className={styles.obv}>
            <p className={active ? styles.activeChooseCoin :styles.chooseCoin}>Выберите монету</p>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.obv}>
            <div className={styles.choose}>
              <div onClick={()=>setActive(!active)} style={{display: 'flex', gap: '2px'}}>
                <p className={active ? styles.activeChooseCoin :styles.chooseCoin}>{coin.coin}</p>
                <p className={coin.type==='futures' ? styles.futures : styles.spot}>{coin.type}</p>
              </div>
              <ContentCopyIcon onClick={copyText}/>
            </div>
            <ModalCopied isActiveModal={isActiveModal}/>
          </div>
        </div>
      )}
      <activeContext.Provider value={{active, setActive}}>
        {active && <CoinModal setActive={setActive} active={active}/>}
      </activeContext.Provider>
    </div>
  )
}
export default CoinName
