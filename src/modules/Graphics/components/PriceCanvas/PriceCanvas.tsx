import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawPrice } from './helpers/DrawPrice'
import { getTransformedNumber } from './helpers/getTransformedNumber'
import { getTransformedNumberWithFloat } from './helpers/getTrasnformedNumerWithFloat'
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
  q:boolean,
  setWidth:Dispatch<SetStateAction<number>>,
  width:number,
  fulfieldGraphicRefAndVolumeAndPrice:(grRef:HTMLCanvasElement | null | undefined, voRef:HTMLCanvasElement | null | undefined,priceRefArg: HTMLCanvasElement | null | undefined)=>void,
  setFixedNumber:Dispatch<SetStateAction<number>>,
}
const PriceCanvas:React.FC<IPriceCanvas> = ({graphicRef, data, xLeft, howCandleInRange, startCandle,heightM,setHeightM, yMouse,candleWidth,candleSpacing,q,  width, setWidth,fulfieldGraphicRefAndVolumeAndPrice,setFixedNumber}) => {
  const refCanvas=useRef<HTMLCanvasElement>(null)
  const ctx=refCanvas.current?.getContext('2d')
  const refCanvas2=useRef<HTMLCanvasElement>(null)
  const [maxPrice, setMaxPrice]=useState<number>(0)
  const [minPrice, setMinPrice]=useState<number>(0)
  const [interval, setInterval]=useState<number>(0)
  const resizeHandler = () => {
      const { clientHeight} = graphicRef.current || {};
      if(clientHeight){
        setHeightM(clientHeight-100)
      }
    };
  useEffect(() => {
      window.addEventListener("resize", resizeHandler);
      fulfieldGraphicRefAndVolumeAndPrice(undefined,undefined,refCanvas2.current)
      resizeHandler();
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, [refCanvas2]);
  useEffect(()=>{
      if(ctx && refCanvas.current && data.length!==0){
        let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
        let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
        DrawPrice(ctx, refCanvas.current, data, xLeft, startCandle, howCandleInRange, thatMaxPrice, thatMinPrice, candleWidth, candleSpacing, setWidth, width,setInterval)
        setMaxPrice(()=>thatMaxPrice)
        setMinPrice(()=>thatMinPrice)
  }
  },[heightM, xLeft, howCandleInRange, startCandle,width])
  useEffect(()=>{
      if(ctx && refCanvas.current){
        let thatMaxPrice=Math.max(...data.map((d)=>Number(d[2])));
        let widthT=0
        if(String(thatMaxPrice)[0]==='0'){
          let maxrounded=Number(getTransformedNumberWithFloat(thatMaxPrice,Math.ceil));
          widthT=ctx.measureText(String(maxrounded.toFixed(String(interval).split('.')[1] ? String(interval).split('.')[1].length+2 : 1))).width+8
        }else{
          let maxrounded=Number(getTransformedNumber(thatMaxPrice,undefined,Math.ceil))
          widthT=ctx.measureText(maxrounded.toFixed(String(interval).split('.')[1] ? String(interval).split('.')[1].length+1 : 1)).width+8
        }
        if(width!==widthT){
          setWidth(widthT+8)
        }
      }
      let maxArr=String(interval).split('.')[1]
      let fixedNumber=maxArr ? String(interval).split('.')[1].length+1 : 2
      setFixedNumber(fixedNumber)
  },[data, interval])
 
  return (
    <div className={styles.wrap} style={{width: width, height:heightM? heightM+43 : undefined}}>
      <canvas ref={refCanvas}className={styles.canvas} height={heightM ? heightM+21 : undefined} width={width}></canvas>
      <canvas ref={refCanvas2} className={styles.canvas} height={heightM ? heightM+21 : undefined} width={width}></canvas>
    </div>
  )
}

export default PriceCanvas
 