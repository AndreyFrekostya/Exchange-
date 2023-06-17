import React,{useState} from 'react'
import styles from './styles.module.css'
import preset from './../../../../images/other/preset.svg'
import PresetModal from '../PresetModal/PresetModal';
const PresetSetting = () => {
  const [active, setIsActive]=useState<boolean>(false)
  return (
    <div className={styles.wrap}>
      <div className={styles.icons} onClick={() => setIsActive(!active)}>
        <div className={active ? styles.disabled : styles.icons}>
          <img src={preset} alt="" className={active ? styles.presetIcon : styles.presetDisabled}/>
        </div>
      </div>
      {active ? (<PresetModal active={active} setIsActive={setIsActive}/>) : (null)}
    </div>
  )
}

export default PresetSetting