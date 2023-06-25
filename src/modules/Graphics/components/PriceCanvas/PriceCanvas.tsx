import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawPrice } from './helpers/DrawPrice'
import { getTransformedNumber } from './helpers/getTransformedNumber'
import { getTransformedNumberWithFloat } from './helpers/getTrasnformedNumerWithFloat'
import { DrawLastUpdatedPrice } from './helpers/DrawLasrUpdatedPrice'
import { TimeStampToDateTimer } from './helpers/TimeStampToDate'
import { IGraphic } from '../../../../pages/MainPage/slices/GraphicSlice'
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
  graphic:IGraphic,
  fixedNumber:number,
  allDataCopy:string[][]
}
const PriceCanvas:React.FC<IPriceCanvas> = ({graphicRef, data, xLeft, howCandleInRange, startCandle,heightM,setHeightM, yMouse,candleWidth,candleSpacing,q,  width, setWidth,fulfieldGraphicRefAndVolumeAndPrice,setFixedNumber, graphic,fixedNumber,allDataCopy}) => {
  const refCanvas=useRef<HTMLCanvasElement>(null)
  const ctx=refCanvas.current?.getContext('2d')
  const refCanvas2=useRef<HTMLCanvasElement>(null)
  const [ifFirst, setIfFirst]=useState<boolean>(true)
  const ctx2=refCanvas2.current?.getContext('2d')
  const [maxPrice, setMaxPrice]=useState<number>(0)
  const [timer, setTimer]=useState<string>('00:00')
  const [minPrice, setMinPrice]=useState<number>(0)
  const [lastTimeStamp, setLastTimeStamp]=useState<number>(0)
  const [interval, setIntervalPrice]=useState<number>(0)
  const resizeHandler = () => {
      const { clientHeight} = graphicRef.current || {};
      if(clientHeight){
        setHeightM(clientHeight-100)
      }
    };
  useEffect(() => {
      window.addEventListener("resize", resizeHandler);
      fulfieldGraphicRefAndVolumeAndPrice(undefined,undefined,refCanvas2.current)
      resizeHandler()
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }, []);
  useEffect(()=>{
      if(ctx && refCanvas.current && data.length!==0){
        let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
        let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
        ctx.clearRect(0,0,refCanvas.current.width, refCanvas.current.height)
        let fixedBigNumber=graphic.typeCoin==='' ? 2 : 1
        DrawPrice(ctx, refCanvas.current, data, xLeft, startCandle, howCandleInRange, thatMaxPrice, thatMinPrice, candleWidth, candleSpacing, setWidth, width,setIntervalPrice, fixedBigNumber)
        DrawLastUpdatedPrice(ctx,refCanvas.current,allDataCopy[allDataCopy.length-1],thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-61,timer,graphic.distance,fixedNumber, width)
        setMaxPrice(()=>thatMaxPrice)
        setMinPrice(()=>thatMinPrice)
  }
  },[xLeft,width, timer,data, fixedNumber])
  useEffect(()=>{
      if(ctx && refCanvas.current && ifFirst && data.length!==0 && interval!==-Infinity && interval!==0){
        let thatMaxPrice=Math.max(...data.map((d)=>Number(d[2])));
        let thatMaxPriceSlice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
        let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
        let widthT=0
        let newI=''
        if(String(thatMaxPrice)[0]==='0'){
          let maxrounded=Number(getTransformedNumberWithFloat(thatMaxPrice,Math.ceil));
          newI=getTransformedNumberWithFloat(interval).replace(/\.?0+$/, "");
          widthT=ctx.measureText(String(maxrounded.toFixed(String(newI).split('.')[1] ? String(newI).split('.')[1].length+2 : 1))).width+8
        }else{
          let maxrounded=Number(getTransformedNumber(thatMaxPrice,undefined,Math.ceil))
          newI=String(interval)
          widthT=ctx.measureText(maxrounded.toFixed(String(interval).split('.')[1] ? String(interval).split('.')[1].length+1 : 1)).width+8
        }
        if(width!==widthT){
          setWidth(widthT+8)
        }
        setMaxPrice(()=>thatMaxPriceSlice)
        setMinPrice(()=>thatMinPrice)     
        let maxArr=newI.split('.')[1]
        let fixedNumber=maxArr ? String(newI).split('.')[1].length : graphic.typeCoin==='' ? 2 : 1
        setFixedNumber(fixedNumber)
        setIfFirst(()=>false)
      }
  },[data, interval, ifFirst])
  useEffect(()=>{
    const timerInterval=setInterval(()=>TimeStampToDateTimer(graphic.distance,setTimer), 1000);
    return(()=>{
      clearInterval(timerInterval);
    })
  },[graphic.distance])
  return (
    <div className={styles.wrap} style={{width: width, height:heightM? heightM+43 : undefined}}>
      <canvas ref={refCanvas}className={styles.canvas} height={heightM ? heightM+21 : undefined} width={width}></canvas>
      <canvas ref={refCanvas2} className={styles.canvas} height={heightM ? heightM+21 : undefined} width={width}></canvas>
    </div>
  )
}

export default PriceCanvas
 