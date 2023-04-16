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
import { clearChoosed, setGraphicDistance, setGraphicsOnTwoMode } from '../../../../pages/MainPage/slices/GraphicSlice'
const GraphicSettings = () => {
  const dispatch=useAppDispatch()
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true))
  const allGraphics=useAppSelector(state=>state.graphics)
  const allModeGraphics=useAppSelector(state=>state.modeGraphic)
  const choosedGraphic=useAppSelector(state=>state.graphics.find(item=>item.choosed===true))
  const setMode=(mode_arg:string)=>{
    const previousMode=mode
    const choosedMode=allModeGraphics.find(item=>item.name===mode_arg)
    if(choosedMode && previousMode && choosedGraphic){
      if(choosedMode.numOfGraph<previousMode.numOfGraph && choosedGraphic.id>choosedMode.id){
        dispatch(clearChoosed())
        dispatch(changeDistance(allGraphics[0].distance))
      }
    }
    if(mode_arg==='two_horizontal'){
      dispatch(changeDistance('1h'))
      dispatch(setGraphicsOnTwoMode())
    }
    dispatch(changeGraphicMode(mode_arg))
  }
  return (
    <div className={styles.wrap}>
        <img src={one} alt="" className={mode?.name==='one' ? styles.active : styles.disabled}  onClick={()=>setMode('one')} />
        <img src={two_gor} alt=""  className={mode?.name==='two_horizontal' ? styles.active : styles.disabled} onClick={()=>setMode('two_horizontal')} />
        <img  src={four} alt="" className={mode?.name==='four' ? styles.active : styles.disabled} onClick={()=>setMode('four')}/>
        <IconMenu><img className={styles.disabled} src={matches} alt="" /></IconMenu>
    </div>
  )
}

export default GraphicSettings