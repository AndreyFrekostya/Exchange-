import React, { useState } from 'react'
import styles from './styles.module.css'
import one from './../../../../images/graphic/one.svg'
import GraphicModalSettings from '../GraphicModalSettings/GraphicModalSettings'
import PresetSetting from '../PresetSettings/PresetSetting'
const GraphicSettings = () => {
  const [active, setActive]=useState<boolean>(false)
  const setMenu=(arg:boolean)=>{
    if(arg){
      setActive(!active)
    }else{
      setActive(false)
    }
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.icons}>
        <div className={active ? styles.active : styles.disabled} onClick={()=>setMenu(true)}>
          <img className={active ? styles.graphIcon : styles.graphIconDisabled} src={one} alt="" />
        </div>
        <div className={styles.presetWrapIcon}>
          <PresetSetting/>
        </div>
      </div>
      {active ? (<GraphicModalSettings active={active} setActive={setMenu}/>) : (null)}    
    </div>
  )
}

export default GraphicSettings