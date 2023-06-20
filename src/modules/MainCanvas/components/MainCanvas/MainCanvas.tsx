import React, { Dispatch, MouseEvent, MutableRefObject, RefObject, SetStateAction, WheelEvent,useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawCandleFunc } from '../../helpers/DrawCandleFunc'
import { DrawCrosshairCanvas } from '../../helpers/DrawCrosshairCanvas'
import { DrawInfoPrice } from '../../../Graphics/components/PriceCanvas/helpers/DrawInfoPrice'
import CardGraphic from '../../../../components/CardGraphic/CardGraphic'
import { RedrawOneCandle } from '../../helpers/RedrawOneCandle'
import CrosshairCanvas from '../CrosshairCanvas/CrosshairCanvas'
import { IMainCanvas } from '../../interfaces/CanvasInterfaces'
import { DrawUpdatedLinePrice } from '../../helpers/DrawUpdatedLinePrice'
import { DrawLastUpdatedPrice } from '../../../Graphics/components/PriceCanvas/helpers/DrawLasrUpdatedPrice'

export const MainCanvas:React.FC<IMainCanvas> = ({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic,voRef,heightM, setHeightM, heightV, pressedCandle, setPressedCandle,priceWidth,priceRef,fixedNumber,mainCanvasRef, ifFirst, setIfFirst}) => {
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth-priceWidth : undefined)
    const [maxPrice, setMaxPrice]=useState<number>(0)
    const [minPrice, setMinPrice]=useState<number>(0)
    const [mouseX, setMouseX]=useState<number>(0)
    const [isPressed, setIsPressed]=useState<boolean>(false)
    const [ifPlus, setIfPlus]=useState<boolean>(false)
    const [active, setActive]=useState<{active:boolean, y:number}>({active:false,y:0})
    const [lastTimeStamp,setLastTimeStamp]=useState<number>(0)
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const crosshairContainer=mainCanvasRef?.current
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=crosshairContainer?.getContext('2d')
    const ctxP=priceRef?.current?.getContext('2d')
    const propsToCrosshairCanvas={setActive,active,isMouseClientY:isMouseOnGraphic.y,xLeft,setXLeft,data,candleWidth,setCandleWidth,candleSpacing,setPressedCandle,graphicRef,setMouseX,mouseX,setCandleSpacing,setIfPlus,priceWidth,heightM, isPressed,setIsPressed}
    useEffect(()=>{
      if(graphicRef.current){
        setWidth(graphicRef.current.clientWidth-priceWidth)
      }
    },[priceWidth])
  useEffect(()=>{
    if(ctx && refCanvas.current && container && ctx2 && crosshairContainer && priceRef?.current && fixedNumber ){
      let allWidth=candleWidth+candleSpacing
      let candles=Math.round(container.clientWidth/allWidth)
      let scrollCandle=0
      let allPrevCandle=0
      let newX=0
      let ranger=!ifPlus ? candleSpacing<0.8 ? 0 : 2 : candleSpacing<=0.8 ? 0 : 2
      if(ifPlus){
        scrollCandle=Math.abs(xLeft/((candleWidth-ranger)+(candleSpacing-0.2)))
        allPrevCandle=scrollCandle+(mouseX/((candleWidth-ranger)+(candleSpacing-0.2))) 
      }else{
        scrollCandle=Math.abs(xLeft/((candleWidth+ranger)+(candleSpacing+0.2)))
        allPrevCandle=scrollCandle+(mouseX/((candleWidth+ranger)+(candleSpacing+0.2)))
      }
      newX=-((allPrevCandle*(allWidth))-mouseX)
      if(xLeft>-4 && !ifPlus || newX>0){
        scrollCandle=0
        allPrevCandle=0
        newX=0
      }
      scrollCandle=Math.abs(newX/(allWidth))
      if(ifPlus){
        if(Math.floor(scrollCandle)!<data.length-2 && Math.floor(startCandle)!<data.length-2){
        }else{
          scrollCandle=data.length-2
          newX=-(allWidth)*(data.length-2)
        }
      }
      let thatMinPrice=Math.min(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[3])));
      let thatMaxPrice=Math.max(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[2])));
      requestAnimationFrame(() => {
        if(refCanvas.current && crosshairContainer){
          ctx.clearRect( container.scrollLeft-container.clientWidth , 0 , container.clientWidth*2, refCanvas.current.height  );
          DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,newX)
        }
      });
      let allLeft=Math.abs(newX)+(isMouseOnGraphic.x-crosshairContainer.getBoundingClientRect().left)
      let neededCandle=data[Math.floor(allLeft/(allWidth))]
      let x=undefined
      if(data.indexOf(neededCandle)!==-1){
         x=(data.indexOf(neededCandle)-scrollCandle)*(allWidth)+candleWidth/2
      }
      DrawCrosshairCanvas(ctx2,crosshairContainer,data,candleWidth,candleSpacing,Math.abs(newX/(candleSpacing+candleWidth)), isMouseOnGraphic.q,voRef,isPressed,isMouseOnGraphic.x,isMouseOnGraphic.y+41, newX, isMouseOnGraphic.x, x,undefined)
      setXLeft(()=>newX)
      setStartCandle(scrollCandle)
      setMaxPrice(()=>thatMaxPrice)
      setMinPrice(()=>thatMinPrice)
      setHowCandleInRange(candles)
    }
  },[candleWidth, candleSpacing, ifPlus])
  const resizeHandler = () => {
    const { clientHeight, clientWidth } = graphicRef.current || {};
    if(clientHeight && clientWidth ){
      setHeightM(clientHeight-heightV-72)
      setWidth(clientWidth-priceWidth)
    };
  }
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [heightV,heightM]);
  useEffect(()=>{
    if(refCanvas.current && crosshairContainer){
      if(ctx && data.length!==0 && ctx2 && container && priceRef.current){
        let candles=Math.round(container.clientWidth/(candleWidth+candleSpacing))
        if(data.length<candles){
          setHowCandleInRange(data.length)
          candles=data.length
        }else{
          setHowCandleInRange(candles+1)
        }
        let newX=-(candleWidth+candleSpacing)*data.length+candles*(candleWidth+candleSpacing)
        let NewStartCandle=data.length-candles
        if(xLeft===0){
          setXLeft(()=>newX)
        }else{
          newX=xLeft
          NewStartCandle=startCandle
        }
        let thatMinPrice=Math.min(...data.slice(NewStartCandle,NewStartCandle+candles).map((d)=>Number(d[3])));
        let thatMaxPrice=Math.max(...data.slice(NewStartCandle,NewStartCandle+candles).map((d)=>Number(d[2])));
        ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
        DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,newX)
        ctxP?.clearRect(0,0,priceRef?.current.width,priceRef?.current.height)
        DrawUpdatedLinePrice(ctx,data[data.length-1],refCanvas.current.height-40,maxPrice,maxPrice-minPrice,xLeft,refCanvas.current.width)
        ctx2.clearRect( 0 , 0 , crosshairContainer.width , crosshairContainer.height  );
        setStartCandle(NewStartCandle)
        setMaxPrice(()=>thatMaxPrice)
        setMinPrice(()=>thatMinPrice)
      }
    }
  },[heightM, width,voRef])
      useEffect(()=>{
        if(container && refCanvas.current && ctx && data.length!==0){
          let lastCandleTimeStamp=Number(data[data.length-1][0])
          if(xLeft==0){
            let candles=Math.round(container.clientWidth/(candleWidth+candleSpacing))
            let ranger=0
            if(data.length<candles){
              setHowCandleInRange(data.length)
              candles=data.length
            }else{
              setHowCandleInRange(candles+1)
              ranger=-50
            }
            let newX=-(candleWidth+candleSpacing)*data.length+candles*(candleWidth+candleSpacing)+ranger
            let NewStartCandle=data.length-candles
            let thatMinPrice=Math.min(...data.slice(NewStartCandle,NewStartCandle+candles).map((d)=>Number(d[3])));
            let thatMaxPrice=Math.max(...data.slice(NewStartCandle,NewStartCandle+candles).map((d)=>Number(d[2])));
            DrawUpdatedLinePrice(ctx,data[data.length-1],refCanvas.current.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,xLeft,refCanvas.current.width)
          }else if(startCandle>data.length-howCandleInRange){
            if(lastCandleTimeStamp!==lastTimeStamp && lastTimeStamp!==0){
              let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
              let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
              setXLeft(()=>xLeft-(candleWidth+candleSpacing))
              setStartCandle(startCandle-1)
              setMaxPrice(()=>thatMaxPrice)
              setMinPrice(()=>thatMinPrice)
            }else{
              let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
              let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
              DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
              setMaxPrice(()=>thatMaxPrice)
              setMinPrice(()=>thatMinPrice)
            }
            setLastTimeStamp(lastCandleTimeStamp)
          }else{
            if(startCandle<data.length-howCandleInRange){
              if(lastCandleTimeStamp!==lastTimeStamp){
                ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                setXLeft(()=>xLeft+(candleWidth+candleSpacing))
                setStartCandle(startCandle-1)
                setLastTimeStamp(lastCandleTimeStamp)
              }else{
                ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,maxPrice,maxPrice-minPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)        
              }
            }
          }
          DrawUpdatedLinePrice(ctx,data[data.length-1],refCanvas.current.height-40,maxPrice,maxPrice-minPrice,xLeft,refCanvas.current.width)
        }
      },[data])
      
      useEffect(()=>{
        if(container && crosshairContainer&& ctx2){
          let scrollCandle=Math.abs(xLeft/(candleWidth+candleSpacing))
          let thatMinPrice=Math.min(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[3])));
          let thatMaxPrice=Math.max(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[2])));
          let priceRange = thatMaxPrice - thatMinPrice;
          if(ctx && refCanvas.current){
            requestAnimationFrame(() => {
              if(refCanvas.current){
                ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,priceRange,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
                DrawUpdatedLinePrice(ctx,data[data.length-1],refCanvas.current.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,xLeft,refCanvas.current.width)
              }
            });
            ctx.clearRect(refCanvas.current.width, 0,refCanvas.current.width, refCanvas.current.height) 
            ctx.clearRect(-refCanvas.current.width,0,refCanvas.current.width, refCanvas.current.height)
            setMaxPrice(()=>thatMaxPrice)
            setMinPrice(()=>thatMinPrice)
            setStartCandle(scrollCandle)
          }
        }
      },[xLeft])
      const handleCrosshair=(e:any)=>{
        if(ctx2 && crosshairContainer && refCanvas.current && priceRef?.current && fixedNumber && data.length!==0){
          let y=e.clientY-refCanvas.current.getBoundingClientRect().top
          setIsMouseOnGraphic({x:e.clientX,y:y,q:true})
          DrawCrosshairCanvas(ctx2,crosshairContainer,data,candleWidth,candleSpacing,Math.abs(xLeft/(candleSpacing+candleWidth)), isMouseOnGraphic.q,voRef,isPressed,e.clientX,e.offsetY, xLeft, e.offsetX,undefined, pressedCandle)
          DrawInfoPrice(ctxP, priceRef?.current, howCandleInRange,maxPrice,minPrice,e.offsetY-40.5,candleWidth,candleSpacing,isMouseOnGraphic.q,fixedNumber,priceWidth)
         
        }
      }
      const handleCrosshairLeave=()=>{
        if(crosshairContainer){
          ctx2?.clearRect(0,0,crosshairContainer.width,crosshairContainer.height)
          const volumeCanvas=voRef?.current
          const ctxV=volumeCanvas?.getContext('2d')
          const priceCanvas=priceRef?.current
          const ctxP=priceCanvas?.getContext('2d')
          setIsMouseOnGraphic({y:-200,q:false, x:-200})
          if(ctxV && volumeCanvas && ctxP && priceCanvas){
            ctxV?.clearRect(0,0,volumeCanvas.width,volumeCanvas.height)
            ctxP?.clearRect(0,0,priceCanvas.width,priceCanvas.height)
          }
        }
      }
      useEffect(()=>{
        crosshairContainer?.addEventListener('mousemove', handleCrosshair)
        crosshairContainer?.addEventListener('mouseleave', handleCrosshairLeave)
        return ()=>{
          crosshairContainer?.removeEventListener('mousemove', handleCrosshair)
          crosshairContainer?.removeEventListener('mouseleave', handleCrosshairLeave)
        }

      },[xLeft, isPressed,fixedNumber,priceRef,priceWidth,data])
  return (
    <>  
      <CrosshairCanvas {...propsToCrosshairCanvas} ref={mainCanvasRef} />
      <div className={styles.wrap} ref={refContainer} style={{width: graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined, height: heightM}}>
        <canvas width={graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined} height={heightM} ref={refCanvas} className={styles.canvas}></canvas>
        {active.active ? <CardGraphic active={active} setActive={setActive} crosshairRef={refCanvas.current}/>: null}
      </div>
    </>
  )
}
