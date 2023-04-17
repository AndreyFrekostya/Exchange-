import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import one from './../../../../images/graphic/one gr.svg'
import two_gor from './../../../../images/graphic/2 gor.svg'
import four from './../../../../images/graphic/4 gr.svg'
import matches from './../../../../images/graphic/matches.svg'
import two_vert from './../../../../images/graphic/2 vert.svg'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { changeGraphicMode } from '../../slices/GraphicModeSlice'
import { changeDistance } from '../../slices/DistanceSetSlice'
import { setChoosedGraphic, setGraphicDistance, setGraphicsOnTwoMode } from '../../../../pages/MainPage/slices/GraphicSlice'
const GraphicSettings = () => {
  const dispatch=useAppDispatch()
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true))
  const allGraphics=useAppSelector(state=>state.graphics)
  const setMode=(mode_arg:string)=>{
    if(mode_arg==='one'){
      dispatch(setChoosedGraphic(0))
      dispatch(changeDistance(allGraphics[0].distance))
    }
    if(mode_arg==='two'){
      dispatch(setGraphicsOnTwoMode())
      dispatch(setChoosedGraphic(1))
      dispatch(changeDistance(allGraphics[1].distance))
    }
    if(mode_arg==='four'){
      dispatch(setChoosedGraphic(3))
      dispatch(changeDistance(allGraphics[3].distance))
    }
    dispatch(changeGraphicMode(mode_arg))
  }
  return (
    <div className={styles.wrap}>
        <img src={one} alt="" className={mode?.name==='one' ? styles.active : styles.disabled}  onClick={()=>setMode('one')} />
        <img src={two_gor} alt=""  className={mode?.name==='two' ? styles.active : styles.disabled} onClick={()=>setMode('two')} />
        <img  src={four} alt="" className={mode?.name==='four' ? styles.active : styles.disabled} onClick={()=>setMode('four')}/>
        <IconMenu><img className={styles.disabled} src={matches} alt="" /></IconMenu>
    </div>
  )
}

export default GraphicSettings