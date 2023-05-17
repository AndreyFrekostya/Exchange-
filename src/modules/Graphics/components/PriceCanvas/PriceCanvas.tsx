import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CanvasStart } from '../../helpers/CanvasStart'
interface IPriceCanvas{
  graphicRef:RefObject<HTMLDivElement>,
}
const PriceCanvas:React.FC<IPriceCanvas> = ({graphicRef}) => {
  const [height, setHeight]=useState<number | undefined>(graphicRef.current?.clientHeight ? graphicRef.current?.clientHeight-102 : undefined)
  const refCanvas=useRef<HTMLCanvasElement>(null)
  const resizeHandler = () => {
      const { clientHeight} = graphicRef.current || {};
      if(clientHeight){
        setHeight(clientHeight-102)
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
      if(refCanvas.current){
        const ctx=refCanvas.current.getContext('2d')
        // if(ctx){
        //   CanvasStart(ctx,refCanvas.current,'green')
        // }
    }
    },[height])
  return (
    <div className={styles.wrap} style={{width: '64px', height:height}}>
        <canvas ref={refCanvas}className={styles.canvas} height={height} width='64px'></canvas>
    </div>
  )
}

export default PriceCanvas
