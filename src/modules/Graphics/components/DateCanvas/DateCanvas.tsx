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
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined)
    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
            setWidth(clientWidth-priceWidth)
        }
    };
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => {
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
            if(x!==-200){
                DrawMovingDate(ctx2, refCanvas2.current,data,xLeft,x,candleWidth,candleSpacing,scrolledCandle, pressedCandle)
            }else{
                ctx2.clearRect(0,0,refCanvas2.current.width, refCanvas2.current.height)
            }
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
