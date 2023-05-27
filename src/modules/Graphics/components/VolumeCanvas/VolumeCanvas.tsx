import React, { RefObject, useEffect, useRef, useState } from 'react'
import { CanvasGraphicStart } from '../../helpers/CanvasGraphicStart'
import styles from './styles.module.css'
import { DrawVolume } from './helpers/DrawVolume'
import { DrawVolumeFunc } from './helpers/DrawVolumeFunc'
import { DrawMaxAndMinVolume } from './helpers/DrawMaxAndMinVolume'
import { IMainCanvas } from '../MainCanvas/MainCanvas'

const VolumeCanvas:React.FC<IMainCanvas> = ({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing}) => {
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refCanvas2=useRef<HTMLCanvasElement>(null)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth : undefined)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=refCanvas2.current?.getContext('2d')
    const [maxVolume, setMaxVolume]=useState<number>(0)
    const [minVolume, setMinVolume]=useState<number>(0)
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
      }, []);
      useEffect(()=>{
        if(refCanvas.current && container){
          let candles=Math.round(container.clientWidth/(candleWidth+candleSpacing))
          let thatMaxVolume=Math.max(...data.slice(data.length-candles,data.length).map((d)=>Number(d[5])));
          let thatMinVolume=Math.min(...data.slice(data.length-candles,data.length).map((d)=>Number(d[5])));
          setMaxVolume(()=>thatMaxVolume)
          setMinVolume(()=>thatMinVolume)
          if(ctx && data.length!==0 && refContainer.current && ctx2 && refCanvas2.current){
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
              DrawVolume(ctx,refCanvas.current, refContainer.current,data, thatMaxVolume,xLeft,candleWidth, candleSpacing)
              ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
              DrawMaxAndMinVolume(ctx2, refCanvas2.current, thatMaxVolume, thatMinVolume)
          }
      }
      },[ width, data,howCandleInRange])

  useEffect(()=>{
    if(container){
      let thatMaxVolume=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[5])));
      let thatMinVolume=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[5])));
      setMaxVolume(()=>thatMaxVolume)
      setMinVolume(()=>thatMinVolume)
        if(ctx && refCanvas.current && ctx2 && refCanvas2.current){
          ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
          DrawVolume(ctx,refCanvas.current, refContainer.current,data, thatMaxVolume,xLeft,candleWidth, candleSpacing)
          ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
          DrawMaxAndMinVolume(ctx2, refCanvas2.current, thatMaxVolume, thatMinVolume)
        }
      
    }
  },[xLeft])
  return (
    <>
      <canvas className={styles.canvas3} width={container?.clientWidth} height='70px'></canvas>
      <div ref={refContainer} className={styles.wrap} style={{width: width ? width-66 : undefined, height:'70px'}}>
          <canvas width={width} height='70px' ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
      </div>
      <canvas ref={refCanvas2} width='63px' height='74px'  className={styles.canvas2} id='dop_canvas'></canvas>
    </>
  )
}

export default VolumeCanvas