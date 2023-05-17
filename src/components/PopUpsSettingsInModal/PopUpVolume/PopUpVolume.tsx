import React, { useEffect, useRef, useState } from 'react'
import useOutsideClick from '../../../hooks/useOutClick'
import styles from './styles.module.css'
import { useContextFilter } from '../../../modules/CoinModal/helpers/ContextFilter'
interface IPopUpVolume{
    isOpen:boolean,
    setIsOpen:(arg:boolean)=>void
}
const PopUpVolume:React.FC<IPopUpVolume> = ({isOpen, setIsOpen}) => {
    const [value, setValue]=useState<string>('')
    const {filterByV, setFilterByV}=useContextFilter()
    const ref=useRef<HTMLDivElement>(null)
    const onClose=()=>{
        setIsOpen(false)
    }
    useEffect(()=>{setFilterByV(Number(value))},[value])
    const closeActive=(e:KeyboardEvent)=>{
      if(e.code=='Enter' && isOpen){
        setIsOpen(false)
      }
    }
    useEffect(()=>{
      document.addEventListener('keydown', closeActive)
      return () => {
        document.removeEventListener("keydown",closeActive);
      };
    },[isOpen])
    useOutsideClick(ref, onClose, isOpen)
  if(!isOpen)return null;
  return (
    <div ref={ref} className={styles.wrap}>
        <p>&gt;</p>
        <input type="number" placeholder='Объем' value={value} onChange={(e)=>setValue(e.target.value)}/>
    </div>
  )
}

export default PopUpVolume