import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { IGraphic, clearWideScreen, setWideScreen } from '../../../../pages/MainPage/slices/GraphicSlice'
import { useAppDispatch,useAppSelector } from '../../../../hooks/redux-hooks';
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice';
import { rememberMode } from '../../../MenuSettings/slices/GraphicRememberLastMode';
import AddIcon from '@mui/icons-material/Add';
import { changeGraphicMode } from '../../../MenuSettings/slices/GraphicModeSlice';
import { useGetKlinesSymbolQuery, useLazyGetKlinesSymbolQuery } from '../../api/KlinesSymbolApi';
import HeaderGraphic from '../HeaderGraphic/HeaderGraphic';
import MainCanvas from '../MainCanvas/MainCanvas';
import PriceCanvas from '../PriceCanvas/PriceCanvas';
import DateCanvas from '../DateCanvas/DateCanvas';
import VolumeCanvas from '../VolumeCanvas/VolumeCanvas';
import { TransformDistance } from '../../helpers/TransformDistance';
import CrossHairCanvas from '../CrossHairCanvas/CrossHairCanvas';
interface IGraphicComponent{
  graphic: IGraphic,
  onClick: ()=>void,
  one?: boolean,
  wideS?:boolean
}
interface KeyboardEvent {
  code: string;
}
const Graphic:React.FC<IGraphicComponent> = ({graphic, onClick, one,wideS}) => {
  const dispatch=useAppDispatch()
  const [getKlinesSymbol,{data=[],isLoading}]=useLazyGetKlinesSymbolQuery()
  const distance=useAppSelector(state=>state.distance)
  const [scrollLeft, setScrollLeft]=useState<number>(0)
  const lastMode=useAppSelector(state=>state.lastMode)
  const graphicRef=useRef<HTMLDivElement | null>(null)
  const [activeCoin, setActiveCoin]=useState<boolean>(false)
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true)?.name)
  const choosedGraphic=useAppSelector(state=>state.graphics.find(item=>item.choosed===true))
  const closeFromPress=(e:KeyboardEvent)=>{
    if(graphic.widescreen){
      if(e.code==="Escape" || e.code==='KeyF'){
        dispatch(clearWideScreen())
        dispatch(changeGraphicMode(lastMode))
      } 
    }
  }
  const openFromPress=(e:KeyboardEvent):void=>{
    const input=document.getElementById('preset_input')
    if(graphic.choosed===true && graphic.id!==0){
      if(e.code==='KeyF' && input!==document.activeElement){
        dispatch(rememberMode(mode))
        dispatch(changeDistance(choosedGraphic?.distance))
        dispatch(setWideScreen(choosedGraphic?.id))
        dispatch(changeGraphicMode('one'))
      }
    }
  }
  useEffect(()=>{
      document.addEventListener('keydown', closeFromPress)
      document.addEventListener('keydown', openFromPress)
    return () => {
      document.removeEventListener("keydown", closeFromPress);
      document.removeEventListener("keydown", openFromPress);
    };
  },[graphic.choosed, distance])
  useEffect(()=>{
    if(graphic.coin!=='' && graphic.distance!==''){
      const timeframe=TransformDistance(graphic.distance)
      if(timeframe!==undefined){
        getKlinesSymbol({symbol:graphic.coin,interval:timeframe,type:graphic.typeCoin})
      }
    }
  },[graphic.coin,graphic.distance])
  return (
    <div  ref={graphicRef} className={graphic.choosed ? styles.wrapActive : styles.wrap} onClick={onClick}>
      <HeaderGraphic wideS={wideS} one={one} setActiveCoin={setActiveCoin} activeCoin={activeCoin} graphic={graphic} graphicRef={graphicRef}/>
      
      <MainCanvas  graphicRef={graphicRef} data={data} setScrollLeft={setScrollLeft}/>
      <VolumeCanvas graphicRef={graphicRef} data={data}  scrollLeft={scrollLeft}/>
      <DateCanvas graphicRef={graphicRef} data={data}/>
      <PriceCanvas graphicRef={graphicRef}/>
      <>
        {graphic.coin==='' ? (
          <div className={styles.graphicAdd}>
            <AddIcon onClick={()=>setActiveCoin(!activeCoin)}/>
            {graphic.distance==='0' ? (null) : (
              <div>
                Graphic timeframe: {graphic.distance}
              </div>
              )
            }
          </div> 
        ) : (
         null
        )}
      </>
    </div>
  )
}

export default Graphic