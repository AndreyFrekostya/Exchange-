import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import two_line_nakl from './../../../../images/drawing/2 line nakl.svg'
import three_line_nakl from './../../../../images/drawing/3 line nakl.svg'
import dollar from './../../../../images/drawing/dollar.svg'
import line_b_and_s from './../../../../images/drawing/line b and s.svg'
import lineal from './../../../../images/drawing/lineal.svg'
import rectangle from './../../../../images/drawing/rectangle.svg'
import rubber_and_time from './../../../../images/drawing/rubber and  time.svg'
import rubber from './../../../../images/drawing/rubber.svg'
import trand_2_sq from './../../../../images/drawing/trand with 2 sq.svg'
import trand from './../../../../images/drawing/trand.svg'
import volume from './../../../../images/drawing/volume.svg'
const DrawingSettings = () => {
  return (
    <div className={styles.wrap}>
        <IconMenu>
            <img src={volume} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={dollar} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={trand} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={line_b_and_s} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={two_line_nakl} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={three_line_nakl} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={trand_2_sq} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={rectangle} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={lineal} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={rubber} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={rubber_and_time} alt="" />
        </IconMenu>
    </div>
  )
}

export default DrawingSettings