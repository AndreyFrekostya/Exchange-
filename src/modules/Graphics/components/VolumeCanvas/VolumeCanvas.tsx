import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawVolume } from './helpers/DrawVolume'
import { DrawVolumeFunc } from './helpers/DrawVolumeFunc'
import { DrawMaxAndMinVolume } from './helpers/DrawMaxAndMinVolume'
import { IMainCanvas } from '../MainCanvas/MainCanvas'
import { DrawCrosshairVolume } from './helpers/DrawCrosshairVolume'
import { DrawInfoVolume } from './helpers/DrawInfoVolume'

const VolumeCanvas:React.FC<IMainCanvas> = ({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic, grRef,fulfieldGraphicRefAndVolume, setHeightM, heightM, heightV, setHeightV}) => {
    const [maxVolume, setMaxVolume]=useState<number>(0)
    const [minVolume, setMinVolume]=useState<number>(0)  
    const refTop=useRef<HTMLDivElement | null>(null)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth : undefined)
    const [b_drawMouseOverlay, setB_drawMouseOverlay]=useState<boolean>(false)
    const [yMouse, setYMouse]=useState<number>(0) 
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refCanvas2=useRef<HTMLCanvasElement>(null)
    const refCanvas3=useRef<HTMLCanvasElement>(null)
    const refCanvas4=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=refCanvas2.current?.getContext('2d')
    const ctx3=refCanvas3.current?.getContext('2d')
    const ctx4=refCanvas4.current?.getContext('2d')
    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
          setWidth(clientWidth)
        }
      };
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        if( refCanvas3.current ){
          fulfieldGraphicRefAndVolume(undefined,refCanvas3.current)
        }
        return () => {
          window.removeEventListener("resize", resizeHandler);
        };
    }, [ctx3, refCanvas3.current,grRef,data,xLeft]);

  useEffect(()=>{
    if(container && data.length!==0){
      let thatMaxVolume=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[5])));
      let thatMinVolume=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[5])));
      setMaxVolume(()=>thatMaxVolume)
      setMinVolume(()=>thatMinVolume)
        requestAnimationFrame(() => {
          if(ctx && refCanvas.current && ctx2 && refCanvas2.current && ctx3 && refCanvas3.current){
            ctx.clearRect( 0 , 0 , refCanvas.current.width , heightV  );
            DrawVolume(ctx,refCanvas.current,data, thatMaxVolume,xLeft-2.5,candleWidth, candleSpacing)
            ctx2.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  )
            DrawMaxAndMinVolume(ctx2, refCanvas2.current, thatMaxVolume, thatMinVolume)
          }  
        })
    }
  },[xLeft,width, data,howCandleInRange,startCandle, heightV,])
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
          let range=0
          if(graphicRef.current?.clientHeight){
            range=graphicRef.current?.clientHeight-180<70 ? 70 : 0
          }
          if(refCanvas.current && refCanvas2.current && refCanvas3.current &&refContainer.current && refTop.current && graphicRef.current ){
              if(heightd-1<42){
                setHeightV(() => {
                  return 42
                });
                refTop.current.style.top = `${graphicRef.current.clientHeight-77}px`;
              }else if(heightd+1>graphicRef.current?.clientHeight-180+range){
                setHeightV(()=>{
                  if(graphicRef.current?.clientHeight!==undefined){
                    return graphicRef.current?.clientHeight-180+range
                  }else{
                    return 0
                  }
                })
                refTop.current.style.top = `${graphicRef.current.clientHeight-(graphicRef.current.clientHeight-145+range)}px`;
              }else{
                setHeightV(()=>heightd)
                setHeightM(()=>{
                  if(graphicRef.current?.clientHeight){
                    return graphicRef.current?.clientHeight-heightd-70
                  }else{
                    return 0
                  }
                })
                refTop.current.style.top = `${graphicRef.current.clientHeight-heightd-33}px`;
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
  }, [heightV]);
  const handleCrosshair=(e:any)=>{
    setB_drawMouseOverlay(true)
    setIsMouseOnGraphic({...isMouseOnGraphic, x:e.clientX,q:false})
    if(ctx3 && refCanvas3.current && ctx4 &&  refCanvas4.current){
      let y=e.clientY-refCanvas3.current.getBoundingClientRect().top
      DrawCrosshairVolume(ctx3,refCanvas3.current,data,candleWidth,candleSpacing,Math.abs(xLeft/(candleSpacing+candleWidth)),isMouseOnGraphic.x,isMouseOnGraphic.q,grRef,e.clientX,e.offsetY,xLeft, e.offsetX)
      DrawInfoVolume(ctx4,refCanvas4.current,y, maxVolume)
      setYMouse(()=>y)
    }
  }
  const handleCrosshairLeave=()=>{
    setB_drawMouseOverlay(false)
    setIsMouseOnGraphic({...isMouseOnGraphic, x:-200, y:-200, q:false})
    if(refCanvas3.current && refCanvas4.current){
      ctx3?.clearRect(0,0,refCanvas3.current.width,refCanvas3.current.height)
      ctx4?.clearRect(0,0,refCanvas4.current.width,refCanvas4.current.height)
    }
  }
  useEffect(()=>{
    refCanvas3.current?.addEventListener('mousemove', handleCrosshair)
    refCanvas3.current?.addEventListener('mouseleave', handleCrosshairLeave)
    return ()=>{
      refCanvas3.current?.removeEventListener('mousemove', handleCrosshair)
      refCanvas3.current?.removeEventListener('mouseleave', handleCrosshairLeave)
    }

  },[xLeft, candleSpacing, candleWidth, maxVolume])
  return (
    <>
      <div className={styles.resizer} ref={refTop}></div>
      <canvas className={styles.canvas3} ref={refCanvas3} width={ width ? width-66 : undefined} id='wrap_volume' height={heightV}></canvas>
      <div ref={refContainer} className={styles.wrap} style={{width: width ? width-66 : undefined, height:heightV}}>
          <canvas width={ width ? width-66 : undefined} height={heightV} ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
      </div>
      <canvas ref={refCanvas2} width='63px' height={heightV+4}  className={styles.canvas2} id='dop_canvas'></canvas>
      <canvas  ref={refCanvas4} className={styles.canvas4} width='63px'  height={heightV}></canvas>
    </>
  )
}

export default VolumeCanvas