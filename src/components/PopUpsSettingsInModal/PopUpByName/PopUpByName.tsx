import React, { useRef } from 'react'
import styles from './styles.module.css'
import useOutsideClick from '../../../hooks/useOutClick'
import { useAppSelector } from '../../../hooks/redux-hooks'
import { useContextFilter } from '../../../modules/CoinModal/helpers/ContextFilter'
interface IPopUpByName{
    isOpenAlphabetically: boolean,
    setIsOpenAlphabetically: (arg:boolean)=>void,
}
const PopUpByName: React.FC<IPopUpByName> = ({isOpenAlphabetically, setIsOpenAlphabetically}) => {
    const ref=useRef<HTMLDivElement>(null)
    const {filterByAtoZ, setFilterByAtoZ, setFilterByBaseV}=useContextFilter()
    const onClose=()=>{
        setIsOpenAlphabetically(false)
    }
    const setFilter=(arg:boolean|null| string)=>{
        setFilterByAtoZ(arg)
        setFilterByBaseV(null)
    }
    useOutsideClick(ref, onClose, isOpenAlphabetically)
    if(!isOpenAlphabetically)return null;
  return (
    <div ref={ref} className={styles.wrap}>
        <div onClick={()=>setFilter(false)} style={{backgroundColor: filterByAtoZ===false ? '#2b395f' : ''}}>
            От A до Z
        </div>
        <div onClick={()=>setFilter(true)} style={{backgroundColor: filterByAtoZ===true ? '#2b395f' : ''}}>
            От Z до A
        </div>
        <div onClick={()=>setFilter('added')} style={{backgroundColor: filterByAtoZ==='added' ? '#2b395f' : ''}}>
            Только выделенные
        </div>
    </div>
  )
}

export default PopUpByName