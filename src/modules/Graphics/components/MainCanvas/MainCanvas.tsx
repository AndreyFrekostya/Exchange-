import React, { Dispatch, MouseEvent, MutableRefObject, RefObject, SetStateAction, WheelEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CanvasGraphicStart } from '../../helpers/CanvasGraphicStart'
import { IGraphic } from '../../../../pages/MainPage/slices/GraphicSlice'
import { DrawCandleFunc } from '../../helpers/DrawCandleFunc'
import { DrawCrosshairCanvas } from '../../helpers/DrawCrosshairCanvas'
export interface IMainCanvas{
    graphicRef:RefObject<HTMLDivElement>,
    data:string[][],
    howCandleInRange:number,
    setHowCandleInRange:(arg:number)=>void,
    candleWidth:number, 
    setCandleWidth:(arg:number)=>void,
    xLeft:number ,
    setXLeft:(arg:number)=>void,
    startCandle:number ,
    setStartCandle:(arg:number)=>void,
    candleSpacing:number,
    setCandleSpacing:(arg:number)=>void,
    setIsMouseOnGraphic:Dispatch<SetStateAction<{ x: number; q: boolean; }>>,
    isMouseOnGraphic:{x:number, q:boolean},
    voRef?:MutableRefObject<HTMLCanvasElement | null>,
    grRef?:MutableRefObject<HTMLCanvasElement | null>,
    fulfieldGraphicRefAndVolume:(grRef:HTMLCanvasElement | null | undefined, voRef:HTMLCanvasElement | null | undefined)=>void,
    heightM:number | undefined,
    setHeightM:(atg:number)=>void
}

