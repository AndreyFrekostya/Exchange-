import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawVolume } from '../../helpers/DrawVolume'
import { DrawMaxAndMinVolume } from '../../helpers/DrawMaxAndMinVolume'
import Resizer from '../Resizer/Resizer'
import { ICanvasVolume } from '../../interfaces/VolumeCanvasInterfaces'
import CrosshairVolume from '../CrosshairVolume/CrossHairVolume'

export const VolumeCanvas:React.FC<ICanvasVolume> = ({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic, grRef,fulfieldGraphicRefAndVolumeAndPrice, setHeightM, heightM, heightV, setHeightV,priceWidth, volumeRef,dopHeightCanvas, setDopHeightCanvas,graphic}) => {
    const [maxVolume, setMaxVolume]=useState<number>(0)
    const [minVolume, setMinVolume]=useState<number>(0)  
    const [startY, setStartY]=useState<number>(0) 
    const [dopHeight, setDopHeight]=useState<number>(70)
    const [isPressed, setIsPressed]=useState<boolean>(false)
    const [yDown, setYDown]=useState<number>(0)
    const [isPressedMain, setIsPressedMain]=useState<boolean>(false)
    const [startYMain, setStartYMain]=useState<number>(0)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth : undefined)
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refCanvas2=useRef<HTMLCanvasElement>(null)
    const canvas3Element=volumeRef.current
    const refCanvas4=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=refCanvas2.current?.getContext('2d')
    const ctx4=refCanvas4.current?.getContext('2d')
    const propsToCrosshairCanvas={setIsMouseOnGraphic,ctx2,refDop:refCanvas2.current,minVolume,isMouseOnGraphic,refCanvas4,candleSpacing,candleWidth,xLeft,graphicRef,maxVolume,priceWidth,heightV,grRef,ctx4, data,setIsPressedMain,setStartYMain,isPressedMain,startYMain,yDown,setYDown,ctx,refCanvasCurrent:refCanvas.current,dopHeight,graphic}
    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
          setWidth(clientWidth)
        }
      };
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => {
          window.removeEventListener("resize", resizeHandler);
        };
    }, [ canvas3Element,grRef,data,xLeft]);

  useEffect(()=>{
    if(container && data.length!==0){
      let scrollCandle=xLeft>=0 ? 0 : Math.abs(xLeft/(candleWidth+candleSpacing))
      let thatMaxVolume=Math.max(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[5])));
      let thatMinVolume=Math.min(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[5])));
      setMaxVolume(()=>thatMaxVolume)
      setMinVolume(()=>thatMinVolume)
    
          if(ctx && refCanvas.current && ctx2 && refCanvas2.current && canvas3Element){
            ctx.clearRect( 0 , 0 , refCanvas.current.width , heightV  );
            DrawVolume(ctx,refCanvas.current,data, thatMaxVolume,xLeft,candleWidth, candleSpacing, dopHeight,yDown)
            ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
            DrawMaxAndMinVolume(ctx2, refCanvas2.current, thatMaxVolume, thatMinVolume,priceWidth,dopHeight,yDown)
          }  
        
    }
  },[xLeft,width,howCandleInRange,startCandle, heightV,data])
  useEffect(()=>{
    if(graphicRef.current){
      setWidth(graphicRef.current.clientWidth-priceWidth)
    }
  },[priceWidth])
  const handleMouseDown=(e:MouseEvent)=>{
    e.preventDefault();
    setIsPressed(()=>true)
    setStartY((prev)=>e.clientY)
  }
  const handleMouseMove=(e:MouseEvent)=>{
    e.preventDefault();
    if(isPressed && refCanvas.current){
      const deltaY = startY-e.clientY;
      const newY=dopHeight+deltaY
      if(newY>15 && ctx && refCanvas2.current && ctx2){
        setDopHeight(()=>newY)
        ctx.clearRect( 0 , 0 , refCanvas.current.width , heightV  );
        DrawVolume(ctx,refCanvas.current,data, maxVolume,xLeft,candleWidth, candleSpacing, dopHeight,yDown)
        ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
        DrawMaxAndMinVolume(ctx2, refCanvas2.current, maxVolume, minVolume,priceWidth,dopHeight,yDown)
      }
      setStartY((prev)=>e.clientY)
    }
  }
  const handleMouseUp=(e:MouseEvent)=>{
    e.preventDefault();
    setIsPressed(()=>false)
    setStartY((prev)=>0)
  }
  
  useEffect(()=>{
    document.addEventListener('mouseup', handleMouseUp as any)
    return () => {
      refCanvas4.current?.removeEventListener('mousedown', handleMouseDown as  any)
      refCanvas4.current?.removeEventListener('mousemove', handleMouseMove as  any)
      document.removeEventListener('mouseup', handleMouseMove as  any)
    }; 
},[isPressed])
const dbClickSetGraph=()=>{
  setDopHeight(()=>heightV)
  setYDown(()=>0)
  if(ctx && refCanvas.current && refCanvas2.current && ctx2){
    ctx.clearRect( 0 , 0 , refCanvas.current.width , heightV  );
    DrawVolume(ctx,refCanvas.current,data, maxVolume,xLeft,candleWidth, candleSpacing, heightV,0)
    ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
    DrawMaxAndMinVolume(ctx2, refCanvas2.current, maxVolume, minVolume,priceWidth,heightV,0)
  }
}
  return (
    <>
      <Resizer heightV={heightV} setHeightM={setHeightM} heightM={heightM} dopHeightCanvas={dopHeightCanvas} setDopHeightCanvas={setDopHeightCanvas} dopHeight={dopHeight} setHeightV={setHeightV} setDopHeight={setDopHeight} refContainer={refContainer} graphicRef={graphicRef}/> 
      <CrosshairVolume {...propsToCrosshairCanvas} ref={volumeRef}/>
      <div className={styles.wrapVolume} style={{width:graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth : undefined, height:heightV}}>
        <div ref={refContainer} className={styles.wrap} style={{width:graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined, height:heightV}}>
            <canvas width={graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined} height={heightV} ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
        </div>
        <canvas ref={refCanvas2} width={priceWidth} height={heightV+4}  className={styles.canvas2} id='dop_canvas'></canvas>
        <canvas onMouseDown={(e:MouseEvent)=>handleMouseDown(e)} onDoubleClick={dbClickSetGraph} onMouseMove={(e:MouseEvent)=>handleMouseMove(e)}  ref={refCanvas4} className={styles.canvas4} width={priceWidth}  height={heightV}></canvas>
      </div>
    </>
  )
}
