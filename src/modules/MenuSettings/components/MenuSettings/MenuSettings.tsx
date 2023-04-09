import React from 'react'
import DistanceSettings from '../../../../modules/MenuSettings/components/DistanceSettings/DistanceSettings'
import DrawingSettings from '../../../../modules/MenuSettings/components/DrawingSettings/DrawingSettings'
import GraphicSettings from '../../../../modules/MenuSettings/components/GraphicSettings/GraphicSettings'
import Other from '../../../../modules/MenuSettings/components/OtherSettings/Other'
import CoinName from '../../../../modules/MenuSettings/components/CoinName/CoinName'
import styles  from './styles.module.css'
export const MenuSettings = () => {
  return (
    <>
        <div className={styles.FirstColomn}>
            <CoinName/>
            <DistanceSettings/>
        </div>
        <div className={styles.SecondColomn}>
          <div style={{display:'flex'}}>
              <GraphicSettings/>
              <Other/>
          </div>
          <DrawingSettings/>
        </div>
      
    </>
  )
}
