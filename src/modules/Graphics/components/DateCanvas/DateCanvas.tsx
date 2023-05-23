import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { CanvasGraphicStart } from '../../helpers/CanvasGraphicStart'
import { DateCanvasStart } from './helpers/DateCanvasStart'
interface IDateCanvas{
    graphicRef:RefObject<HTMLDivElement>, 
    data:string[][]
}
const DateCanvas:React.FC<IDateCanvas> = ({graphicRef, data}) => {
    const refCanvas=useRef<HTMLCanvasElement>(null)
    const [width, setWidth]=useState<number | undefined>(graphicRef.current?.clientWidth ? graphicRef.current?.clientWidth-63 : undefined)
    const resizeHandler = () => {
        const {clientWidth } = graphicRef.current || {};
        if(clientWidth){
            setWidth(clientWidth-63)
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
            if(ctx){
                 DateCanvasStart(ctx,refCanvas.current, data)
            }
        }
    },[width])
  return (
    <div className={styles.wrap} style={{width: width, height:'26px'}}>
        <canvas ref={refCanvas} className={styles.canvas} height='25px' width={width}></canvas>
    </div>
  )
}

export default DateCanvas
