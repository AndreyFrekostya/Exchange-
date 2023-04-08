import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import two_vert_gr from './../../../../images/graphic/2 vert gr.svg'
import four_gr from './../../../../images/graphic/4 gr.svg'
import matches from './../../../../images/graphic/matches.svg'
import two_gor_gr from './../../../../images/graphic/2 gor gr.svg'
const GraphicSettings = () => {
  return (
    <div className={styles.wrap}>
        <IconMenu>
            <div></div>
        </IconMenu>
        <IconMenu>
            <img src={two_vert_gr} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={two_gor_gr } alt="" />
        </IconMenu>
        <IconMenu>
            <img src={four_gr} alt="" />
        </IconMenu>
        <IconMenu>
            <img src={matches} alt="" />
        </IconMenu>
    </div>
  )
}

export default GraphicSettings