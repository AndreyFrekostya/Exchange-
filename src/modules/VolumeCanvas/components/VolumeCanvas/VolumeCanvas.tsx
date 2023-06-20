import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawVolume } from '../../helpers/DrawVolume'
import { DrawMaxAndMinVolume } from '../../helpers/DrawMaxAndMinVolume'
import { DrawCrosshairVolume } from '../../helpers/DrawCrosshairVolume'
import { DrawInfoVolume } from '../../helpers/DrawInfoVolume'
import Resizer from '../Resizer/Resizer'
import { ICanvasVolume } from '../../interfaces/VolumeCanvasInterfaces'
import CrosshairVolume from '../CrosshairVolume/CrossHairVolume'

export const VolumeCanvas:React.FC<ICanvasVolume> = ({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic, grRef,fulfieldGraphicRefAndVolumeAndPrice, setHeightM, heightM, heightV, setHeightV,priceWidth, volumeRef}) => {
    const [maxVolume, setMaxVolume]=useState<number>(0)
    const [minVolume, setMinVolume]=useState<number>(0)  
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
    const propsToCrosshairCanvas={setIsMouseOnGraphic,isMouseOnGraphic,refCanvas4,candleSpacing,candleWidth,xLeft,graphicRef,maxVolume,priceWidth,heightV,grRef,ctx4, data}
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
      let thatMaxVolume=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[5])));
      let thatMinVolume=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[5])));
      setMaxVolume(()=>thatMaxVolume)
      setMinVolume(()=>thatMinVolume)
        requestAnimationFrame(() => {
          if(ctx && refCanvas.current && ctx2 && refCanvas2.current && canvas3Element){
            ctx.clearRect( 0 , 0 , refCanvas.current.width , heightV  );
            DrawVolume(ctx,refCanvas.current,data, thatMaxVolume,xLeft,candleWidth, candleSpacing)
            ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
            DrawMaxAndMinVolume(ctx2, refCanvas2.current, thatMaxVolume, thatMinVolume,priceWidth)
          }  
        })
    }
  },[xLeft,width,howCandleInRange,startCandle, heightV])
  useEffect(()=>{
    if(graphicRef.current){
      setWidth(graphicRef.current.clientWidth-priceWidth)
    }
  },[priceWidth])
  return (
    <>
      <Resizer heightV={heightV} setHeightM={setHeightM} setHeightV={setHeightV} refContainer={refContainer} graphicRef={graphicRef}/> 
      <CrosshairVolume {...propsToCrosshairCanvas} ref={volumeRef}/>
      <div className={styles.wrapVolume} style={{width:graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth : undefined, height:heightV}}>
        <div ref={refContainer} className={styles.wrap} style={{width:graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined, height:heightV}}>
            <canvas width={graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined} height={heightV} ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
        </div>
        <canvas ref={refCanvas2} width={priceWidth} height={heightV+4}  className={styles.canvas2} id='dop_canvas'></canvas>
        <canvas  ref={refCanvas4} className={styles.canvas4} width={priceWidth}  height={heightV}></canvas>
      </div>
    </>
  )
}
