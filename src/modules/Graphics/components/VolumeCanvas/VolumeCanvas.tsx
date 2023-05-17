import React, { RefObject, useEffect, useRef, useState } from 'react'
import { CanvasStart } from '../../helpers/CanvasStart'
import styles from './styles.module.css'
interface IVolumeCanvas{
    graphicRef:RefObject<HTMLDivElement>
}
const VolumeCanvas:React.FC<IVolumeCanvas> = ({graphicRef}) => {
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth? graphicRef.current?.clientWidth-64 : undefined)
    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
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
        if(refCanvas.current){
          const ctx=refCanvas.current.getContext('2d')
        //   if(ctx){
        //       CanvasStart(ctx,refCanvas.current,'black')
        //   }
      }
      },[ width])
  return (
    <div className={styles.wrap} style={{width: width, height:'70px'}}>
        <canvas width={width} height='70px' ref={refCanvas} className={styles.canvas} id='main_canvas'></canvas>
    </div>
  )
}

export default VolumeCanvas