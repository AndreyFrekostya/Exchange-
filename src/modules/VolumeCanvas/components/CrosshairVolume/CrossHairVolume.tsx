import React, { FC, forwardRef, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { DrawCrosshairVolume } from '../../helpers/DrawCrosshairVolume'
import { DrawInfoVolume } from '../../helpers/DrawInfoVolume'
import { CrosshairVolumeProps } from '../../interfaces/VolumeCanvasInterfaces'
const CrosshairVolume = forwardRef<HTMLCanvasElement,CrosshairVolumeProps>(({setIsMouseOnGraphic, isMouseOnGraphic, ctx4, refCanvas4, data,candleWidth,candleSpacing,xLeft,graphicRef,maxVolume,priceWidth,heightV,grRef},ref) => {
  const crosshairContainer = ref && 'current' in ref ? ref.current : null;  
  const ctx3=crosshairContainer?.getContext('2d')
  const handleCrosshair=(e:any)=>{
        setIsMouseOnGraphic({...isMouseOnGraphic, x:e.clientX,q:false})
        if(ctx3 && crosshairContainer && ctx4 &&  refCanvas4.current){
          let y=e.clientY-crosshairContainer.getBoundingClientRect().top
          let scrolledCandle=xLeft >=0 ? -Math.abs(xLeft/(candleSpacing+candleWidth)) : Math.abs(xLeft/(candleSpacing+candleWidth))
          DrawCrosshairVolume(ctx3,crosshairContainer,data,candleWidth,candleSpacing,scrolledCandle,isMouseOnGraphic.x,isMouseOnGraphic.q,grRef,e.clientX,y,xLeft, e.offsetX)
          DrawInfoVolume(ctx4,refCanvas4.current,y, maxVolume,priceWidth)
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
    
      },[xLeft, candleSpacing, candleWidth, maxVolume,priceWidth])

  return (
    <canvas className={styles.canvas3} ref={ref} width={ graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined} id='wrap_volume' height={heightV}></canvas>
  )
})

export default CrosshairVolume