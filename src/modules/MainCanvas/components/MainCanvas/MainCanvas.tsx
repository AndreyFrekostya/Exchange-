import React, { Dispatch, MouseEvent, MutableRefObject, RefObject, SetStateAction, WheelEvent,useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { DrawCandleFunc } from '../../helpers/DrawCandleFunc'
import { DrawCrosshairCanvas } from '../../helpers/DrawCrosshairCanvas'
import CardGraphic from '../../../../components/CardGraphic/CardGraphic'
import { RedrawOneCandle } from '../../helpers/RedrawOneCandle'
import CrosshairCanvas from '../CrosshairCanvas/CrosshairCanvas'
import { IMainCanvas } from '../../interfaces/CanvasInterfaces'
import { DrawUpdatedLinePrice } from '../../helpers/DrawUpdatedLinePrice'
import { DrawLastUpdatedPrice } from '../../../Graphics/components/PriceCanvas/helpers/DrawLasrUpdatedPrice'
import { useLazyGetHisoricalKlinesQuery } from '../../../Graphics/api/KlinesSymbolApi'
import { TransformDistance } from '../../../Graphics/helpers/TransformDistance'
import { GetFactorDistance } from '../../helpers/GetFactorDistance'
import { useAppSelector } from '../../../../hooks/redux-hooks'
import { DrawAllElements } from '../../helpers/DrawAllElements'

export const MainCanvas:React.FC<IMainCanvas> = React.memo(({graphicRef,data,howCandleInRange,setHowCandleInRange,candleWidth,setCandleWidth,xLeft,setXLeft, startCandle,setStartCandle,candleSpacing,setCandleSpacing,setIsMouseOnGraphic,isMouseOnGraphic,voRef,heightM, setHeightM, heightV, pressedCandle, setPressedCandle,priceWidth,priceRef,fixedNumber,mainCanvasRef, ifFirst, setIfFirst, lastData, setLastData, dataHistory, allDataCopy,
setAllDataCopy, setData,setIsGottenHistory, graphic, firstData,dataUpdated,isUsuallyScroll, dopHeightCanvas, setDopHeightCanvas,setYDown,yDown,ifPlus, setIfPlus}) => {
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth-priceWidth : undefined)
    const [maxPrice, setMaxPrice]=useState<number>(0)
    const [getHistoricalKlines,{data:historyDataKlines=[]}]=useLazyGetHisoricalKlinesQuery()
    const [minPrice, setMinPrice]=useState<number>(0)
    const [mouseX, setMouseX]=useState<number>(0)
    const [isPressed, setIsPressed]=useState<boolean>(false)
    const [historyData, setHistoryData]=useState<string[][]>([])
    const [active, setActive]=useState<{active:boolean, y:number}>({active:false,y:0})
    const [lastTimeStamp,setLastTimeStamp]=useState<number>(0)
    const drawingElements=useAppSelector(state=>state.graphics.find(graph=>graph.id==graphic.id)!.drawingElements)
    const drawingElementsOnPanel=useAppSelector(state=>state.drawing)
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const container=refContainer.current
    const crosshairContainer=mainCanvasRef?.current
    const ctx=refCanvas.current?.getContext('2d')
    const ctx2=crosshairContainer?.getContext('2d')
    const ctxP=priceRef?.current?.getContext('2d')
    const propsToCrosshairCanvas={setActive,
      active,
      isMouseClientY:isMouseOnGraphic.y,
      xLeft,
      setXLeft,
      data,
      candleWidth,
      setCandleWidth,
      candleSpacing,
      setPressedCandle,
      graphicRef,
      setMouseX,
      mouseX,
      setCandleSpacing,
      setIfPlus,
      priceWidth,
      heightM, 
      isPressed,
      setIsPressed,
      ctx,
      howCandleInRange,
      mainCanvas:refCanvas.current,
      setMaxPrice,
      setMinPrice,
      setStartCandle,
      historyData, 
      setHistoryData,
      graphic,
      allDataCopy,
      setData,
      dopHeightCanvas,
      setYDown,
      yDown,
      maxPrice:maxPrice,
      minPrice: minPrice,
      ctx2,
      drawingElements
    }
    useEffect(()=>{
      if(graphicRef.current){
        setWidth(graphicRef.current.clientWidth-priceWidth)
      }
    },[priceWidth])
  useEffect(()=>{
    if(ctx && refCanvas.current && container && ctx2 && crosshairContainer && priceRef?.current && fixedNumber ){

      //обозначение переменных

      let allWidth=candleWidth+candleSpacing
      let candles=Math.round(container.clientWidth/allWidth)
      let scrollCandle=0
      let allPrevCandle=0
      let newX=0
      let edge=0
      let ranger=!ifPlus ? candleSpacing<0.8 ? 0 : 1 : candleSpacing<=0.8 ? 0 : 1
      ranger=!ifPlus ? candleWidth===0.3 ? 0.7 : ranger : candleWidth===1 && Number(String((candleSpacing).toFixed(1)))===0.4 ? 0.7 : ranger
      let rangerCandleSpacing=0.2
      if(isUsuallyScroll){
        candles=Math.floor(container.clientWidth/allWidth)
        let lastOst=0
        if(ifPlus){
          scrollCandle=xLeft>=0 ? -Math.abs(xLeft/((candleWidth-ranger)+(candleSpacing-rangerCandleSpacing)))  :Math.abs(xLeft/((candleWidth-ranger)+(candleSpacing-rangerCandleSpacing)))
          lastOst=Math.abs(scrollCandle-container.clientWidth/((candleWidth-ranger)+(candleSpacing-rangerCandleSpacing)))
        }else{
          scrollCandle=xLeft>=0 ? -Math.abs(xLeft/((candleWidth+ranger)+(candleSpacing+rangerCandleSpacing)))  :Math.abs(xLeft/((candleWidth+ranger)+(candleSpacing+rangerCandleSpacing)))
          lastOst=Math.abs(scrollCandle-container.clientWidth/((candleWidth+ranger)+(candleSpacing+rangerCandleSpacing)))
        }
        edge=String(lastOst).split('.')[1] ? Number('0'+'.'+String(lastOst).split('.')[1]) : 0
        scrollCandle=scrollCandle+howCandleInRange-candles
        newX=-(scrollCandle*allWidth)
      }else{
        //вычисление прошлых свечей

        if(ifPlus){
          scrollCandle=xLeft>=0 ? -Math.abs(xLeft/((candleWidth-ranger)+(candleSpacing-rangerCandleSpacing)))  :Math.abs(xLeft/((candleWidth-ranger)+(candleSpacing-rangerCandleSpacing))) 
          allPrevCandle=scrollCandle+(mouseX/((candleWidth-ranger)+(candleSpacing-rangerCandleSpacing))) 
        }else{
          scrollCandle=xLeft>=0 ? -Math.abs(xLeft/((candleWidth+ranger)+(candleSpacing+rangerCandleSpacing)))  :Math.abs(xLeft/((candleWidth+ranger)+(candleSpacing+rangerCandleSpacing)))
          allPrevCandle=scrollCandle+(mouseX/((candleWidth+ranger)+(candleSpacing+rangerCandleSpacing)))
        }

        //вычисление сдвига

        newX=-((allPrevCandle*(allWidth))-mouseX)
        scrollCandle=newX>=0 ? -Math.abs(newX/allWidth) : Math.abs(newX/(allWidth))
      }

      //сбор истории
      if(ifPlus){
        if(Math.floor(scrollCandle)!<data.length-2 && Math.floor(startCandle)!<data.length-2){
        }else{
          scrollCandle=data.length-2
          newX=-(allWidth)*(data.length-2)
        }
      }
      let copyScrollCandle=scrollCandle>=0 ? scrollCandle : 0

      //максимальная и минимальная цена

      let thatMinPrice=Math.min(...data.slice(copyScrollCandle,copyScrollCandle+candles).map((d)=>Number(d[3])));
      let thatMaxPrice=Math.max(...data.slice(copyScrollCandle,copyScrollCandle+candles).map((d)=>Number(d[2])));
      let allData:string[][]=[]
      //slice graph
      let dopXLeft=0
      if(isUsuallyScroll){
        if(ifPlus){
          dopXLeft=edge*(candleWidth+candleSpacing)
          let firstIndex=allDataCopy.indexOf(data[Math.floor(scrollCandle-candles)]);
          firstIndex=firstIndex===-1 ? 0 : firstIndex
          let lastIndex=firstIndex+candles*3
          newX=firstIndex===0 ? newX : newX+(scrollCandle-candles)*(candleWidth+candleSpacing)-dopXLeft
          scrollCandle=newX>=0 ? 0 :  Math.abs(newX/allWidth)
          let copyHowCandleInRange=newX>=0 ? (crosshairContainer.clientWidth-newX)/(candleWidth+candleSpacing) : candles
          allData=allDataCopy.slice(firstIndex, lastIndex)
          thatMinPrice=Math.min(...allData.slice(scrollCandle,scrollCandle+copyHowCandleInRange).map((d)=>Number(d[3])));
          thatMaxPrice=Math.max(...allData.slice(scrollCandle,scrollCandle+copyHowCandleInRange).map((d)=>Number(d[2])));
          ctx.clearRect( container.scrollLeft-container.clientWidth , 0 , container.clientWidth*2, refCanvas.current.height  );
          DrawCandleFunc(ctx,allData,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,allData.length, 0,newX,dopHeightCanvas,yDown)
          setData((prev)=>allData)
          setStartCandle(()=>newX>=0 ? 0 :  Math.abs(newX/allWidth))
          scrollCandle=newX>=0 ? Math.floor(-Math.abs(newX/allWidth)) : Math.floor(Math.abs(newX/(candleWidth+candleSpacing)))
        }
      }else{
        if(ifPlus){
          dopXLeft=((scrollCandle-Math.floor(scrollCandle))+(candles-Math.floor(candles)))*(candleWidth+candleSpacing)
          let firstIndex=allDataCopy.indexOf(data[Math.floor(scrollCandle-candles)]);
          firstIndex=firstIndex===-1 ? 0 : firstIndex
          let lastIndex=firstIndex+candles*3
          newX=firstIndex===0 ? newX : newX+(scrollCandle-candles)*(candleWidth+candleSpacing)-dopXLeft
          scrollCandle=newX>=0 ? 0 :  Math.abs(newX/allWidth)
          let copyHowCandleInRange=newX>=0 ? (crosshairContainer.clientWidth-newX)/(candleWidth+candleSpacing) : candles
          allData=allDataCopy.slice(firstIndex, lastIndex)
          thatMinPrice=Math.min(...allData.slice(scrollCandle,scrollCandle+copyHowCandleInRange).map((d)=>Number(d[3])));
          thatMaxPrice=Math.max(...allData.slice(scrollCandle,scrollCandle+copyHowCandleInRange).map((d)=>Number(d[2])));
          ctx.clearRect( container.scrollLeft-container.clientWidth , 0 , container.clientWidth*2, refCanvas.current.height  );
          DrawCandleFunc(ctx,allData,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,allData.length, 0,newX,dopHeightCanvas,yDown)
          setData((prev)=>allData)
          setStartCandle(()=>newX>=0 ? 0 :  Math.abs(newX/allWidth))
          scrollCandle=newX>=0 ? Math.floor(-Math.abs(newX/allWidth)) : Math.floor(Math.abs(newX/(candleWidth+candleSpacing)))
        }else{
          let firstIndex=allDataCopy.indexOf(data[Math.floor(scrollCandle)])-candles
          if(firstIndex>=0){
            dopXLeft=(scrollCandle-Math.floor(scrollCandle))*(candleWidth+candleSpacing)
            let lastIndex=firstIndex+candles*3
            scrollCandle=candles
            newX=-candles*(candleSpacing+candleWidth)-dopXLeft
            allData=allDataCopy.slice(firstIndex, lastIndex)
            thatMinPrice=Math.min(...allData.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[3])));
            thatMaxPrice=Math.max(...allData.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[2])));
            ctx.clearRect( container.scrollLeft-container.clientWidth , 0 , container.clientWidth*2, refCanvas.current.height  );
            DrawCandleFunc(ctx,allData,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,allData.length, 0,newX,dopHeightCanvas,yDown)
            setData((prev)=>allData)
            setStartCandle(()=>newX>=0 ? 0 :  Math.abs(newX/allWidth))
            scrollCandle=newX>=0 ? Math.floor(-Math.abs(newX/allWidth)) : Math.floor(Math.abs(newX/(candleWidth+candleSpacing)))
          }else{
            dopXLeft=(scrollCandle-Math.floor(scrollCandle))*(candleWidth+candleSpacing)
            firstIndex=0
            scrollCandle=Math.abs(allDataCopy.indexOf(data[Math.floor(scrollCandle)])-allDataCopy.indexOf(data[0]))
            newX=newX-allDataCopy.indexOf(data[0])*(candleSpacing+candleWidth)
            let lastIndex=firstIndex+candles*3
            allData=allDataCopy.slice(firstIndex, lastIndex)
            thatMinPrice=Math.min(...allData.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[3])));
            thatMaxPrice=Math.max(...allData.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[2])));
            ctx.clearRect( container.scrollLeft-container.clientWidth , 0 , container.clientWidth*2, refCanvas.current.height  );
            DrawCandleFunc(ctx,allData,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,allData.length, 0,newX,dopHeightCanvas,yDown)
            setData((prev)=>allData)
            setStartCandle(()=>newX>=0 ? 0 :  Math.abs(newX/allWidth))
            scrollCandle=newX>=0 ? Math.floor(-Math.abs(newX/allWidth)) : Math.floor(Math.abs(newX/(candleWidth+candleSpacing)))
          }
        }
      }
      fetching(newX, allWidth)
        
      DrawUpdatedLinePrice(ctx,allDataCopy[allDataCopy.length-1],refCanvas.current.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,newX,refCanvas.current.width,dopHeightCanvas, yDown)

      //вычисление нужной свечи

      let allLeft=newX>=0 ? (isMouseOnGraphic.x-crosshairContainer.getBoundingClientRect().left)-Math.abs(newX) : Math.abs(newX)+(isMouseOnGraphic.x-crosshairContainer.getBoundingClientRect().left)
      let neededCandle=allData[Math.floor(allLeft/(allWidth))]
      let x=undefined
      if(allData.indexOf(neededCandle)!==-1){
         x=(allData.indexOf(neededCandle)-scrollCandle)*(allWidth)+candleWidth/2-dopXLeft
      }

      //отрисовка и смена состояний

      DrawCrosshairCanvas(ctx2,crosshairContainer,allData,candleWidth,candleSpacing,Math.abs(newX/(candleSpacing+candleWidth)), isMouseOnGraphic.q,voRef,isPressed,isMouseOnGraphic.x,isMouseOnGraphic.y+41, newX, isMouseOnGraphic.x,thatMaxPrice,thatMinPrice,refCanvas.current.height-40,drawingElementsOnPanel,ctxP,priceRef?.current,howCandleInRange,fixedNumber,priceWidth,yDown,dopHeightCanvas,drawingElements,x,undefined)
      setXLeft(()=>newX)
      // setStartCandle(copyScrollCandle)
      setMaxPrice(()=>thatMaxPrice)
      setMinPrice(()=>thatMinPrice)
      setHowCandleInRange(candles)
    }
  },[candleWidth, candleSpacing, ifPlus])
  //Нужно переделать этот момент, бесконечный ререндеринг
  async function fetching(newX:number, allWidth:number){
    if(newX>=0){
      let howCandle=0
      let howCandleNeeded=newX/(candleSpacing+candleWidth)
      if(howCandleNeeded>=1000){
        howCandle=1500
      }else if( howCandleNeeded>=500){
        howCandle=1000
      }else{
        howCandle=500
      }
      let ammountFetching=Math.ceil(newX/(allWidth*howCandle))
      let endTimeStamp=Number(data[0][0])
      let factor=GetFactorDistance(graphic.distance)
      for (let i=0; i<ammountFetching; i++){
        await  getHistoricalKlines({symbol:graphic.coin,interval:TransformDistance(graphic.distance),type:graphic.typeCoin, end:endTimeStamp, start:endTimeStamp-howCandle*factor*60000})
        endTimeStamp=endTimeStamp-howCandle*factor*60000
      }
    }
  }
  const resizeHandler = () => {
    const { clientHeight, clientWidth } = graphicRef.current || {};
    if(clientHeight && clientWidth ){
      setHeightM(clientHeight-heightV-72)
      setDopHeightCanvas(clientHeight-heightV-72-40)
      setWidth(clientWidth-priceWidth)
    };
  }
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler()
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
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
        if(xLeft>=0){
          setXLeft(()=>newX)
          NewStartCandle=0
        }else{
          newX=xLeft
          NewStartCandle=startCandle
        }
        let thatMinPrice=Math.min(...data.slice(NewStartCandle,NewStartCandle+candles).map((d)=>Number(d[3])));
        let thatMaxPrice=Math.max(...data.slice(NewStartCandle,NewStartCandle+candles).map((d)=>Number(d[2])));
        ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
        DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,newX,dopHeightCanvas,yDown)
        DrawUpdatedLinePrice(ctx,allDataCopy[allDataCopy.length-1],refCanvas.current.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,xLeft,refCanvas.current.width, dopHeightCanvas, yDown)
        ctxP?.clearRect(0,0,priceRef?.current.width,priceRef?.current.height)
        ctx2.clearRect( 0 , 0 , crosshairContainer.width , crosshairContainer.height  );
        DrawAllElements(ctx2,crosshairContainer,drawingElements,isMouseOnGraphic.x,0)
        setStartCandle(NewStartCandle)
        setMaxPrice(()=>thatMaxPrice)
        setMinPrice(()=>thatMinPrice)
      }
    }
  },[heightM, width])
      // useEffect(()=>{
      //   if(dataUpdated.length!==0 && data.length!==0){
      //     if(allDataCopy[allDataCopy.length-1][0]!==dataUpdated[0]){
      //       if(data[data.length-1]==allDataCopy[allDataCopy.length-1]){
      //         setData(()=>[...data,dataUpdated])
      //       }
      //       setAllDataCopy(()=>[...allDataCopy,dataUpdated])
      //     }else{
      //       if(data[data.length-1]==allDataCopy[allDataCopy.length-1]){
      //         let copy=data.slice()
      //         copy.pop()
      //         setData(()=>[...copy,dataUpdated])
      //       }
      //       let copy=allDataCopy.slice()
      //       copy.pop()
      //       setAllDataCopy([...copy,dataUpdated])
      //     }
      //     if(container && refCanvas.current && ctx && allDataCopy.length!==0 && data[data.length-1]==allDataCopy[allDataCopy.length-1]){
      //       let lastCandleTimeStamp=Number(allDataCopy[allDataCopy.length-1][0])
      //       let startCandle=xLeft>=0 ? 0 : Math.abs(xLeft/(candleWidth+candleSpacing))
      //       if(startCandle>data.length-howCandleInRange){
      //         if(lastCandleTimeStamp!==lastTimeStamp && lastTimeStamp!==0){
      //           let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
      //           let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
      //           ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
      //           setXLeft(()=>xLeft-(candleWidth+candleSpacing))
      //           DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft,dopHeightCanvas,yDown)
      //           setStartCandle(startCandle-1)
      //           setMaxPrice(()=>thatMaxPrice)
      //           setMinPrice(()=>thatMinPrice)
      //         }else{
      //           let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
      //           let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
      //           ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
      //           DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft,dopHeightCanvas,yDown)
      //           setMaxPrice(()=>thatMaxPrice)
      //           setMinPrice(()=>thatMinPrice)
      //         }
      //         setLastTimeStamp(lastCandleTimeStamp)
      //       }else{
      //         ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
      //         let thatMinPrice=Math.min(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[3])));
      //         let thatMaxPrice=Math.max(...data.slice(startCandle,startCandle+howCandleInRange).map((d)=>Number(d[2])));
      //         DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft,dopHeightCanvas,yDown)
      //       }
      //       DrawUpdatedLinePrice(ctx,allDataCopy[allDataCopy.length-1],refCanvas.current.height-40,maxPrice,maxPrice-minPrice,xLeft,refCanvas.current.width,dopHeightCanvas, yDown)
      //     }
      //   }
      // },[dataUpdated])
      useEffect(()=>{
        if(firstData.length!==0){setLastData(()=>data[0])}
        if(firstData.length!==0 && mainCanvasRef.current){
          if(container && crosshairContainer&& ctx2){
            let candles=Math.round(container.clientWidth/(candleWidth+candleSpacing))
            let ranger=0
            if(firstData.length<candles){
              setHowCandleInRange(firstData.length)
              candles=firstData.length
            }else{
              setHowCandleInRange(candles+1)
              ranger=50
            }
            let newX=-(candleWidth+candleSpacing)*firstData.length+candles*(candleWidth+candleSpacing)-ranger
            let scrollCandle=newX>=0 ? 0 : Math.abs(newX/(candleWidth+candleSpacing))
            let thatMinPrice=Math.min(...firstData.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[3])));
            let thatMaxPrice=Math.max(...firstData.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[2])));
            let priceRange = thatMaxPrice - thatMinPrice;
            if(ctx && refCanvas.current){
              ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
              DrawCandleFunc(ctx,firstData,refCanvas.current.width,candleWidth,thatMaxPrice,priceRange,refCanvas.current.height-40,candleSpacing,firstData.length, 0,newX,dopHeightCanvas,yDown)
              DrawUpdatedLinePrice(ctx,firstData[firstData.length-1],refCanvas.current.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,newX,refCanvas.current.width,dopHeightCanvas, yDown)
              DrawAllElements(ctx2,crosshairContainer,drawingElements,0,0)
              setXLeft(()=>newX)
              setMaxPrice(()=>thatMaxPrice)
              setMinPrice(()=>thatMinPrice)
              setHowCandleInRange(candles)
              setStartCandle(()=>scrollCandle)
              setData(()=>firstData)
              setAllDataCopy(()=>firstData)
              setIfFirst(false)
              setHistoryData(()=>[])
            }
          }
        }
      },[firstData])
      useEffect(()=>{
        if(historyData.length!==0 && historyData.length!==1 && ctx && refCanvas.current && crosshairContainer && container){
          let howCandleInRange=Math.round(container.clientWidth/(candleWidth+candleSpacing))
          let allData=historyData.concat(data).slice(0, historyData.length+howCandleInRange*1.5)
          let newX=-(candleWidth+candleSpacing)*historyData.length
          setXLeft((prev)=>prev+newX)
          let scrollCandle=Math.abs((newX+xLeft)/(candleWidth+candleSpacing))
          let thatMinPrice=Math.min(...allData.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[3])));
          let thatMaxPrice=Math.max(...allData.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[2])));
          setAllDataCopy(()=>historyData.concat(allDataCopy))
          setData(()=>allData)
          setStartCandle(()=>scrollCandle)
          ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
          DrawCandleFunc(ctx,allData,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,allData.length, 0,newX+xLeft,dopHeightCanvas,yDown)
          DrawUpdatedLinePrice(ctx,allDataCopy[allDataCopy.length-1],refCanvas.current.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,newX+xLeft,refCanvas.current.width,dopHeightCanvas, yDown)
          setMaxPrice(()=>thatMaxPrice)
          setHowCandleInRange(()=>howCandleInRange)
          setMinPrice(()=>thatMinPrice)
          setIsGottenHistory(()=>true)
          setHistoryData(()=>[])
        }
      },[historyData])
      useEffect(()=>{
        if(historyDataKlines.length!==0){
          setHistoryData(()=>historyDataKlines)
        }
      },[historyDataKlines])
      const handleCrosshair=(e:any)=>{
        if(ctx2 && crosshairContainer && refCanvas.current && priceRef?.current && fixedNumber && data.length!==0){
          let y=e.clientY-refCanvas.current.getBoundingClientRect().top
          setIsMouseOnGraphic({x:e.clientX,y:y,q:true})
          let scrollCandle=xLeft >=0 ? -Math.abs(xLeft/(candleSpacing+candleWidth)) : Math.abs(xLeft/(candleSpacing+candleWidth))
          DrawCrosshairCanvas(ctx2,crosshairContainer,data,candleWidth,candleSpacing,scrollCandle, isMouseOnGraphic.q,voRef,isPressed,e.clientX,e.offsetY, xLeft, e.offsetX,maxPrice,minPrice,refCanvas.current.height-40,drawingElementsOnPanel,ctxP,priceRef?.current,howCandleInRange,fixedNumber,priceWidth,yDown,dopHeightCanvas,drawingElements,undefined, pressedCandle)
        }
      }
      const handleCrosshairLeave=(e:any)=>{
        if(crosshairContainer && ctx2){
          ctx2.clearRect(0,0,crosshairContainer.width,crosshairContainer.height)
          const volumeCanvas=voRef?.current
          const ctxV=volumeCanvas?.getContext('2d')
          const priceCanvas=priceRef?.current
          const ctxP=priceCanvas?.getContext('2d')
          setIsMouseOnGraphic({y:-200,q:false, x:-200})
          if(ctxV && volumeCanvas && ctxP && priceCanvas){
            ctxV.clearRect(0,0,volumeCanvas.width,volumeCanvas.height)
            ctxP.clearRect(0,0,priceCanvas.width,priceCanvas.height)
          }
          DrawAllElements(ctx2,crosshairContainer,drawingElements,e.clientX,0,)
        }
      }
      useEffect(()=>{
        crosshairContainer?.addEventListener('mousemove', handleCrosshair)
        crosshairContainer?.addEventListener('mouseleave', handleCrosshairLeave)
        return ()=>{
          crosshairContainer?.removeEventListener('mousemove', handleCrosshair)
          crosshairContainer?.removeEventListener('mouseleave', handleCrosshairLeave)
        }

      },[xLeft, isPressed,fixedNumber,priceRef,priceWidth,data, maxPrice, minPrice, drawingElements, yDown, dopHeightCanvas, drawingElementsOnPanel])

      useEffect(()=>{
        if(ctx && refCanvas.current && container && data.length!==0 && dopHeightCanvas!==0){
          let Ydown=dopHeightCanvas+40==heightM  ? 0 : yDown
          ctx.clearRect( 0 , 0 , refCanvas.current.width , refCanvas.current.height  );
          let candles=Math.round(container.clientWidth/(candleWidth+candleSpacing))
          let scrollCandle=Math.abs(xLeft/(candleWidth+candleSpacing))
          let thatMaxPrice=dopHeightCanvas+40==heightM ? Math.max(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[2]))) : maxPrice
          let thatMinPrice=dopHeightCanvas+40==heightM ? Math.min(...data.slice(scrollCandle,scrollCandle+candles).map((d)=>Number(d[3]))) : minPrice
          DrawCandleFunc(ctx,data,refCanvas.current.width,candleWidth,thatMaxPrice,thatMaxPrice-thatMinPrice,refCanvas.current.height-40,candleSpacing,data.length, 0,xLeft,dopHeightCanvas,Ydown)
          DrawUpdatedLinePrice(ctx,allDataCopy[allDataCopy.length-1],refCanvas.current.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,xLeft,refCanvas.current.width, dopHeightCanvas, yDown)
        }
      },[dopHeightCanvas])
  return (
    <>  
      <CrosshairCanvas {...propsToCrosshairCanvas} ref={mainCanvasRef} />
      <div className={styles.wrap} ref={refContainer} style={{width: graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined, height: heightM}}>
        <canvas width={graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-priceWidth : undefined} height={heightM} ref={refCanvas} className={styles.canvas}></canvas>
        {active.active ? <CardGraphic active={active} setActive={setActive} crosshairRef={refCanvas.current}/>: null}
      </div>
    </>
  )
})
