import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import trand from './../../../../images/drawing/trand.svg'
import dlin_poz from './../../../../images/drawing/dlin poz.svg'
import fib from './../../../../images/drawing/fib.svg'
import gorizontal from './../../../../images/drawing/gorizontal.svg'
import gr_luch from './../../../../images/drawing/gr luch.svg'
import magnit1 from './../../../../images/drawing/magnit 1.svg'
import korot_poz from './../../../../images/drawing/korot poz.svg'
import price from './../../../../images/drawing/price.svg'
import profile_ob from './../../../../images/drawing/profile ob.svg'
import rect from './../../../../images/drawing/rect.svg'
import rubber from './../../../../images/drawing/rubber.svg'
import text from './../../../../images/drawing/text.svg'
const DrawingSettings = () => {
  return (
    <div className={styles.wrap}>
        <IconMenu>
            <img src={trand} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={gorizontal} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={gr_luch} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={dlin_poz} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={korot_poz} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={fib} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={rect} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={price} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={profile_ob} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={text} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={rubber} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={magnit1} alt="" />
        </IconMenu>
    </div>
  )
}

export default DrawingSettings