const MainCanvas:React.FC<IMainCanvas> = ({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic,voRef,fulfieldGraphicRefAndVolume,heightM, setHeightM}) => {
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth-64 : undefined)
    const [maxPrice, setMaxPrice]=useState<number>(0)
    const [minPrice, setMinPrice]=useState<number>(0)
    const [mouseX, setMouseX]=useState<number>(0)
    const [startX, setStartX]=useState<number>(0)
    const [isPressed, setIsPressed]=useState<boolean>(false)
    const [ifPlus, setIfPlus]=useState<boolean>(false)
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const refCanvasCrossHair=useRef<HTMLCanvasElement>(null)
    const crosshairContainer=refCanvasCrossHair.current
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=refCanvasCrossHair.current?.getContext('2d')

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
        if(graphicRef.current){
          const mouseX = event.clientX - graphicRef.current.getBoundingClientRect().left;
          setMouseX((prev)=>mouseX)
        }
        if(container && isPressed){
          setStartX((prev)=>event.clientX)
          handleScrolling(event.clientX)
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
      let candleWidthPrev:number=candleWidth
      let candleSpacingPrev:number=candleSpacing
      if (e.deltaY < 0) {
        if(candleWidth+1!==31 && candleSpacing+0.2!==4){
          setCandleWidth(candleWidthPrev+1)
          setCandleSpacing(candleSpacingPrev+0.2)
          setIfPlus(true)
        }
      } else {
        if(candleWidth-1!==0 && candleSpacing-0.2!==-0.2){
          setCandleWidth(candleWidthPrev-1)
          setCandleSpacing(candleSpacingPrev-0.2)
          setIfPlus(false)
        }
      }
    }
    useEffect(()=>{
      if(ctx && refCanvas.current && container && ctx2 && refCanvasCrossHair.current ){
        let allWidth=candleWidth+candleSpacing
        let candles=Math.round(container.clientWidth/allWidth)
        setHowCandleInRange(candles)
        let scrollCandle=0
        let allPrevCandle=0
        if(ifPlus){
          scrollCandle=Math.abs(xLeft/((candleWidth-1)+(candleSpacing-0.2)))
          allPrevCandle=scrollCandle+(mouseX/((candleWidth-1)+(candleSpacing-0.2)))

          
        }else{
          scrollCandle=Math.abs(xLeft/((candleWidth+1)+(candleSpacing+0.2)))
          allPrevCandle=scrollCandle+(mouseX/((candleWidth+1)+(candleSpacing+0.2)))
        }
        let newX=-((allPrevCandle*(candleWidth+candleSpacing))-mouseX)
        scrollCandle=Math.abs(newX/(candleWidth+candleSpacing))
        setXLeft(newX)
        let thatMinPrice=Math.min(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[3])));
        let thatMaxPrice=Math.max(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[2])));
        setStartCandle(scrollCandle)
        setMaxPrice(()=>thatMaxPrice)
        setMinPrice(()=>thatMinPrice)
        requestAnimationFrame(() => {
          if(refCanvas.current){
            ctx.clearRect( container.scrollLeft-container.clientWidth , 0 , container.clientWidth*2, refCanvas.current.height  );
            DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,newX)
          }
        });
        
      }
    },[candleWidth, candleSpacing, ifPlus])
    const resizeHandler = () => {
        const { clientHeight, clientWidth } = graphicRef.current || {};
        if(clientHeight && clientWidth){
          setHeightM(clientHeight-142)
          setWidth(clientWidth-64)
        }
      };
      
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        document.addEventListener('mouseup', handleMouseUp as  any)
        fulfieldGraphicRefAndVolume(crosshairContainer,undefined)
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
              let candles=Math.round(container.clientWidth/(candleWidth+candleSpacing))
              if(data.length<candles){
                setHowCandleInRange(data.length)
                candles=data.length
              }else{
                setHowCandleInRange(candles+1)
              }
              let newX=-(candleWidth+candleSpacing)*data.length+candles*(candleWidth+candleSpacing)
              let NewStartCandle=data.length-candles
              
              setXLeft(newX)
              setStartCandle(NewStartCandle)
              let thatMinPrice=Math.min(...data.slice(data.length-candles,data.length).map((d)=>Number(d[3])));
              let thatMaxPrice=Math.max(...data.slice(data.length-candles,data.length).map((d)=>Number(d[2])));
              setMaxPrice(()=>thatMaxPrice)
              setMinPrice(()=>thatMinPrice)
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
              
              CanvasGraphicStart({ctx,canvas:refCanvas.current,data,refContainer, maxPrice:thatMaxPrice, minPrice:thatMinPrice,candleWidth,candleSpacing,xStartLeft:newX,setXStart:setXLeft,howCandleInRange:data.length, startCandle:0,scrolledCandle:Math.abs(newX+container.clientWidth/(candleSpacing+candleWidth))})
              ctx2.clearRect( 0 , 0 , refCanvasCrossHair.current.width , refCanvasCrossHair.current.height  );
              DrawCrosshairCanvas(ctx2,refCanvasCrossHair.current,data,candleWidth,candleSpacing,Math.abs(newX/(candleSpacing+candleWidth)),isMouseOnGraphic.x, isMouseOnGraphic.q,voRef)
            }
      }
      },[heightM, width,data,voRef])

      const handleScrolling=useCallback((newStart:number)=>{
        const deltaX = startX-newStart;
        if(container && isPressed && refCanvasCrossHair.current && ctx2){
          let newX=xLeft-deltaX
          const nextStart=startCandle-1
          let scrollCandle=Math.abs(newX/(candleWidth+candleSpacing))
          DrawCrosshairCanvas(ctx2,refCanvasCrossHair.current,data,candleWidth,candleSpacing,scrollCandle,isMouseOnGraphic.x, isMouseOnGraphic.q,voRef)
          setStartCandle(scrollCandle)
          if(newX<2){
            setXLeft(newX)
            if(nextStart>0){
              let thatMinPrice=Math.min(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[3])));
              let thatMaxPrice=Math.max(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[2])));
              let priceRange = thatMaxPrice - thatMinPrice;
              if(ctx && refCanvas.current){
                ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                  if(refCanvas.current){
                    requestAnimationFrame(() => {
                      if(refCanvas.current){
                        ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                        DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,priceRange,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
                      }
                    });
                    ctx.clearRect(refCanvas.current.width, 0,refCanvas.current.width, refCanvas.current.height)
                  }
                setMaxPrice(()=>thatMaxPrice)
                setMinPrice(()=>thatMinPrice)
              }
            }
            if(ctx && refCanvas.current){
                    if(refCanvas.current && startCandle>0){
                      requestAnimationFrame(() => {
                        if(refCanvas.current){
                          ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                          DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,maxPrice,maxPrice-minPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
                        }
                      });
                      ctx.clearRect(refCanvas.current.width, 0,refCanvas.current.width, refCanvas.current.height)
                    }
          }              
        }
      }
      },[startX, isPressed])
      const handleCrosshairMove=()=>{
        if(ctx2 && refCanvasCrossHair.current && data.length!==0){
          DrawCrosshairCanvas(ctx2,refCanvasCrossHair.current,data,candleWidth,candleSpacing,Math.abs(xLeft/(candleSpacing+candleWidth)),isMouseOnGraphic.x, isMouseOnGraphic.q,voRef)
        }
      }
      useEffect(()=>{
        crosshairContainer?.addEventListener('mousemove', handleCrosshairMove as any)
        return () => {
          if(crosshairContainer){
            crosshairContainer.removeEventListener('mousemove', handleCrosshairMove as  any) 
          }
        };
      },[data,candleWidth,candleSpacing,startCandle, xLeft])
  return (
    <>  
      <canvas onMouseDown={(e:MouseEvent)=>handleMouseDown(e)}
        onMouseMove={(e:MouseEvent)=>handleMouseMove(e)}
        onWheel = {(e:WheelEvent<HTMLCanvasElement>) => HandleWheel(e)}
       ref={refCanvasCrossHair} style={{zIndex:'6'}} className={styles.canvas} width={width} height={heightM? heightM+41 : undefined} id='crosshair_canvas'>
      </canvas>
      <div className={styles.wrap} ref={refContainer} style={{width: graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-64 : undefined, height: heightM}}id='main_canvas'>
        <canvas width={width} height={heightM} ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
      </div>
    </>
  )
}

export default MainCanvas