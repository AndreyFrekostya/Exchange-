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
  const [activeCoin, setActiveCoin]=useState<boolean>(false)
  const [howCandleInRange, setHowCandleInRange]=useState<number>(0)
  const [isMouseOnGraphic, setIsMouseOnGraphic]=useState<{x:number,y:number, q:boolean}>({x:-200,y:0, q:false})
  const [candleWidth, setCandleWidth]=useState<number>(3)
  const [candleSpacing, setCandleSpacing]=useState<number>(1)
  const [heightV, setHeightV]=useState<number>(70)
  const [xLeft, setXLeft]=useState<number>(0)
  const [pressedCandle, setPressedCandle]=useState<string[] | undefined>([])
  const [startCandle, setStartCandle]=useState<number>(0)
  const distance=useAppSelector(state=>state.distance)
  const lastMode=useAppSelector(state=>state.lastMode)
  const graphicRef=useRef<HTMLDivElement | null>(null)
  const [heightM, setHeightM]=useState<number | undefined>(graphicRef.current?.clientHeight ? graphicRef.current?.clientHeight-142 : undefined)
  const mainCanvasRef=useRef<HTMLCanvasElement | null>(null)
  const volumeRef=useRef<HTMLCanvasElement | null>(null)
  const choosedGraphic=useAppSelector(state=>state.graphics.find(item=>item.choosed===true))
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true)?.name)
  const propsToCanvas={graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic,fulfieldGraphicRefAndVolume,heightM, setHeightM,heightV,setHeightV,pressedCandle,setPressedCandle}
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
      if(timeframe!==undefined ){
        getKlinesSymbol({symbol:graphic.coin,interval:timeframe,type:graphic.typeCoin})
        
      }
    }
  },[graphic.coin,graphic.distance])
  function fulfieldGraphicRefAndVolume(grRef:HTMLCanvasElement | null | undefined, voRef:HTMLCanvasElement | null | undefined){
    if(grRef){
      mainCanvasRef.current=grRef
    }
    if(voRef){
      volumeRef.current=voRef
    }
  }
  return (
    <div  ref={graphicRef} className={graphic.choosed ? styles.wrapActive : styles.wrap} onMouseDown={onClick}>
      <HeaderGraphic wideS={wideS} one={one} setActiveCoin={setActiveCoin} activeCoin={activeCoin} graphic={graphic} graphicRef={graphicRef}/>
      <MainCanvas  {...propsToCanvas} voRef={volumeRef}/>
      <VolumeCanvas {...propsToCanvas} grRef={mainCanvasRef} />
      <DateCanvas graphicRef={graphicRef} data={data} xLeft={xLeft} scrolledCandle={startCandle} candleWidth={candleWidth} setCandleWidth={setCandleWidth}  setCandleSpacing={setCandleSpacing} candleSpacing={candleSpacing} howCandleInRange={howCandleInRange} setHowCandleInRange={setHowCandleInRange} x={isMouseOnGraphic.x} pressedCandle={pressedCandle} distance={distance} setXLeft={setXLeft} />
      <PriceCanvas graphicRef={graphicRef} data={data} xLeft={xLeft} howCandleInRange={howCandleInRange} startCandle={startCandle} heightM={heightM} setHeightM={setHeightM} yMouse={isMouseOnGraphic.y} candleWidth={candleWidth} candleSpacing={candleSpacing} q={isMouseOnGraphic.q}/>
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