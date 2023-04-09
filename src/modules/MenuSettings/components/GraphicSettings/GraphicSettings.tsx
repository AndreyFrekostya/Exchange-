import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import two_gor_gr from './../../../../images/graphic/2 gor.svg'
import four_gr from './../../../../images/graphic/4 gr.svg'
import matches from './../../../../images/graphic/matches.svg'
import two_vert_gr from './../../../../images/graphic/2 vert.svg'
import one_gr from './../../../../images/graphic/one gr.svg'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { changeGraphicMode } from '../../slices/GraphicModeSlice'
const GraphicSettings = () => {
  const dispatch=useAppDispatch()
  const mode=useAppSelector(state=>state.modeGraphic)
  return (
    <div className={styles.wrap}>
        <img className={mode==='one' ? 'active' : ''} onClick={()=>dispatch(changeGraphicMode('one'))} src={one_gr} alt="" />
        <img className={mode==='two_vertical' ? 'active' : ''} onClick={()=>dispatch(changeGraphicMode('two_vertical'))} src={two_vert_gr} alt="" />
        <img src={two_gor_gr} alt='' className={mode==='two_horizontal' ? 'active' : ''} onClick={()=>dispatch(changeGraphicMode('two_horizontal'))} />
        <img className={mode==='four' ? 'active' : ''} onClick={()=>dispatch(changeGraphicMode('four'))} src={four_gr} alt="" />
        <IconMenu><img src={matches} alt="" /></IconMenu>
    </div>
  )
}

export default GraphicSettings