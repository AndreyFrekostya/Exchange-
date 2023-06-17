import React, { Dispatch, MouseEvent, MutableRefObject, RefObject, SetStateAction, WheelEvent,useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawCandleFunc } from '../../helpers/DrawCandleFunc'
import { DrawCrosshairCanvas } from '../../helpers/DrawCrosshairCanvas'
import { DrawInfoPrice } from '../PriceCanvas/helpers/DrawInfoPrice'
import CardGraphic from '../../../../components/CardGraphic/CardGraphic'
export interface IMainCanvas{
    graphicRef:RefObject<HTMLDivElement>,
    data:string[][],
    howCandleInRange:number,
    setHowCandleInRange:(arg:number)=>void,
    candleWidth:number, 
    setCandleWidth:(arg:number)=>void,
    xLeft:number ,
    setXLeft:React.Dispatch<React.SetStateAction<number>>,
    startCandle:number ,
    setStartCandle:(arg:number)=>void,
    candleSpacing:number,
    setCandleSpacing:(arg:number)=>void,
    setIsMouseOnGraphic:Dispatch<SetStateAction<{ x: number;y:number; q: boolean; }>>,
    isMouseOnGraphic:{x:number,y:number, q:boolean},
    voRef?:MutableRefObject<HTMLCanvasElement | null>,
    grRef?:MutableRefObject<HTMLCanvasElement | null>,
    fulfieldGraphicRefAndVolumeAndPrice:(grRef:HTMLCanvasElement | null | undefined, voRef:HTMLCanvasElement | null | undefined,priceRefArg: HTMLCanvasElement | null | undefined)=>void,
    heightM:number | undefined,
    setHeightM:React.Dispatch<React.SetStateAction<number | undefined>>,
    heightV:number,
    setHeightV:React.Dispatch<React.SetStateAction<number>>,
    pressedCandle:string[] | undefined,
    setPressedCandle:React.Dispatch<React.SetStateAction<string[] | undefined>>,
    priceWidth:number,
    priceRef?:MutableRefObject<HTMLCanvasElement | null>,
    fixedNumber?:number
}

