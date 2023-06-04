import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CanvasGraphicStart } from '../../helpers/CanvasGraphicStart'
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
    pressedCandle: string[] | undefined
}
const DateCanvas:React.FC<IDateCanvas> = ({graphicRef, data, xLeft, scrolledCandle, candleWidth, candleSpacing, x, pressedCandle}) => {
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refCanvas2=useRef<HTMLCanvasElement>(null)
    const ctx=refCanvas?.current?.getContext('2d')
    const ctx2=refCanvas2?.current?.getContext('2d')
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-63 : undefined)
    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
            setWidth(clientWidth-63)
        }
    };
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => {
          window.removeEventListener("resize", resizeHandler);
        };
    }, []);
    // useEffect(()=>{
    //     if(refCanvas.current){
    //         if(ctx){
    //             DateCanvasStart(ctx,refCanvas.current, data, xLeft, candleWidth, candleSpacing,scrolledCandle)
    //         }
    //     }
    // },[width, xLeft, candleWidth,candleSpacing])
    

    useEffect(()=>{
        if(ctx2 && refCanvas2.current){
            DrawMovingDate(ctx2, refCanvas2.current,data,xLeft,x,candleWidth,candleSpacing,scrolledCandle, pressedCandle)
        }
    }, [xLeft,candleWidth,candleSpacing, x, data, refCanvas2.current, pressedCandle])
  return (
    <div className={styles.wrap} style={{width: width, height:'26px'}}>
        <canvas ref={refCanvas} className={styles.canvas} height='25px' width={width}></canvas>
        <canvas ref={refCanvas2} className={styles.canvas} height='25px'  width={width}></canvas>
    </div>
  )
}

export default DateCanvas
