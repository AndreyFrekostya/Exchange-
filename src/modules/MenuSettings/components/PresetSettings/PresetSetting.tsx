import React,{useState} from 'react'
import styles from './styles.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import preset from './../../../../images/other/preset.svg'
import PresetModal from '../PresetModal/PresetModal';
const PresetSetting = () => {
  const [active, setIsActive]=useState<boolean>(false)
  const onClose=()=>{
    setIsActive(false)
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.icons} onClick={() => setIsActive((v) => !v)}>
        <img src={preset} alt="" />
        {active ? (<KeyboardArrowUpIcon/>) : (<KeyboardArrowDownIcon/>)}
      </div>
      <PresetModal active={active} onClose={onClose}/>
    </div>
  )
}

export default PresetSetting