const MainCanvas:React.FC<IMainCanvas> = ({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic,voRef,fulfieldGraphicRefAndVolumeAndPrice,heightM, setHeightM, heightV, pressedCandle, setPressedCandle,priceWidth,priceRef,fixedNumber}) => {
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth-priceWidth : undefined)
    const [maxPrice, setMaxPrice]=useState<number>(0)
    const [minPrice, setMinPrice]=useState<number>(0)
    const [mouseX, setMouseX]=useState<number>(0)
    const [startX, setStartX]=useState<number>(0)
    const [isPressed, setIsPressed]=useState<boolean>(false)
    const [ifPlus, setIfPlus]=useState<boolean>(false)
    const [eMouseMove, setEMouseMove]=useState<{c:number,x:number,y:number}>({c:0,x:0,y:0})
    const [active, setActive]=useState<{active:boolean, y:number}>({active:false,y:0})
    const [lastTimeStamp,setLastTimeStamp]=useState<number>(0)
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const refCanvasCrossHair=useRef<HTMLCanvasElement>(null)
    const crosshairContainer=refCanvasCrossHair.current
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=refCanvasCrossHair.current?.getContext('2d')
    const ctxP=priceRef?.current?.getContext('2d')
    const  handleMouseDown=(e:MouseEvent)=>{
      e.preventDefault();
      if(refCanvasCrossHair.current && crosshairContainer){
        const mouseX = e.clientX - refCanvasCrossHair.current.getBoundingClientRect().left
        const mouseY = e.clientY - refCanvasCrossHair.current.getBoundingClientRect().top
        if(mouseX>refCanvasCrossHair.current.clientWidth-19 && mouseX<refCanvasCrossHair.current.clientWidth && mouseY+10>isMouseOnGraphic.y+40 && mouseY-10<isMouseOnGraphic.y+40){
          setActive({active:!active.active, y:mouseY})
        }else{
          setActive({active:false, y:0})
        }
      }
      if(crosshairContainer){
        crosshairContainer.style.cursor='pointer';
      }    
      if(refCanvasCrossHair.current){
        let allLeft=Math.abs(xLeft)+(eMouseMove.c-refCanvasCrossHair.current.getBoundingClientRect().left)
        let neededCandle=data[Math.floor(allLeft/(candleWidth+candleSpacing))]
        if(xLeft!<-(candleWidth+candleSpacing)*2){
          setPressedCandle(()=>neededCandle)
        }else{
          setPressedCandle(()=>undefined)
        }
      } 
      setIsPressed(()=>true)
      setStartX((prev)=>e.clientX)
    }
    const  handleMouseMove=(event:MouseEvent)=> {
        event.preventDefault();
        if(graphicRef.current && refCanvasCrossHair.current && crosshairContainer){
          const mouseX = event.clientX - graphicRef.current.getBoundingClientRect().left;
          if(mouseX>refCanvasCrossHair.current.clientWidth-19 && mouseX<refCanvasCrossHair.current.clientWidth){
            crosshairContainer.style.cursor='pointer';
          }else if(!isPressed){
            crosshairContainer.style.cursor='crosshair';
          }
          setMouseX((prev)=>mouseX)
        }
        if(container && isPressed){
          const deltaX = startX-event.clientX;
          let newX=xLeft-deltaX
          let scrollCandle=Math.floor(newX/(candleWidth+candleSpacing))
          if(scrollCandle<0 && Math.abs(scrollCandle)<data.length-1){
            setXLeft(()=>newX)
          }
          setStartX((prev)=>event.clientX)
        }
    }
    const handleMouseUp=(event:MouseEvent) =>{
        event.preventDefault();
        setStartX((prev)=>0)
        setMouseX((prev)=>0)
        setIsPressed((prev)=>false)
        if(graphicRef.current && refCanvasCrossHair.current && crosshairContainer){
          const mouseX = event.clientX - graphicRef.current.getBoundingClientRect().left;
          if(mouseX>refCanvasCrossHair.current.clientWidth-19 && mouseX<refCanvasCrossHair.current.clientWidth){
            crosshairContainer.style.cursor='pointer';
          }else{
            crosshairContainer.style.cursor='crosshair';
          }
        }
    }
    const HandleWheel=(e:WheelEvent<HTMLCanvasElement>)=>{
      let candleWidthPrev:number=candleWidth
      let candleSpacingPrev:number=candleSpacing
      if (e.deltaY < 0) {
        if(candleWidth===1 && candleSpacing<0.8){
          setCandleSpacing(candleSpacingPrev+0.2)
          setIfPlus(true)
        }else if(candleWidth+2!==41 && candleSpacing+0.2!==4){
          setCandleWidth(candleWidthPrev+2)
          setCandleSpacing(candleSpacingPrev+0.2)
          setIfPlus(true)
        }
      } else {
        if(candleWidth-2!==-1 && candleSpacing-0.2!==-0.4){
          setCandleWidth(candleWidthPrev-2)
          setCandleSpacing(candleSpacingPrev-0.2)
          setIfPlus(false)
        }
        if(candleWidth===1 && candleSpacing-0.2!>0.2){
          setCandleSpacing(candleSpacingPrev-0.2)
          setIfPlus(false)
        }
      }
    }
    useEffect(()=>{
      if(graphicRef.current){
        setWidth(graphicRef.current.clientWidth-priceWidth)
      }
    },[priceWidth])
    useEffect(()=>{
      if(ctx && refCanvas.current && container && ctx2 && refCanvasCrossHair.current && priceRef?.current && fixedNumber ){
        let allWidth=candleWidth+candleSpacing
        let candles=Math.round(container.clientWidth/allWidth)
        setHowCandleInRange(candles)
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
        newX=-((allPrevCandle*(candleWidth+candleSpacing))-mouseX)
        if(xLeft>-4 && !ifPlus || newX>0){
          scrollCandle=0
          allPrevCandle=0
          newX=0
        }
        scrollCandle=Math.abs(newX/(candleWidth+candleSpacing))
        if(ifPlus){
          if(Math.floor(scrollCandle)!<data.length-2 && Math.floor(startCandle)!<data.length-2){
          }else{
            scrollCandle=data.length-2
            newX=-(candleWidth+candleSpacing)*(data.length-2)
          }
        }
        setXLeft(()=>newX)
        let thatMinPrice=Math.min(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[3])));
        let thatMaxPrice=Math.max(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[2])));
        setStartCandle(scrollCandle)
        setMaxPrice(()=>thatMaxPrice)
        setMinPrice(()=>thatMinPrice)
        requestAnimationFrame(() => {
          if(refCanvas.current && refCanvasCrossHair.current){
            ctx.clearRect( container.scrollLeft-container.clientWidth , 0 , container.clientWidth*2, refCanvas.current.height  );
            DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,newX)
            
          }
        });
        let allLeft=Math.abs(newX)+(isMouseOnGraphic.x-refCanvasCrossHair.current.getBoundingClientRect().left)
        let neededCandle=data[Math.floor(allLeft/(candleWidth+candleSpacing))]
        let x=undefined
        if(data.indexOf(neededCandle)!==-1){
           x=(data.indexOf(neededCandle)-scrollCandle)*(candleWidth+candleSpacing)+candleWidth/2
        }
        DrawCrosshairCanvas(ctx2,refCanvasCrossHair.current,data,candleWidth,candleSpacing,Math.abs(newX/(candleSpacing+candleWidth)), isMouseOnGraphic.q,voRef,isPressed,isMouseOnGraphic.x,eMouseMove.y, newX, eMouseMove.x, x,undefined)
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
        document.addEventListener('mouseup', handleMouseUp as  any)
        fulfieldGraphicRefAndVolumeAndPrice(crosshairContainer,undefined,undefined)
        return () => {
          window.removeEventListener("resize", resizeHandler);
          if(crosshairContainer){
            crosshairContainer.removeEventListener('mousedown', handleMouseDown as  any)
            crosshairContainer.removeEventListener('mousemove', handleMouseMove as  any)
            document.removeEventListener('mouseup', handleMouseUp as  any)
          }
        };
      }, [crosshairContainer,data,heightV]);
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
              ctx2.clearRect( 0 , 0 , refCanvasCrossHair.current.width , refCanvasCrossHair.current.height  );
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
            ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
            DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,newX)
            setXLeft(()=>newX)
            setStartCandle(NewStartCandle)
            setMaxPrice(()=>thatMaxPrice)
            setMinPrice(()=>thatMinPrice)
            setLastTimeStamp(()=>lastCandleTimeStamp)
          }else if(startCandle>data.length-howCandleInRange){
            if(lastCandleTimeStamp!==lastTimeStamp){
              let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
              let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
              DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
              setXLeft(()=>xLeft-(candleWidth+candleSpacing))
              setStartCandle(startCandle-1)
              setMaxPrice(()=>thatMaxPrice)
              setMinPrice(()=>thatMinPrice)
              setLastTimeStamp(lastCandleTimeStamp)
            }else{
              let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
              let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
              DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
              setMaxPrice(()=>thatMaxPrice)
              setMinPrice(()=>thatMinPrice)
            }
          }else{
            if(startCandle<data.length-howCandleInRange){
              if(lastCandleTimeStamp!==lastTimeStamp){
                let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
                let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
                // ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                // DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
                setXLeft(()=>xLeft+(candleWidth+candleSpacing))
                setStartCandle(startCandle-1)
                setMaxPrice(()=>thatMaxPrice)
                setMinPrice(()=>thatMinPrice)
                setLastTimeStamp(lastCandleTimeStamp)
              }else{
                let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
                let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
                ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
                setMaxPrice(()=>thatMaxPrice)
                setMinPrice(()=>thatMinPrice)
              }
            }
          }
        }
      },[data])
      useEffect(()=>{
        if(container && refCanvasCrossHair.current && ctx2){
          let scrollCandle=Math.abs(xLeft/(candleWidth+candleSpacing))
          let thatMinPrice=Math.min(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[3])));
          let thatMaxPrice=Math.max(...data.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[2])));
          let priceRange = thatMaxPrice - thatMinPrice;
          if(ctx && refCanvas.current){
            requestAnimationFrame(() => {
              if(refCanvas.current){
                ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
                DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,priceRange,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft)
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
        setEMouseMove({c:e.clientX, x:e.offsetX, y:e.offsetY})
        if(ctx2 && refCanvasCrossHair.current && refCanvas.current && priceRef?.current && fixedNumber){
          let y=e.clientY-refCanvas.current.getBoundingClientRect().top
          setIsMouseOnGraphic({x:e.clientX,y:y,q:true})
          DrawCrosshairCanvas(ctx2,refCanvasCrossHair.current,data,candleWidth,candleSpacing,Math.abs(xLeft/(candleSpacing+candleWidth)), isMouseOnGraphic.q,voRef,isPressed,e.clientX,e.offsetY, xLeft, e.offsetX,undefined, pressedCandle)
          DrawInfoPrice(ctxP, priceRef?.current, howCandleInRange,maxPrice,minPrice,e.offsetY-40.5,candleWidth,candleSpacing,isMouseOnGraphic.q,fixedNumber,priceWidth)
         
        }
      }
      const handleCrosshairLeave=()=>{
        if(refCanvasCrossHair.current){
          ctx2?.clearRect(0,0,refCanvasCrossHair.current.width,refCanvasCrossHair.current.height)
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

      },[xLeft, isPressed,fixedNumber,priceRef,priceWidth])
  return (
    <>  
      <canvas onMouseDown={(e:MouseEvent)=>handleMouseDown(e)}
        onMouseMove={(e:MouseEvent)=>handleMouseMove(e)}
        onWheel = {(e:WheelEvent<HTMLCanvasElement>) => HandleWheel(e)}
       ref={refCanvasCrossHair} style={{zIndex:'6'}} className={styles.canvas2} width={graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined} height={heightM? heightM+41 : undefined}>
      </canvas>
      <div className={styles.wrap} ref={refContainer} style={{width: graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined, height: heightM}}>
        <canvas width={graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined} height={heightM} ref={refCanvas} className={styles.canvas}></canvas>
        {active.active ? <CardGraphic active={active} setActive={setActive} crosshairRef={refCanvas.current}/>: null}
      </div>
    </>
  )
}

export default MainCanvas