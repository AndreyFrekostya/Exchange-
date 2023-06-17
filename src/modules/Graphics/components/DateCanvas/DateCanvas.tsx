import React, { RefObject, useEffect, useRef, useState, } from 'react'
import styles from './styles.module.css'
import { DateCanvasStart } from './helpers/DateCanvasStart'
import { DrawMovingDate } from './helpers/DrawMovingDate'
interface IDateCanvas{
    graphicRef:RefObject<HTMLDivElement>, 
    data:string[][],
    xLeft:number,
    scrolledCandle:number,
    candleWidth:number, 
    candleSpacing: number,
    x:number,
    pressedCandle: string[] | undefined,
    distance:string,
    setXLeft:React.Dispatch<React.SetStateAction<number>>,
    setCandleSpacing:React.Dispatch<React.SetStateAction<number>>,
    setCandleWidth:React.Dispatch<React.SetStateAction<number>>,
    howCandleInRange:number, 
    setHowCandleInRange:React.Dispatch<React.SetStateAction<number>>,
    priceWidth:number
}
const DateCanvas:React.FC<IDateCanvas> = ({graphicRef, data, xLeft, scrolledCandle, candleWidth, candleSpacing, x, pressedCandle,distance,setXLeft,setCandleSpacing,setCandleWidth, howCandleInRange,setHowCandleInRange,priceWidth}) => {
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refCanvas2=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const ctx=refCanvas?.current?.getContext('2d')
    const ctx2=refCanvas2?.current?.getContext('2d')
    const [startX, setStartX]=useState<number>(0)
    const [isPressed, setIsPressed]=useState<boolean>(false)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined)
    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
            setWidth(clientWidth-priceWidth)
        }
    };
    // const  handleMouseDown=(e:MouseEvent)=>{
    //     e.preventDefault();  
    //     setIsPressed(()=>true)
    //     setStartX((prev)=>e.clientX)
    // }
    // const  handleMouseMove=(e:MouseEvent)=> {
    //     e.preventDefault();    
    //     if(isPressed && graphicRef.current){
    //         const deltaX = startX-e.clientX;
    //         let newX=xLeft-deltaX
    //         let candles=Math.round(graphicRef.current.clientWidth/(candleWidth+candleSpacing))
    //         setHowCandleInRange(candles)
    //         if(deltaX<0){
    //             if(candleWidth-1!==0 && candleSpacing-0.2!==-0.2){
    //                 let allPrevCandle=scrolledCandle+candles
    //                 newX=-((allPrevCandle*(candleWidth+candleSpacing))-graphicRef.current.clientWidth)
    //                 setXLeft(()=>newX)
    //                 setCandleWidth((prev)=>prev-1)
    //                 setCandleSpacing((prev)=>prev-0.2)
    //             }
    //         }else{
    //             if(candleWidth+1!==41 && candleSpacing+0.2!==3){
    //                 let allPrevCandle=scrolledCandle+candles
    //                 newX=-((allPrevCandle*(candleWidth+candleSpacing))-graphicRef.current.clientWidth)
    //                 setXLeft(()=>newX)
    //                 setCandleWidth((prev)=>prev+1)
    //                 setCandleSpacing((prev)=>prev+0.2)
    //             }
    //         }
    //         setStartX((prev)=>e.clientX)
    //     } 
    // }
    // const handleMouseUp=(e:MouseEvent) =>{
    //     e.preventDefault();   
    //     setStartX((prev)=>0)
    //     setIsPressed((prev)=>false)
    // }
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        // document.addEventListener('mouseup', handleMouseUp as  any)
        resizeHandler();
        return () => {
            // document.removeEventListener('mouseup', handleMouseUp as  any)
            // refContainer.current?.removeEventListener('mousedown', handleMouseDown as  any)
            // refContainer.current?.removeEventListener('mousemove', handleMouseMove as  any)
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);
    useEffect(()=>{
        if(refCanvas.current && ctx){
            DateCanvasStart(ctx,refCanvas.current, data, xLeft, candleWidth, candleSpacing,scrolledCandle, distance)
        }
    },[width, xLeft, candleWidth,candleSpacing,data])
    

    useEffect(()=>{
        if(ctx2 && refCanvas2.current){
            DrawMovingDate(ctx2, refCanvas2.current,data,xLeft,x,candleWidth,candleSpacing,scrolledCandle, pressedCandle)
        }
    }, [xLeft,candleWidth,candleSpacing, x, data, refCanvas2.current, pressedCandle])
    useEffect(()=>{
        if(graphicRef.current){
          setWidth(graphicRef.current.clientWidth-priceWidth)
        }
      },[priceWidth])
  return (
    <div className={styles.wrap}
    ref={refContainer}
   
    style={{width: width, height:'26px'}}>
        <canvas ref={refCanvas} className={styles.canvas} height='25px' width={graphicRef.current? graphicRef.current.clientWidth-priceWidth :   undefined}></canvas>
        <canvas ref={refCanvas2} className={styles.canvas} height='25px'  width={graphicRef.current? graphicRef.current.clientWidth-priceWidth :   undefined}></canvas>
    </div>
  )
}

export default DateCanvas
