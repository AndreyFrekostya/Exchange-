import React, { RefObject, useEffect, useRef, useState } from 'react'
import { CanvasGraphicStart } from '../../helpers/CanvasGraphicStart'
import styles from './styles.module.css'
import { DrawVolume } from './helpers/DrawVolume'
import { DrawVolumeFunc } from './helpers/DrawVolumeFunc'
import { DrawMaxAndMinVolume } from './helpers/DrawMaxAndMinVolume'
import { IMainCanvas } from '../MainCanvas/MainCanvas'
import { DrawCrosshairVolume } from './helpers/DrawCrosshairVolume'

const VolumeCanvas:React.FC<IMainCanvas> = ({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic, grRef,fulfieldGraphicRefAndVolume, setHeightM, heightM}) => {
    const [maxVolume, setMaxVolume]=useState<number>(0)
    const [minVolume, setMinVolume]=useState<number>(0)  
    const refTop=useRef<HTMLDivElement | null>(null)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth : undefined)
    const [height, setHeight]=useState<number>(70)
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refCanvas2=useRef<HTMLCanvasElement>(null)
    const refCanvas3=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=refCanvas2.current?.getContext('2d')
    const ctx3=refCanvas3.current?.getContext('2d')
    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
          setWidth(clientWidth)
        }
      };
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        if(ctx3 && refCanvas3.current ){
          if(data.length!==0){
            DrawCrosshairVolume(ctx3,refCanvas3.current,data,candleWidth,candleSpacing,Math.abs(xLeft/(candleSpacing+candleWidth)),isMouseOnGraphic.x,isMouseOnGraphic.q,grRef)
          }
          fulfieldGraphicRefAndVolume(undefined,refCanvas3.current)
        }
        return () => {
          window.removeEventListener("resize", resizeHandler);
        };
    }, [ctx3, refCanvas3.current,grRef, height,data,xLeft]);

  useEffect(()=>{
    if(container){
      let thatMaxVolume=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[5])));
      let thatMinVolume=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[5])));
      setMaxVolume(()=>thatMaxVolume)
      setMinVolume(()=>thatMinVolume)
        if(ctx && refCanvas.current && ctx2 && refCanvas2.current && ctx3 && refCanvas3.current){
          ctx.clearRect( 0 , 0 , refCanvas.current.width , height  );
          DrawVolume(ctx,refCanvas.current, refContainer.current,data, thatMaxVolume,xLeft-2.5,candleWidth, candleSpacing)
          ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
          DrawMaxAndMinVolume(ctx2, refCanvas2.current, thatMaxVolume, thatMinVolume)
        }
    }
  },[xLeft,width, data,howCandleInRange,startCandle, height])
  useEffect(() => {
    if(refTop.current!==null && refContainer.current){
        const resizeableEle = refContainer.current;
        let y = 0;
        const styles = window.getComputedStyle(resizeableEle);
        let heightd = parseInt(styles.height, 10);
        const onMouseMoveTopResize = (event:any) => {
          const dy = event.clientY - y;
          heightd = heightd - dy;
          y = event.clientY;
          setHeight(heightd)
          if(refCanvas.current && refCanvas2.current && refCanvas3.current &&refContainer.current && refTop.current && graphicRef.current ){
            if(heightd!==graphicRef.current?.clientHeight || heightd!==10){
              if(heightM!==undefined){
                setHeightM(graphicRef.current?.clientHeight-heightd-70)
              }
              refTop.current.style.top = `${graphicRef.current.clientHeight-heightd-33}px`;
              refCanvas.current.style.height = `${heightd}px`;
              refCanvas2.current.style.height = `${heightd+4}px`;
              refCanvas3.current.style.height = `${heightd}px`;
              refContainer.current.style.height = `${heightd}px`;
            }
          }
        };

        const onMouseUpTopResize = (event:any) => {
          document.removeEventListener("mousemove", onMouseMoveTopResize);
        };

        const onMouseDownTopResize = (event:any) => {
          const styles = window.getComputedStyle(resizeableEle);
          resizeableEle.style.bottom = styles.bottom;
          y = event.clientY;
          document.addEventListener("mousemove", onMouseMoveTopResize);
          document.addEventListener("mouseup", onMouseUpTopResize);
        };
        refTop.current.addEventListener("mousedown", onMouseDownTopResize);
    
        return () => {
            if(refTop.current!==null){
                refTop.current.removeEventListener("mousedown", onMouseDownTopResize); 
            }
        };
    }
  }, [height, heightM]);
  return (
    <>
      <div className={styles.resizer} ref={refTop}></div>
      <canvas className={styles.canvas3} ref={refCanvas3} width={ width ? width-66 : undefined} id='wrap_volume' height={height}></canvas>
      <div ref={refContainer} className={styles.wrap} style={{width: width ? width-66 : undefined, height:height}}>
          <canvas width={ width ? width-66 : undefined} height={height} ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
      </div>
      <canvas ref={refCanvas2} width='63px' height={height+4}  className={styles.canvas2} id='dop_canvas'></canvas>
    </>
  )
}

export default VolumeCanvas