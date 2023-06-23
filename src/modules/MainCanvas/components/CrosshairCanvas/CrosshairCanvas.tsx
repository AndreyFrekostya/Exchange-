import React, { Dispatch, MouseEvent, MutableRefObject, RefObject, SetStateAction, WheelEvent, forwardRef, useEffect, useState} from 'react'
import styles from './styles.module.css'
import { ICrosshairCanvasProps } from '../../interfaces/CanvasInterfaces';
import { DrawCandleFunc } from '../../helpers/DrawCandleFunc';
import { DrawUpdatedLinePrice } from '../../helpers/DrawUpdatedLinePrice';
const CrosshairCanvas = React.memo(forwardRef<HTMLCanvasElement, ICrosshairCanvasProps>((props, mainCanvasRef) => {
  const crosshairContainer = mainCanvasRef && 'current' in mainCanvasRef ? mainCanvasRef.current : null;
  const [startX, setStartX]=useState<number>(0)
  const  handleMouseDown=(e:MouseEvent)=>{
    e.preventDefault();
    if(crosshairContainer){
      crosshairContainer.style.cursor='pointer';
      const mouseX = e.clientX - crosshairContainer.getBoundingClientRect().left
      const mouseY = e.clientY - crosshairContainer.getBoundingClientRect().top
      if(mouseX>crosshairContainer.clientWidth-19 && mouseX<crosshairContainer.clientWidth && mouseY+10>props.isMouseClientY+40 && mouseY-10<props.isMouseClientY+40){
        props.setActive({active:!props.active.active, y:mouseY})
      }else{
        props.setActive({active:false, y:0})
      }
      const allLeft=Math.abs(props.xLeft)+(mouseX-crosshairContainer.getBoundingClientRect().left)
      const neededCandle=props.data[Math.floor(allLeft/(props.candleWidth+props.candleSpacing))]
      if(props.xLeft!<-(props.candleWidth+props.candleSpacing)*2){
        props.setPressedCandle(()=>neededCandle)
      }else{
        props.setPressedCandle(()=>undefined)
      }
    }
    props.setIsPressed(()=>true)
    setStartX((prev)=>e.clientX)
  }
  const handleMouseMove=(event:MouseEvent)=> {
    event.preventDefault();
      if(props.graphicRef.current && crosshairContainer){
        const mouseX = event.clientX - props.graphicRef.current.getBoundingClientRect().left;
        if(mouseX>crosshairContainer.clientWidth-19 && mouseX<crosshairContainer.clientWidth){
          crosshairContainer.style.cursor='pointer';
        }else if(!props.isPressed){
          crosshairContainer.style.cursor='crosshair';
        }
        props.setMouseX((prev)=>mouseX)
      }
      if(props.isPressed){
        const deltaX = startX-event.clientX;
        const newX=props.xLeft-deltaX
        const scrollCandle=Math.floor(newX/(props.candleWidth+props.candleSpacing))
        if(Math.abs(scrollCandle)<props.data.length-1){
          props.setXLeft(()=>newX)
        }
        // Redraw graph
        if(crosshairContainer){
          let scrollCandle=Math.abs(props.xLeft/(props.candleWidth+props.candleSpacing))
          let copyHowCandleInRange=props.howCandleInRange
          if(props.xLeft>=0){
            scrollCandle=0
            copyHowCandleInRange=(crosshairContainer.clientWidth-props.xLeft)/(props.candleWidth+props.candleSpacing)
          }
          let thatMinPrice=Math.min(...props.data.slice(scrollCandle,scrollCandle+copyHowCandleInRange).map((d)=>Number(d[3])));
          let thatMaxPrice=Math.max(...props.data.slice(scrollCandle,scrollCandle+copyHowCandleInRange).map((d)=>Number(d[2])));
          let priceRange = thatMaxPrice - thatMinPrice;
          if(props.ctx && props.mainCanvas){
            requestAnimationFrame(() => {
              if(props.mainCanvas && props.ctx){
                props.ctx.clearRect( 0 , 0 , props.mainCanvas.width ,props.mainCanvas.height  );
                DrawCandleFunc(props.ctx,props.data,props.mainCanvas.width,props.candleWidth,thatMaxPrice,priceRange,props.mainCanvas.height-40,props.candleSpacing,props.data.length, 0,props.xLeft)
                DrawUpdatedLinePrice(props.ctx,props.data[props.data.length-1],props.mainCanvas.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,props.xLeft,props.mainCanvas.width)
              }
            });
            props.ctx.clearRect(props.mainCanvas.width, 0,props.mainCanvas.width, props.mainCanvas.height) 
            props.ctx.clearRect(props.mainCanvas.width,0,props.mainCanvas.width,props.mainCanvas.height)
            props.setMaxPrice(()=>thatMaxPrice)
            props.setMinPrice(()=>thatMinPrice)
            props.setStartCandle(scrollCandle)
          }
        }
        setStartX((prev)=>event.clientX)
      }
  }
  const handleMouseUp=(event:MouseEvent) =>{
    event.preventDefault();
    setStartX((prev)=>0)
    props.setMouseX((prev)=>0)
    props.setIsPressed((prev)=>false)
    if(props.graphicRef.current &&crosshairContainer){
      const mouseX = event.clientX - props.graphicRef.current.getBoundingClientRect().left;
      if(mouseX>crosshairContainer.clientWidth-19 && mouseX<crosshairContainer.clientWidth){
        crosshairContainer.style.cursor='pointer';
      }else{
        crosshairContainer.style.cursor='crosshair';
      }
    }
  }
  const HandleWheel=(e:WheelEvent<HTMLCanvasElement>)=>{
    let candleWidthPrev:number=props.candleWidth
    let candleSpacingPrev:number=props.candleSpacing
    if (e.deltaY < 0) {
      if(props.candleWidth===1 && props.candleSpacing<0.8){
        
        props.setCandleSpacing(candleSpacingPrev+0.2)
        props.setIfPlus(true)
      }else if(props.candleWidth+2!==41 && props.candleSpacing+0.2!==4){
        props.setCandleWidth(candleWidthPrev+2)
        props.setCandleSpacing(candleSpacingPrev+0.2)
        props.setIfPlus(true)
      }
    } else {
      if(props.candleWidth-2!==-1 && props.candleSpacing-0.2!==-0.4){
        props.setCandleWidth(candleWidthPrev-2)
        props.setCandleSpacing(candleSpacingPrev-0.2)
        props.setIfPlus(false)
      }
      if(props.candleWidth===1 && props.candleSpacing-0.2!>0.2){
        props.setCandleSpacing(candleSpacingPrev-0.2)
        props.setIfPlus(false)
      }
    }
  }
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp as  any)
    return () => {
      if(crosshairContainer){
        crosshairContainer.removeEventListener('mousedown', handleMouseDown as  any)
        crosshairContainer.removeEventListener('mousemove', handleMouseMove as  any)
        document.removeEventListener('mouseup', handleMouseUp as  any)
      }
    };
  }, [crosshairContainer,props.data,props.heightM]);
  return (
    <canvas onMouseDown={(e:MouseEvent)=>handleMouseDown(e)}
      onMouseMove={(e:MouseEvent)=>handleMouseMove(e)}
      onWheel = {(e:WheelEvent<HTMLCanvasElement>) => HandleWheel(e)}
      ref={mainCanvasRef} style={{zIndex:'6'}} className={styles.canvas2} width={props.graphicRef.current?.clientWidth ? props.graphicRef.current?.clientWidth-props.priceWidth : undefined} height={props.heightM? props.heightM+41 : undefined}>
    </canvas>
  )
}))

export default CrosshairCanvas