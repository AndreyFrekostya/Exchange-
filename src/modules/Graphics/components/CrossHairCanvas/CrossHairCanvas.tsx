import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CrossHairCanvasStart } from './helpers/CrossHairCanvasStart'
interface ICrossHairCanvas{
  graphicRef:RefObject<HTMLDivElement>,
  data:string[][]
}

const CrossHairCanvas:React.FC<ICrossHairCanvas> = ({graphicRef, data}) => {
  const [height, setHeight]=useState<number | undefined>(graphicRef.current?.clientHeight ? graphicRef.current?.clientHeight-142 : undefined)
  const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth-64 : undefined)
  const refCanvas=useRef<HTMLCanvasElement>(null) 
  const ctx=refCanvas.current?.getContext('2d')
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
    if(ctx && refCanvas.current && width && height){
      CrossHairCanvasStart(ctx, refCanvas.current,data,width,height, graphicRef)
    }
  },[height, width,data,refCanvas])
  return (
      <canvas className={styles.canvas} ref={refCanvas} width={width} height={height}></canvas>
  )

}

export default CrossHairCanvas