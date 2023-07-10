import React, { Dispatch, MouseEvent, MutableRefObject, RefObject, SetStateAction, WheelEvent, forwardRef, useEffect, useState} from 'react'
import styles from './styles.module.css'
import { ICrosshairCanvasProps } from '../../interfaces/CanvasInterfaces';
import { DrawCandleFunc } from '../../helpers/DrawCandleFunc';
import { DrawUpdatedLinePrice } from '../../helpers/DrawUpdatedLinePrice';
import { useLazyGetHisoricalKlinesQuery } from '../../../Graphics/api/KlinesSymbolApi';
import { TransformDistance } from '../../../Graphics/helpers/TransformDistance';
import { GetFactorDistance } from '../../helpers/GetFactorDistance';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { DrawDot } from '../../helpers/DrawDot';
import { DrawLineBetweenTwoDot } from '../../helpers/DrawLineBeetwenTwoDot';
import { yToPixelCoords } from '../../../Graphics/helpers/yToPixelCoords';
import { DrawGrLine } from '../../helpers/DrawGrLine';
import { DrawGrLuch } from '../../helpers/DrawGrLuch';
import { GetCoordsWithMagnit } from '../../helpers/GetCoordsWithMagnit';
import { addGrLine, addGrRay, addLine, addRect, remakeCoords, setLine, setRect } from '../../../../pages/MainPage/slices/GraphicSlice';
const CrosshairCanvas = React.memo(forwardRef<HTMLCanvasElement, ICrosshairCanvasProps>((props, mainCanvasRef) => {
  const crosshairContainer = mainCanvasRef && 'current' in mainCanvasRef ? mainCanvasRef.current : null;
  const dispatch=useAppDispatch()
  const drawingElementOnPanel=useAppSelector(state=>state.drawing.name)
  const drawingElementWithMagnit=useAppSelector(state=>state.drawing)
  const [startX, setStartX]=useState<number>(0)
  const [startY, setStartY]=useState<number>(0)
  const [getHistoricalKlines,{data:dataHistory=[]}]=useLazyGetHisoricalKlinesQuery()
  const [isAdded, setIsAdded]=useState<boolean>(true)
  const  handleMouseDown=(e:MouseEvent)=>{
    e.preventDefault();
    if(crosshairContainer){
      crosshairContainer.style.cursor='pointer';
      const mouseX = e.clientX - crosshairContainer.getBoundingClientRect().left
      const mouseY = e.clientY - crosshairContainer.getBoundingClientRect().top
      if(mouseX>crosshairContainer.clientWidth-19 && mouseX<crosshairContainer.clientWidth && mouseY+10>props.isMouseClientY+40 && mouseY-10<props.isMouseClientY+40){
        props.setActive({active:!props.active.active, y:mouseY})
      }else{
        props.setActive({active:false, y:0})
      }
      const allLeft=Math.abs(props.xLeft)+(mouseX-crosshairContainer.getBoundingClientRect().left)
      const neededCandle=props.data[Math.floor(allLeft/(props.candleWidth+props.candleSpacing))]
      if(props.xLeft!<-(props.candleWidth+props.candleSpacing)*2){
        props.setPressedCandle(()=>neededCandle)
      }else{
        props.setPressedCandle(()=>undefined)
      }
      //рисуем элементы рисования если есть
      let x=mouseX
      let y=mouseY
      let id=props.graphic.id
      if(props.ctx2 && crosshairContainer && props.mainCanvas){
        y=GetCoordsWithMagnit(drawingElementWithMagnit,neededCandle,y,props.dopHeightCanvas,props.maxPrice,props.maxPrice-props.minPrice,(props.mainCanvas.clientHeight-40-props.dopHeightCanvas)/2,props.yDown)
        if(drawingElementOnPanel=='trand'){
          if(props.drawingElements.lines.length!==0){
            if(props.drawingElements.lines[0].x1==0){
              dispatch(addLine({id:id,x:x,y:y}))
            }else if(props.drawingElements.lines[0].x2==0){
              dispatch(setLine({id:id,x:x,y:y}))
            }else{
              dispatch(addLine({id:id,x:x,y:y}))
            }
          }else{
            dispatch(addLine({id:id,x:x,y:y}))
          }
          DrawDot(props.ctx2, x,y)
        }else if(drawingElementOnPanel=='gorizontal'){
          let xDot=props.mainCanvas.clientWidth/2
          dispatch(addGrLine({id:id, y:y}))
          DrawGrLine(props.ctx2, y, 0, props.mainCanvas.clientWidth*2,xDot)
        }else if(drawingElementOnPanel=='gr luch'){
          dispatch(addGrRay({id:id, x:x,y:y}))
          DrawGrLuch(props.ctx2, x, y,props.mainCanvas.clientWidth*2)
        }else if(drawingElementOnPanel=='rect'){
          if(props.drawingElements.rectangles.length!==0){
            if(props.drawingElements.rectangles[0].x==0){
              dispatch(addRect({id:id, x:x, y:y}))
              DrawDot(props.ctx2, x,y)
            }else if(props.drawingElements.rectangles[0].x1==0){
              dispatch(setRect({id:id, x:x, y:y}))
            }else{
              dispatch(addRect({id:id, x:x, y:y}))
            }
          }else{
            dispatch(addRect({id:id, x:x, y:y}))
            DrawDot(props.ctx2, x,y)
          }
        }else if(drawingElementOnPanel=='price'){
          
        }
      }
    }
    //изменяем состяние
    props.setIsPressed(()=>true)
    setStartX((prev)=>e.clientX)
    setStartY((prev)=>e.clientY)
  }
  const handleMouseMove=(event:MouseEvent)=> {
    event.preventDefault();
    if(drawingElementOnPanel!=='trand' && drawingElementOnPanel!=='rect' && drawingElementOnPanel!=='fib' && drawingElementOnPanel!=='price' && drawingElementOnPanel!=='profile ob'){
      if(props.graphicRef.current && crosshairContainer){
        const mouseX = event.clientX - props.graphicRef.current.getBoundingClientRect().left;
        if(mouseX>crosshairContainer.clientWidth-19 && mouseX<crosshairContainer.clientWidth){
          crosshairContainer.style.cursor='pointer';
        }else if(!props.isPressed){
          crosshairContainer.style.cursor='crosshair';
        }
        props.setMouseX((prev)=>mouseX)
      }
      if(props.isPressed && crosshairContainer){
        const deltaX = startX-event.clientX;
        const newX=props.xLeft-deltaX
        const deltaY=startY-event.clientY
        const newY=props.yDown-deltaY
        const scrollCandle=newX>=0 ?  props.howCandleInRange-Math.floor(newX/(props.candleWidth+props.candleSpacing))   :Math.floor(newX/(props.candleWidth+props.candleSpacing))
        let ifCanMove=newX>= 0 ?Math.abs(scrollCandle)>2 : Math.abs(scrollCandle)<props.data.length-1
        if(ifCanMove){
          props.setXLeft(()=>newX)
        }
        if(props.dopHeightCanvas+40!==props.heightM){
          props.setYDown(()=>newY)
        }
        // Redraw graph
        if(crosshairContainer){
          let scrollCandle=Math.abs(newX/(props.candleWidth+props.candleSpacing))
          if(scrollCandle+props.howCandleInRange>props.data.length-props.howCandleInRange/3 && props.data[props.data.length-1][0]!==props.allDataCopy[props.allDataCopy.length-1][0]){
            let firstIndex=props.allDataCopy.indexOf(props.data[Math.floor(scrollCandle-props.howCandleInRange)]); 
            if(firstIndex!==-1){
              let lastIndex=firstIndex+props.howCandleInRange*2.5!<props.allDataCopy.length ? firstIndex+props.howCandleInRange*2.5 : props.allDataCopy.length
              let newX=0
              firstIndex=lastIndex===props.allDataCopy.length ? firstIndex-props.howCandleInRange*1.5 : firstIndex
              let startCandle=firstIndex>0 ? props.howCandleInRange*2.5 : props.allDataCopy.indexOf(props.data[Math.floor(scrollCandle)])
              firstIndex=firstIndex>0 ? firstIndex : 0
              newX=lastIndex===props.allDataCopy.length ? -(props.candleWidth+props.candleSpacing)*startCandle  : -(props.candleWidth+props.candleSpacing)*props.howCandleInRange
              const s=props.allDataCopy.slice(firstIndex,lastIndex)
              props.setXLeft(()=>newX)
              props.setData((prev)=>s)
              props.setStartCandle(()=>{
                if(lastIndex===props.allDataCopy.length){
                  return startCandle
                }else{
                  return props.howCandleInRange
                }
              })
            }
          }else if(props.xLeft>-50){
            let firstIndex=props.allDataCopy.indexOf(props.data[0])-props.howCandleInRange*2;
            let lastIndex=firstIndex+props.howCandleInRange*4
            if(firstIndex>0 && lastIndex!==-1){
              scrollCandle=scrollCandle+props.howCandleInRange*2
              let newX=-(props.candleWidth+props.candleSpacing)*scrollCandle
              const allData=props.allDataCopy.slice(firstIndex, lastIndex)
              props.setData((prev)=>allData)
              props.setXLeft(()=>newX)
              props.setStartCandle(()=>scrollCandle)
            }else if(firstIndex<0 && props.data[0]!==props.allDataCopy[0]){
              firstIndex=0
              lastIndex=firstIndex+props.howCandleInRange*4
              scrollCandle=scrollCandle+props.allDataCopy.indexOf(props.data[0])
              let newX=-(props.candleWidth+props.candleSpacing)*scrollCandle
              const allData=props.allDataCopy.slice(firstIndex, lastIndex)
              props.setData((prev)=>allData)
              props.setXLeft(()=>newX)
              props.setStartCandle(()=>scrollCandle)
            }
          }
            let copyHowCandleInRange=props.howCandleInRange
            if(props.xLeft>=0){
              scrollCandle=0
              copyHowCandleInRange=(crosshairContainer.clientWidth-props.xLeft)/(props.candleWidth+props.candleSpacing)
            }
            let thatMinPrice=Math.min(...props.data.slice(scrollCandle,scrollCandle+copyHowCandleInRange).map((d)=>Number(d[3])));
            let thatMaxPrice=Math.max(...props.data.slice(scrollCandle,scrollCandle+copyHowCandleInRange).map((d)=>Number(d[2])));
            let priceRange = thatMaxPrice - thatMinPrice;
            if(props.dopHeightCanvas+40!==props.heightM){
              thatMinPrice=props.minPrice
              thatMaxPrice=props.maxPrice
              priceRange=thatMaxPrice - thatMinPrice
            }
            if(props.ctx && props.mainCanvas){
              props.ctx.clearRect( 0 , 0 , props.mainCanvas.width ,props.mainCanvas.height  );
              DrawCandleFunc(props.ctx,props.data,props.mainCanvas.width,props.candleWidth,thatMaxPrice,priceRange,props.mainCanvas.height-40,props.candleSpacing,props.data.length, 0,props.xLeft,props.dopHeightCanvas,props.yDown)
              DrawUpdatedLinePrice(props.ctx,props.allDataCopy[props.allDataCopy.length-1],props.mainCanvas.height-40,thatMaxPrice,thatMaxPrice-thatMinPrice,props.xLeft,props.mainCanvas.width, props.dopHeightCanvas, props.yDown)
              props.ctx.clearRect(props.mainCanvas.width, 0,props.mainCanvas.width, props.mainCanvas.height) 
              props.ctx.clearRect(props.mainCanvas.width,0,props.mainCanvas.width,props.mainCanvas.height)
              //изменение коорд элементов рисования
              let absoluteMax=props.maxPrice>thatMaxPrice ? props.maxPrice : thatMaxPrice
              let notAbsolutMax=props.maxPrice>thatMaxPrice ? thatMaxPrice : props.maxPrice
              let rangeY=yToPixelCoords(absoluteMax,notAbsolutMax,absoluteMax-thatMinPrice,props.mainCanvas.height-40)
              rangeY=props.maxPrice>thatMaxPrice ? rangeY : 0-rangeY
                  // console.log(props.maxPrice,thatMaxPrice,props.minPrice,thatMinPrice,props.mainCanvas.height-40,rangeY)
                  // 30259.5 30257.4 30132.5 30132.5 456 7.666933546832067 2.1
                  // 30257.4 30259.5 30132.5 30132.5 456 -7.540157480309735 -2.1
              let newYCoords=0 //props.dopHeightCanvas+40!==props.heightM ? deltaY : rangeY
              console.log(deltaX)
              dispatch(remakeCoords({deltaX,deltaY:newYCoords}))
              props.setMaxPrice(()=>thatMaxPrice)
              props.setMinPrice(()=>thatMinPrice)
              props.setStartCandle(()=>scrollCandle)
            }
        }
        setStartX((prev)=>event.clientX)
        setStartY((prev)=>event.clientY)
      }
    }
  }
  const handleMouseUp=async(event:MouseEvent) =>{
    event.preventDefault();
    setStartX((prev)=>0)
    setStartY((prev)=>0)
    props.setMouseX((prev)=>0)
    props.setIsPressed((prev)=>false)
    if(props.graphicRef.current &&crosshairContainer){
      const mouseX = event.clientX - props.graphicRef.current.getBoundingClientRect().left;
      if(mouseX>crosshairContainer.clientWidth-19 && mouseX<crosshairContainer.clientWidth){
        crosshairContainer.style.cursor='pointer';
      }else{
        crosshairContainer.style.cursor='crosshair';
      }
    }
    if(props.xLeft>0 && isAdded){
      let howCandle=0
      let howCandleNeeded=props.xLeft/(props.candleSpacing+props.candleWidth)
      if(howCandleNeeded>=1000){
        howCandle=1500
      }else if( howCandleNeeded>=500){
        howCandle=1000
      }else{
        howCandle=500
      }
      let pixelInCandle=props.xLeft/(props.candleWidth+props.candleSpacing)
      let ammountFetching=Math.ceil(pixelInCandle/howCandle)
      let endTimeStamp=Number(props.data[0][0])
      let factor=GetFactorDistance(props.graphic.distance)
      setIsAdded(()=>false)
      for (let i=0; i<ammountFetching; i++){
        await  getHistoricalKlines({symbol:props.graphic.coin,interval:TransformDistance(props.graphic.distance),type:props.graphic.typeCoin, end:endTimeStamp, start:endTimeStamp-howCandle*factor*60000})
        endTimeStamp=endTimeStamp-howCandle*factor*60000
        if(i==ammountFetching-1){
          setIsAdded(()=>true)
        }
      }
    }
  }
  useEffect(()=>{
    if(dataHistory.length!==0){
      props.setHistoryData(dataHistory.concat(props.historyData))
    }
  },[dataHistory])
  const HandleWheel=(e:WheelEvent<HTMLCanvasElement>)=>{
    let candleWidthPrev:number=props.candleWidth
    let candleSpacingPrev:number=props.candleSpacing
    if (e.deltaY < 0) {
      if(props.candleWidth===1 && props.candleSpacing<0.8){
        props.setCandleSpacing(candleSpacingPrev+0.2)
        props.setIfPlus(true)
      }else if(props.candleWidth+1!==41 && props.candleSpacing+0.2!==4){
        props.setCandleWidth(candleWidthPrev+1)
        props.setCandleSpacing(candleSpacingPrev+0.2)
        props.setIfPlus(true)
      }
      if(props.candleWidth===0.3){
        props.setCandleWidth(1)
        props.setCandleSpacing(0.4)
        props.setIfPlus(true)
      }
    } else {
      if(props.candleWidth-1!==-1 && props.candleWidth!==0.3 && props.candleSpacing-0.2!==-0.4){
        props.setCandleWidth(candleWidthPrev-1)
        props.setCandleSpacing(Number((candleSpacingPrev-0.2).toFixed(1)))
        props.setIfPlus(false)
      }
      if(props.candleWidth===1 && props.candleSpacing-0.2!>0.2){
        props.setCandleSpacing(Number((candleSpacingPrev-0.2).toFixed(1)))
        props.setIfPlus(false)
      }
      if(props.candleWidth===1 && Number((props.candleSpacing-0.2).toFixed(1))==0.2){
        props.setCandleWidth(0.3)
        props.setCandleSpacing(0.2)
        props.setIfPlus(false)
      }
    }
  }
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp as  any)
    return () => {
      if(crosshairContainer){
        crosshairContainer.removeEventListener('mousedown', handleMouseDown as  any)
        crosshairContainer.removeEventListener('mousemove', handleMouseMove as  any)
        document.removeEventListener('mouseup', handleMouseUp as  any)
      }
    };
  }, [props.data,props.heightM, props.xLeft,props.candleSpacing,props.candleWidth, drawingElementWithMagnit]);
  useEffect(()=>{
    if(props.drawingElements.lines.length==0 && props.drawingElements.grLines.length==0 && props.drawingElements.grRay.length==0 && props.drawingElements.pricesRanges.length==0
      && props.drawingElements.rectangles.length==0 && props.drawingElements.fibonacciRetracement==null && props.drawingElements.grLines.length==0 && props.drawingElements.texts==null && props.drawingElements.pricesRanges.length==0 && props.drawingElements.fixedPriceVolume.length==0){
      if(props.ctx2 && crosshairContainer){
        props.ctx2.clearRect(0,0,crosshairContainer.clientWidth, crosshairContainer.clientHeight)
      }
    }
  },[props.drawingElements])
  return (
    <canvas onMouseDown={(e:MouseEvent)=>handleMouseDown(e)}
      onMouseMove={(e:MouseEvent)=>handleMouseMove(e)}
      onWheel = {(e:WheelEvent<HTMLCanvasElement>) => HandleWheel(e)}
      ref={mainCanvasRef} style={{zIndex:'6'}} className={styles.canvas2} width={props.graphicRef.current?.clientWidth ? props.graphicRef.current?.clientWidth-props.priceWidth : undefined} height={props.heightM? props.heightM+41 : undefined}>
    </canvas>
  )
}))

export default CrosshairCanvas
