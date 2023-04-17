import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { IGraphic, clearWideScreen, setWideScreen } from '../../../../pages/MainPage/slices/GraphicSlice'
import CropDinIcon from '@mui/icons-material/CropDin';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppDispatch,useAppSelector } from '../../../../hooks/redux-hooks';
import { changeGraphicMode } from '../../../MenuSettings/slices/GraphicModeSlice';
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice';
import { rememberMode } from '../../../MenuSettings/slices/GraphicRememberLastMode';
interface IGraphicComponent{
  graphic: IGraphic,
  onClick: ()=>void,
  one?: boolean,
  wideS?:boolean
}
const Graphic:React.FC<IGraphicComponent> = ({graphic, onClick, one,wideS}) => {
  const dispatch=useAppDispatch()
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true)?.name)
  const lastmode=useAppSelector(state=>state.lastMode)
  const choosedGraphic=useAppSelector(state=>state.graphics.find(item=>item.choosed==true))
  const openWideScreen=()=>{
    dispatch(rememberMode(mode))
    dispatch(changeGraphicMode('one'))
    dispatch(changeDistance(graphic.distance))
    dispatch(setWideScreen(graphic.id))
  }
  const closeWideScreen=()=>{
    dispatch(clearWideScreen())
    dispatch(changeGraphicMode(lastmode))
  }
  const closeFromPress=(e:any)=>{
    if(graphic.widescreen){
      if(e.code=="Escape" || e.code=='KeyF'){
        dispatch(clearWideScreen())
        dispatch(changeGraphicMode(lastmode))
      } 
    }
  }
  const openFromPress=(e:any):void=>{
    if(graphic.choosed==true){
      if(e.code=='KeyF'){
        dispatch(rememberMode(mode))
        dispatch(changeGraphicMode('one'))
        dispatch(changeDistance(choosedGraphic?.distance))
        dispatch(setWideScreen(choosedGraphic?.id))
      }
    }
  }
  useEffect(()=>{
    console.log(choosedGraphic?.id, choosedGraphic?.choosed)
      document.addEventListener('keydown', closeFromPress)
      document.addEventListener('keydown', openFromPress)
    return () => {
      document.removeEventListener("keydown", closeFromPress);
      document.removeEventListener("keydown", openFromPress);
    };
  },[graphic.choosed])
  return (
    <div style={{border: one ? 'none' : ''}} className={graphic.choosed ? styles.wrapActive : styles.wrap} onClick={onClick}>
      <div className={styles.headerGraph}>
        <div className={styles.info}> 
          <p>O: 0.00000135</p>
          <p>C: 0.00000135</p>
          <p>H: 0.00000135</p>
          <p>L: 0.00000135</p>
        </div>
        {!one ? wideS ? (<RemoveIcon onClick={closeWideScreen}/>) : (<CropDinIcon onClick={openWideScreen}/>) : (null)}
      </div>
      <div className={styles.graphic}>
        Graphic number: {graphic.id+1} <br /> Graphic timeframe: {graphic.distance}
      </div> 
    </div>
  )
}

export default Graphic