import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import useOutsideClick from '../../../hooks/useOutClick'
import { useContextFilter } from '../../../modules/CoinModal/helpers/ContextFilter'
interface IPopUpPercent{
  isOpen:boolean,
  setIsOpen: (arg:boolean)=>void
}
const PopUpPercent: React.FC<IPopUpPercent> = ({isOpen, setIsOpen}) => {
  const [value, setValue]=useState('')
  const {filterByChangePercent, setFilterByChangePercent}=useContextFilter()
  const ref=useRef<HTMLDivElement>(null)
  const onClose=()=>{
    setIsOpen(false)
  }
  useEffect(()=>{setFilterByChangePercent(Number(value))},[value])
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
    <div className={styles.wrap} ref={ref}>
      <p>&gt;</p>
      <input type="number" placeholder='Процент' value={value} onChange={(e)=>setValue(e.target.value)}/>
    </div>
  )
}

export default PopUpPercent