import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CanvasStart } from '../../helpers/CanvasStart'
interface IDateCanvas{
    graphicRef:RefObject<HTMLDivElement>
}
const DateCanvas:React.FC<IDateCanvas> = ({graphicRef}) => {
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-64 : undefined)
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
            // if(ctx){
            //      CanvasStart(ctx,refCanvas.current,'red')
            // }
        }
    },[width])
  return (
    <div className={styles.wrap} style={{width: width, height:'32px'}}>
        <canvas ref={refCanvas} className={styles.canvas} height='32px' width={width}></canvas>
    </div>
  )
}

export default DateCanvas
