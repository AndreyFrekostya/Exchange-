import React, { MouseEvent, RefObject, WheelEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CanvasGraphicStart } from '../../helpers/CanvasGraphicStart'
import { IGraphic } from '../../../../pages/MainPage/slices/GraphicSlice'
import { DrawCandleFunc } from '../../helpers/DrawCandleFunc'
import { DrawScliceCanvas } from '../../helpers/DrawSliceCanvas'
interface IMainCanvas{
    graphicRef:RefObject<HTMLDivElement>,
    data:string[][],
    setScrollLeft:(arg:number)=>void
}

const MainCanvas:React.FC<IMainCanvas> = ({graphicRef,data,setScrollLeft}) => {
    const [height, setHeight]=useState<number | undefined>(graphicRef.current?.clientHeight ? graphicRef.current?.clientHeight-142 : undefined)
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const refCanvasCrossHair=useRef<HTMLCanvasElement>(null)
    const crosshairContainer=refCanvasCrossHair.current
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth-64 : undefined)
    const [maxPrice, setMaxPrice]=useState<number>(0)
    const [minPrice, setMinPrice]=useState<number>(0)
    const [startX, setStartX]=useState<number>(0)
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=refCanvasCrossHair.current?.getContext('2d')
    const [isPressed, setIsPressed]=useState<boolean>(false)
    const [howCandleInRange, setHowCandleInRange]=useState<number>(0)
    const [candleWidth, setCandleWidth]=useState<number>(5)
    const [candleSpacing, setCandleSpacing]=useState<number>(2)
    const  handleMouseDown=(e:MouseEvent)=>{
      e.preventDefault();
      if(crosshairContainer){
        crosshairContainer.style.cursor='pointer';
      }     
      setIsPressed(true)
      setStartX((prev)=>e.clientX)
    }
    const  handleMouseMove=(event:MouseEvent)=> {
        event.preventDefault();
        if(container && isPressed){
          setStartX((prev)=>event.clientX)
          handleScrolling(event.clientX)
          let scrollCandle=container.scrollLeft/(candleWidth+2)
          let thatMinPrice=Math.min(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[3])));
          let thatMaxPrice=Math.max(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[2])));
          let priceRange = thatMaxPrice - thatMinPrice;
          if(thatMaxPrice!==maxPrice || thatMinPrice!==minPrice){
            if(ctx && refCanvas.current){
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
             
              requestAnimationFrame(() => {
                if(refCanvas.current){
                  DrawCandleFunc(ctx,data,data.length*(candleWidth+2)-30,candleWidth,thatMaxPrice,priceRange,refCanvas.current.height-40,candleSpacing)
                }
              });
              setMaxPrice(()=>thatMaxPrice)
              setMinPrice(()=>thatMinPrice)
            }
          } 
        }
    }
    const handleMouseUp=(event:MouseEvent) =>{
        event.preventDefault();
        setStartX((prev)=>0)
        setIsPressed((prev)=>false)
        if(crosshairContainer){
          crosshairContainer.style.cursor='crosshair'
        }
    }
    const HandleWheel=(e:WheelEvent<HTMLCanvasElement>)=>{
      if (e.deltaY < 0) {
        setCandleWidth((prev)=>prev+1)
        setCandleSpacing((prev)=>prev+0.3)
      } else {
        setCandleWidth((prev)=>prev-1)
        setCandleSpacing((prev)=>prev-0.3)
      }
      if(candleWidth<1){
        setCandleWidth(()=>1)
      }else if(candleWidth>30){
        setCandleWidth(()=>30)
      }
      if(candleSpacing<0.3){
        setCandleSpacing(0.3)
      }else if(candleSpacing>10){
        setCandleSpacing(12)
      }
      if(ctx && refCanvas.current && container && ctx2 && refCanvasCrossHair.current ){
        let allWidth=candleWidth+candleSpacing
        let candles=Math.round(container.clientWidth/allWidth)
        console.log(candles, howCandleInRange)
        setHowCandleInRange(()=>candles)
        let scrollCandle=container.scrollLeft/allWidth
        let thatMinPrice=Math.min(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[3])));
        let thatMaxPrice=Math.max(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[2])));
        ctx.clearRect( container.scrollLeft-container.clientWidth , 0 , container.clientWidth*2, refCanvas.current.height  );
        DrawScliceCanvas(ctx, refCanvas.current, data, refContainer.current, thatMaxPrice, thatMinPrice, candleWidth, candleSpacing,candles)
      }
    }
    const resizeHandler = () => {
        const { clientHeight, clientWidth } = graphicRef.current || {};
        if(clientHeight && clientWidth){
          setHeight(clientHeight-142)
          setWidth(clientWidth-64)
        }
      };
      
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
          document.addEventListener('mouseup', handleMouseUp as  any)
        return () => {
          window.removeEventListener("resize", resizeHandler);
          if(crosshairContainer){
            crosshairContainer.removeEventListener('mousedown', handleMouseDown as  any)
            crosshairContainer.removeEventListener('mousemove', handleMouseMove as  any)
            document.removeEventListener('mouseup', handleMouseUp as  any)
          }
        };
      }, [crosshairContainer,data]);
      useEffect(()=>{
        if(refCanvas.current && refCanvasCrossHair.current){
          if(ctx && data.length!==0 && ctx2 && container){
              let candles=Math.round(container.clientWidth/7)
              if(data.length<candles){
                setHowCandleInRange((prev)=>data.length)
                candles=data.length
              }else{
                setHowCandleInRange((prev)=>candles)
              }
              let thatMinPrice=Math.min(...data.slice(data.length-candles,data.length).map((d)=>Number(d[3])));
              let thatMaxPrice=Math.max(...data.slice(data.length-candles,data.length).map((d)=>Number(d[2])));
              setMaxPrice(()=>thatMaxPrice)
              setMinPrice(()=>thatMinPrice)
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
              CanvasGraphicStart(ctx,refCanvas.current,ctx2,refCanvasCrossHair.current,data,refContainer, thatMaxPrice, thatMinPrice,candleWidth,candleSpacing)
          }
      }
      },[height, width,data])

      const handleScrolling=useCallback((newStart:number)=>{
        const deltaX = startX-newStart;
        if(container && isPressed ){
          container.scrollLeft = container.scrollLeft +deltaX;
          setScrollLeft(container.scrollLeft)
        }
      },[startX, width, height, isPressed])
  return (
    <>  
      <canvas onMouseDown={(e:MouseEvent)=>handleMouseDown(e)}
        onMouseMove={(e:MouseEvent)=>handleMouseMove(e)}
        onWheel = {(e:WheelEvent<HTMLCanvasElement>) => HandleWheel(e)}
       ref={refCanvasCrossHair} style={{zIndex:'6'}} className={styles.canvas} width={width} height={height? height+41 : undefined} id='crosshair_canvas'>
      </canvas>
      <div className={styles.wrap} ref={refContainer} style={{width: graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-64 : undefined, height: height}}id='main_canvas'>
        <canvas width={width} height={height} ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
      </div>
    </>
  )
}

export default MainCanvas