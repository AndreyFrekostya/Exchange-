import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'

const DistanceSettings = () => {
  return (
    <div className={styles.wrap}>
        <IconMenu>
            <p>1m</p>
        </IconMenu>
        <IconMenu>
            <p>5m</p>
        </IconMenu>
        <IconMenu>
            <p>15m</p>
        </IconMenu>
        <IconMenu>
            <p>30m</p>
        </IconMenu>
        <IconMenu>
            <p>1h</p>
        </IconMenu>
        <IconMenu>
            <p>4h</p>
        </IconMenu>
        <IconMenu>
            <p>1d</p>
        </IconMenu>
    </div>
  )
}

export default DistanceSettings