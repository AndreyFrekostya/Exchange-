import React, { MouseEvent, RefObject, useEffect, useRef, useState, } from 'react'
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
    priceWidth:number,
    setIfPlus:React.Dispatch<React.SetStateAction<boolean>>
}
const DateCanvas:React.FC<IDateCanvas> = ({graphicRef, data, xLeft, scrolledCandle, candleWidth, candleSpacing, x, pressedCandle,distance,setXLeft,setCandleSpacing,setCandleWidth, howCandleInRange,setHowCandleInRange,priceWidth,setIfPlus}) => {
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refCanvas2=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const [startX, setStartX]=useState<number>(0)
    const [isPressed, setIsPressed]=useState<boolean>(false)
    const refC=refContainer?.current
    const ctx=refCanvas?.current?.getContext('2d')
    const ctx2=refCanvas2?.current?.getContext('2d')
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined)

    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
            setWidth(clientWidth-priceWidth)
        }
    };
    const handleMouseDown=(e:MouseEvent)=>{
        e.preventDefault();
        setIsPressed(()=>true)
        setStartX((prev)=>e.clientX)
    }
    const handleMouseMove=(e:MouseEvent)=>{
        e.preventDefault();
        if(isPressed){
            const deltaX = startX-e.clientX;
            const newX=xLeft+deltaX
            if(deltaX<0){
                if(candleWidth+2!==41 && candleSpacing+0.2!==4){
                    setCandleWidth((prev)=>prev+2)
                    setCandleSpacing((prev)=>prev+0.2)
                    setIfPlus(()=>true)
                }
            }
        }
        setStartX((prev)=>e.clientX)
    }
    const handleMouseUp=(e:MouseEvent)=>{
        e.preventDefault();
        setIsPressed(()=>false)
        setStartX((prev)=>0)
    }
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        document.addEventListener('mouseup', handleMouseUp as any)
        resizeHandler();
        return () => {
            refC?.removeEventListener('mousedown', handleMouseDown as  any)
            refC?.removeEventListener('mousemove', handleMouseMove as  any)
            document.removeEventListener('mouseup', handleMouseUp as any)
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);
    useEffect(()=>{
        if(refCanvas.current && ctx){
            let startCandle=xLeft >=0 ? -Math.abs(xLeft/(candleSpacing+candleWidth)) : Math.abs(xLeft/(candleSpacing+candleWidth))
            DateCanvasStart(ctx,refCanvas.current, data, xLeft, candleWidth, candleSpacing,startCandle, distance)
        }
    },[width, xLeft, candleWidth,candleSpacing,data])
    

    useEffect(()=>{
        if(ctx2 && refCanvas2.current){
            if(x!==-200){
                let startCandle=xLeft >=0 ? -Math.abs(xLeft/(candleSpacing+candleWidth)) : Math.abs(xLeft/(candleSpacing+candleWidth))
                DrawMovingDate(ctx2, refCanvas2.current,data,xLeft,x,candleWidth,candleSpacing,startCandle, pressedCandle)
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
      const dbClickSetGraph=()=>{

      }
  return (
    <div className={styles.wrap} ref={refContainer}  onDoubleClick={dbClickSetGraph} onMouseDown={(e:MouseEvent)=>handleMouseDown(e)} onMouseMove={(e:MouseEvent)=>handleMouseMove(e)}
    style={{width: width, height:'26px'}}>
        <canvas ref={refCanvas} className={styles.canvas} height='25px' width={graphicRef.current? graphicRef.current.clientWidth-priceWidth :   undefined}></canvas>
        <canvas ref={refCanvas2} className={styles.canvas} height='25px'  width={graphicRef.current? graphicRef.current.clientWidth-priceWidth :   undefined}></canvas>
    </div>
  )
}

export default DateCanvas
