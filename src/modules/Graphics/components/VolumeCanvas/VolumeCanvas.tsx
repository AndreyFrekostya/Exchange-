import React, { RefObject, useEffect, useRef, useState } from 'react'
import { CanvasGraphicStart } from '../../helpers/CanvasGraphicStart'
import styles from './styles.module.css'
import { DrawVolume } from './helpers/DrawVolume'
import { DrawVolumeFunc } from './helpers/DrawVolumeFunc'
import { DrawMaxAndMinVolume } from './helpers/DrawMaxAndMinVolume'
interface IVolumeCanvas{
    graphicRef:RefObject<HTMLDivElement>,
    data:string[][],
    scrollLeft:number
}
const VolumeCanvas:React.FC<IVolumeCanvas> = ({graphicRef,data, scrollLeft}) => {
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refCanvas2=useRef<HTMLCanvasElement>(null)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth : undefined)
    const refContainer=useRef<HTMLDivElement>(null)
    const [howCandleInRange, setHowCandleInRange]=useState<number>(0) 
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
          let candles=Math.round(container.clientWidth/3)
          if(data.length<candles){
            setHowCandleInRange((prev)=>data.length)
          }else{
            setHowCandleInRange((prev)=>candles)
          }
          let thatMaxVolume=Math.max(...data.slice(data.length-howCandleInRange,data.length).map((d)=>Number(d[5])));
          let thatMinVolume=Math.min(...data.slice(data.length-howCandleInRange,data.length).map((d)=>Number(d[5])));
          setMaxVolume(()=>thatMaxVolume)
          setMinVolume(()=>thatMinVolume)
          const ctx=refCanvas.current.getContext('2d')
          if(ctx && data.length!==0 && refContainer.current && ctx2 && refCanvas2.current){
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
              DrawVolume(ctx,refCanvas.current, refContainer.current,data, thatMaxVolume)
              ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
              DrawMaxAndMinVolume(ctx2, refCanvas2.current, thatMaxVolume, thatMinVolume)
          }
      }
      },[ width, data,howCandleInRange])

  useEffect(()=>{
    if(container){
      container.scrollLeft=scrollLeft
      let candleScrolled=scrollLeft/3.7
      let thatMaxVolume=Math.max(...data.slice(candleScrolled,candleScrolled+howCandleInRange).map((d)=>Number(d[5])));
      let thatMinVolume=Math.min(...data.slice(candleScrolled,candleScrolled+howCandleInRange).map((d)=>Number(d[5])));
      setMaxVolume(()=>thatMaxVolume)
      setMinVolume(()=>thatMinVolume)
      if(thatMaxVolume!==maxVolume || thatMinVolume!==minVolume ){
        if(ctx && refCanvas.current && ctx2 && refCanvas2.current){
          ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
          DrawVolumeFunc(ctx,data,1.5,thatMaxVolume,1.7,)
          ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
          DrawMaxAndMinVolume(ctx2, refCanvas2.current, thatMaxVolume, thatMinVolume)
        }
      }
    }
  },[scrollLeft])
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