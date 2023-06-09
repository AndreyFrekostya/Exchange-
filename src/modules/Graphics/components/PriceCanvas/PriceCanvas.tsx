import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawPrice } from './helpers/DrawPrice'
import { DrawInfoPrice } from './helpers/DrawInfoPrice'
interface IPriceCanvas{
  graphicRef:RefObject<HTMLDivElement>,
  data: string [][],
  xLeft:number,
  howCandleInRange:number,
  startCandle:number,
  heightM:number | undefined,
  setHeightM:(arg:number|undefined)=>void,
  yMouse:number,
  candleWidth:number, 
  candleSpacing:number,
  q:boolean
}
const PriceCanvas:React.FC<IPriceCanvas> = ({graphicRef, data, xLeft, howCandleInRange, startCandle,heightM,setHeightM, yMouse,candleWidth,candleSpacing,q}) => {
  const refCanvas=useRef<HTMLCanvasElement>(null)
  const ctx=refCanvas.current?.getContext('2d')
  const refCanvas2=useRef<HTMLCanvasElement>(null)
  const ctx2=refCanvas2.current?.getContext('2d')
  const [maxPrice, setMaxPrice]=useState<number>(0)
  const [minPrice, setMinPrice]=useState<number>(0)
  const resizeHandler = () => {
      const { clientHeight} = graphicRef.current || {};
      if(clientHeight){
        setHeightM(clientHeight-100)
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
      if(ctx && refCanvas.current && data.length!==0){
        let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
        let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
        if(thatMaxPrice!==maxPrice || thatMinPrice!==thatMinPrice){
          DrawPrice(ctx, refCanvas.current, data, xLeft, startCandle, howCandleInRange, thatMaxPrice, thatMinPrice, candleWidth, candleSpacing)
          setMaxPrice(()=>thatMaxPrice)
          setMinPrice(()=>thatMinPrice)
        }
      }
    },[heightM,data, xLeft, howCandleInRange, startCandle])
  
    useEffect(()=>{
      if(ctx2 && refCanvas2.current){
        DrawInfoPrice(ctx2, refCanvas2.current, howCandleInRange,maxPrice,minPrice,yMouse,candleWidth,candleSpacing,q)
      }
    },[yMouse,maxPrice,minPrice, xLeft, candleWidth, candleSpacing, heightM,q])
  return (
    <div className={styles.wrap} style={{width: '64px', height:heightM? heightM+43 : undefined}}>
        <canvas ref={refCanvas}className={styles.canvas} height={heightM ? heightM+21 : undefined} width='64px'></canvas>
        <canvas ref={refCanvas2} className={styles.canvas} height={heightM ? heightM+21 : undefined} width='64px'></canvas>
    </div>
  )
}

export default PriceCanvas
