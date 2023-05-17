import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CanvasStart } from '../../helpers/CanvasStart'
import { IGraphic } from '../../../../pages/MainPage/slices/GraphicSlice'
interface IMainCanvas{
    graphicRef:RefObject<HTMLDivElement>,
    data:string[][],
    graphic:IGraphic
}

const MainCanvas:React.FC<IMainCanvas> = ({graphicRef,data,graphic}) => {
    const [height, setHeight]=useState<number | undefined>(graphicRef.current?.clientHeight ? graphicRef.current?.clientHeight-142 : undefined)
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const refContainer=useRef<HTMLDivElement>(null)
    const refCanvasCrossHair=useRef<HTMLCanvasElement>(null)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth-64 : undefined)
    const [maxPrice, setMaxPrice]=useState<number>(0)
    const [minPrice, setMinPrice]=useState<number>(0)
    const resizeHandler = () => {
        const { clientHeight, clientWidth } = graphicRef.current || {};
        if(clientHeight && clientWidth){
          setHeight(clientHeight-142)
          setWidth(clientWidth-64)
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
        if(refCanvas.current && refCanvasCrossHair.current){
          const ctx=refCanvas.current.getContext('2d')
          const ctx2=refCanvasCrossHair.current.getContext('2d')
          if(ctx && data.length!==0 && ctx2){
              CanvasStart(ctx,refCanvas.current,ctx2,refCanvasCrossHair.current,data,refContainer)
          }
      }
      },[height, width,data,refCanvas,refCanvasCrossHair])
  return (
    <div className={styles.wrap} ref={refContainer} style={{width: graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-64 : undefined, height:height}} id='main_canvas'>
        <canvas width={width} height={height} ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
        <canvas ref={refCanvasCrossHair} className={styles.canvas} width={width} height={height} id='crosshair_canvas'></canvas>
    </div>
  )
}

export default MainCanvas