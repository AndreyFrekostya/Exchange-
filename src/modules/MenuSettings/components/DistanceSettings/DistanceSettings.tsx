import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import one_minute from './../../../../images/distance/1m.svg'
import five_minute from './../../../../images/distance/5m.svg'
import fiveteen_minute from './../../../../images/distance/15m.svg'
import thirty_minute from './../../../../images/distance/30m.svg'
import one_hour from './../../../../images/distance/1h.svg'
import four_hour  from './../../../../images/distance/4h.svg'
import one_day  from './../../../../images/distance/1d.svg'
const DistanceSettings = () => {
  return (
    <div className={styles.wrap}>
        <IconMenu>
            <img src={one_minute}/>
        </IconMenu>
        <IconMenu>
            <img src={five_minute}/>
        </IconMenu>
        <IconMenu>
            <img src={fiveteen_minute}/>
        </IconMenu>
        <IconMenu>
            <img src={thirty_minute}/>
        </IconMenu>
        <IconMenu>
            <img src={one_hour}/>
        </IconMenu>
        <IconMenu>
            <img src={four_hour}/>
        </IconMenu>
        <IconMenu>
            <img src={one_day}/>
        </IconMenu>
    </div>
  )
}

export default DistanceSettings