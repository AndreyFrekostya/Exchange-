import React, { FC, MouseEvent, forwardRef, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { DrawCrosshairVolume } from '../../helpers/DrawCrosshairVolume'
import { DrawInfoVolume } from '../../helpers/DrawInfoVolume'
import { CrosshairVolumeProps } from '../../interfaces/VolumeCanvasInterfaces'
import { DrawVolume } from '../../helpers/DrawVolume'
import { DrawMaxAndMinVolume } from '../../helpers/DrawMaxAndMinVolume'
const CrosshairVolume = forwardRef<HTMLCanvasElement,CrosshairVolumeProps>(({setIsMouseOnGraphic, isMouseOnGraphic, ctx4, refCanvas4, data,candleWidth,candleSpacing,xLeft,graphicRef,maxVolume,priceWidth,heightV,grRef,setIsPressedMain,setStartYMain,isPressedMain,startYMain,yDown,setYDown,ctx,refCanvasCurrent,dopHeight,minVolume,refDop,ctx2},ref) => {
  const crosshairContainer = ref && 'current' in ref ? ref.current : null;  
  const ctx3=crosshairContainer?.getContext('2d')
  const handleCrosshair=(e:any)=>{
        setIsMouseOnGraphic({...isMouseOnGraphic, x:e.clientX,q:false})
        if(ctx3 && crosshairContainer && ctx4 &&  refCanvas4.current){
          let y=e.clientY-crosshairContainer.getBoundingClientRect().top
          let scrolledCandle=xLeft >=0 ? -Math.abs(xLeft/(candleSpacing+candleWidth)) : Math.abs(xLeft/(candleSpacing+candleWidth))
          DrawCrosshairVolume(ctx3,crosshairContainer,data,candleWidth,candleSpacing,scrolledCandle,isMouseOnGraphic.x,isMouseOnGraphic.q,grRef,e.clientX,y,xLeft, e.offsetX)
          DrawInfoVolume(ctx4,refCanvas4.current,y, maxVolume,priceWidth,dopHeight, yDown)
        }
      }
      const handleCrosshairLeave=()=>{
        setIsMouseOnGraphic({...isMouseOnGraphic, x:-200, y:-200, q:false})
        if(crosshairContainer && refCanvas4.current){
          ctx3?.clearRect(0,0,crosshairContainer.width,crosshairContainer.height)
          ctx4?.clearRect(0,0,refCanvas4.current.width,refCanvas4.current.height)
        }
      }
      useEffect(()=>{
        crosshairContainer?.addEventListener('mousemove', handleCrosshair)
        crosshairContainer?.addEventListener('mouseleave', handleCrosshairLeave)
        return ()=>{
          crosshairContainer?.removeEventListener('mousemove', handleCrosshair)
          crosshairContainer?.removeEventListener('mouseleave', handleCrosshairLeave)
        }
    
      },[xLeft, candleSpacing, candleWidth, maxVolume,priceWidth,dopHeight,yDown])
      const handleMouseDownMain=(e:MouseEvent)=>{
        e.preventDefault();
        setIsPressedMain(()=>true)
        setStartYMain((prev)=>e.clientY)
      }
      const handleMouseMoveMain=(e:MouseEvent)=>{
        e.preventDefault();
        if(isPressedMain && dopHeight!==heightV){
          const deltaY = startYMain-e.clientY;
          const newY=yDown+deltaY
          setYDown(()=>newY)
          if(ctx && refCanvasCurrent && refDop &&ctx2){
            ctx.clearRect( 0 , 0 , refCanvasCurrent.width , heightV  );
            DrawVolume(ctx,refCanvasCurrent,data, maxVolume,xLeft,candleWidth, candleSpacing, dopHeight,yDown)
            ctx2.clearRect( 0 , 0 , refDop.width , refDop.height  )
            DrawMaxAndMinVolume(ctx2, refDop, maxVolume, minVolume,priceWidth,dopHeight,yDown)
          }
        }
        setStartYMain((prev)=>e.clientY)
      }
      const handleMouseUpMain=(e:MouseEvent)=>{
        setIsPressedMain(()=>false)
        setStartYMain((prev)=>0)
      }
      useEffect(()=>{
        document.addEventListener('mouseup', handleMouseUpMain as any)
        return () => {
          crosshairContainer?.removeEventListener('mousedown', handleMouseDownMain as  any)
          crosshairContainer?.removeEventListener('mousemove', handleMouseMoveMain as  any)
          document.removeEventListener('mouseup', handleMouseUpMain as  any)
        }; 
    },[isPressedMain])
  return (
    <canvas className={styles.canvas3} onMouseDown={(e:MouseEvent)=>handleMouseDownMain(e)} onMouseMove={(e:MouseEvent)=>handleMouseMoveMain(e)} ref={ref} width={ graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined} id='wrap_volume' height={heightV}></canvas>
  )
})

export default CrosshairVolume