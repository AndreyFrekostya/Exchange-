import React, { useState } from 'react'
import styles from './styles.module.css'
import PopUpByName from '../../../../components/PopUpsSettingsInModal/PopUpByName/PopUpByName'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PopUpMarket from '../../../../components/PopUpsSettingsInModal/PopUpMarket/PopUpMarket'
import PopUpPercent from '../../../../components/PopUpsSettingsInModal/PopUpPercent/PopUpPercent'
import PopUpVolume from '../../../../components/PopUpsSettingsInModal/PopUpVolume/PopUpVolume'
import { useContextFilter } from '../../helpers/ContextFilter'

const CoinsHeaderSettings:React.FC = () => {
  const {setFilterByAtoZ, filterByPercentFromHtoL,filterByVFromHtoL, setFilterByPercentFromHtoL,setFilterByVFromHtoL, filterByV,filterByChangePercent}=useContextFilter()
  const [isOpenAlphabetically, setIsOpenAlphabetically]=useState<boolean>(false)
  const [isOpenMarketPopUp, setIsOpenMarketPopUp]=useState<boolean>(false)
  const {filterByBaseV,setFilterByBaseV}=useContextFilter()
  const [isOpenChangePercent, setIsOpenChangePercent]=useState<boolean>(false)
  const [decreasingVolume, setDecreasingVolume]=useState<boolean>(false)
  const colorForVolumeFilterIcon=filterByV===0 ? '#5e5d5d' : decreasingVolume ? '#2962ff' : '#fff'
  const colorForPercentFilterIcon=filterByChangePercent===0 ? '#5e5d5d' : isOpenChangePercent ? '#2962ff' : '#fff'
  const setFilterBase=()=>{
    setFilterByBaseV(!filterByBaseV)
    setFilterByAtoZ(null)
    setFilterByVFromHtoL(null)
    setFilterByPercentFromHtoL(null)
  }
  const setFilterPercent=()=>{
    setFilterByPercentFromHtoL(!filterByPercentFromHtoL)
    setFilterByBaseV(null)
    setFilterByAtoZ(null)
    setFilterByVFromHtoL(null)
  }
  const setFilterVolume=()=>{
    setFilterByVFromHtoL(!filterByVFromHtoL)
    setFilterByPercentFromHtoL(null)
    setFilterByBaseV(null)
    setFilterByAtoZ(null)
  }
  return (
    <div>
      <div className={styles.row}>
        <div onClick={()=>setIsOpenAlphabetically(!isOpenAlphabetically)}>
          <p>Актив</p>
          <PopUpByName  isOpenAlphabetically={isOpenAlphabetically} setIsOpenAlphabetically={setIsOpenAlphabetically}/>  
        </div>
        <div>Биржа</div>
        <div onClick={()=>setIsOpenMarketPopUp(!isOpenMarketPopUp)}>
          <p>Рынок</p>
          <PopUpMarket isOpenMarketPopUp={isOpenMarketPopUp} setIsOpenMarketPopUp={setIsOpenMarketPopUp}/>
          </div>
        <div>Последняя цена</div>
        <div>
          <div className={styles.filterWithIcon}>
            <div className={styles.decreaseWrap} onClick={setFilterPercent}>
              <p >Измен, %</p>
              {filterByPercentFromHtoL ? <ArrowDropUpIcon/> : filterByPercentFromHtoL==null ? null : <ArrowDropDownIcon/>}
            </div>
            <FilterAltIcon style={{color: colorForPercentFilterIcon}}  onClick={()=>setIsOpenChangePercent(!isOpenChangePercent)}/>
            <PopUpPercent isOpen={isOpenChangePercent}  setIsOpen={setIsOpenChangePercent}/>
          </div>
        </div>
        <div onClick={setFilterBase} className={styles.quoteVolume}>
          <div className={styles.filterWithIcon}>
            <p>Объем в баз. мон.</p>
            {filterByBaseV ? <ArrowDropUpIcon/> : filterByBaseV==null ? null : <ArrowDropDownIcon/>}
          </div>
        </div>
        <div>
          <div className={styles.filterWithIcon}>
          <div className={styles.decreaseWrap} onClick={setFilterVolume}>
              <p >Объем USD</p>
              {filterByVFromHtoL ? <ArrowDropUpIcon/> : filterByVFromHtoL==null ? null : <ArrowDropDownIcon/>}
            </div>
            <FilterAltIcon style={{color: colorForVolumeFilterIcon}}  onClick={()=>setDecreasingVolume(!decreasingVolume)}/>
            <PopUpVolume isOpen={decreasingVolume}   setIsOpen={setDecreasingVolume}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinsHeaderSettings