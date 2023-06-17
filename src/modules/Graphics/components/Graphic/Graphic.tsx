import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { IGraphic, clearWideScreen, setWideScreen } from '../../../../pages/MainPage/slices/GraphicSlice'
import { useAppDispatch,useAppSelector } from '../../../../hooks/redux-hooks';
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice';
import { rememberMode } from '../../../MenuSettings/slices/GraphicRememberLastMode';
import AddIcon from '@mui/icons-material/Add';
import { changeGraphicMode } from '../../../MenuSettings/slices/GraphicModeSlice';
import { useLazyGetKlinesSymbolQuery } from '../../api/KlinesSymbolApi';
import HeaderGraphic from '../HeaderGraphic/HeaderGraphic';
import MainCanvas from '../MainCanvas/MainCanvas';
import PriceCanvas from '../PriceCanvas/PriceCanvas';
import DateCanvas from '../DateCanvas/DateCanvas';
import VolumeCanvas from '../VolumeCanvas/VolumeCanvas';
import { TransformDistance } from '../../helpers/TransformDistance';
import { useGetUpdatedKlinesQuery } from '../../../../pages/MainPage/api/CandleUpdateApi';
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
  const [getKlinesSymbol,{data=[]}]=useLazyGetKlinesSymbolQuery()
  const {data:dataUpdated}=useGetUpdatedKlinesQuery({symbol:graphic.coin, interval:TransformDistance(graphic.distance),type:graphic.typeCoin}) 
  const [activeCoin, setActiveCoin]=useState<boolean>(false)
  const [howCandleInRange, setHowCandleInRange]=useState<number>(0)
  const [isMouseOnGraphic, setIsMouseOnGraphic]=useState<{x:number,y:number, q:boolean}>({x:-200,y:0, q:false})
  const [candleWidth, setCandleWidth]=useState<number>(3)
  const [priceWidth, setPriceWidth]=useState<number>(50)
  const [fixedNumber, setFixedNumber]=useState<number>(0)
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
  const priceRef=useRef<HTMLCanvasElement | null>(null)
  const choosedGraphic=useAppSelector(state=>state.graphics.find(item=>item.choosed===true))
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true)?.name)
  const propsToCanvas={graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic,fulfieldGraphicRefAndVolumeAndPrice,heightM, setHeightM,heightV,setHeightV,pressedCandle,setPressedCandle,priceWidth}
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
  useEffect(()=>{
    if(dataUpdated && data.length!==0){
      getKlinesSymbol({symbol:graphic.coin,interval:TransformDistance(graphic.distance),type:graphic.typeCoin})
    }
  },[dataUpdated])
  function fulfieldGraphicRefAndVolumeAndPrice(grRef:HTMLCanvasElement | null | undefined, voRef:HTMLCanvasElement | null | undefined,priceRefArg: HTMLCanvasElement | null | undefined){
    if(grRef){
      mainCanvasRef.current=grRef
    }
    if(voRef){
      volumeRef.current=voRef
    }
    if(priceRefArg){
      priceRef.current=priceRefArg
    }
  }
  return (
    <div  ref={graphicRef} className={graphic.choosed ? styles.wrapActive : styles.wrap} onMouseDown={onClick}>
      <HeaderGraphic wideS={wideS} one={one} setActiveCoin={setActiveCoin} activeCoin={activeCoin} graphic={graphic} graphicRef={graphicRef}/>
      <MainCanvas  {...propsToCanvas} voRef={volumeRef} priceRef={priceRef} fixedNumber={fixedNumber}/>
      <VolumeCanvas {...propsToCanvas} grRef={mainCanvasRef} />
      <DateCanvas graphicRef={graphicRef} data={data} xLeft={xLeft} scrolledCandle={startCandle} candleWidth={candleWidth} setCandleWidth={setCandleWidth}  setCandleSpacing={setCandleSpacing} candleSpacing={candleSpacing} howCandleInRange={howCandleInRange} setHowCandleInRange={setHowCandleInRange} x={isMouseOnGraphic.x} pressedCandle={pressedCandle} priceWidth={priceWidth} distance={distance} setXLeft={setXLeft} />
      <PriceCanvas graphicRef={graphicRef} data={data} xLeft={xLeft} howCandleInRange={howCandleInRange} startCandle={startCandle} heightM={heightM} setHeightM={setHeightM} yMouse={isMouseOnGraphic.y} candleWidth={candleWidth} candleSpacing={candleSpacing} q={isMouseOnGraphic.q} width={priceWidth} setWidth={setPriceWidth}  fulfieldGraphicRefAndVolumeAndPrice={fulfieldGraphicRefAndVolumeAndPrice} setFixedNumber={setFixedNumber}/>
      <>
        {graphic.coin==='' ? (
          <div className={styles.graphicAdd}>
            <AddIcon onClick={()=>setActiveCoin(!activeCoin)}/>
          </div> 
        ) : (
         null
        )}
      </>
    </div>
  )
}

export default Graphic