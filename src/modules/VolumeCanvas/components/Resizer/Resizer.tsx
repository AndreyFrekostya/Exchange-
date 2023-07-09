import React, { FC, useEffect, useRef } from 'react'
import styles from './styles.module.css'
import { IResizer } from '../../interfaces/VolumeCanvasInterfaces';
const Resizer:FC<IResizer> = ({refContainer,graphicRef,setHeightV,setHeightM,heightV,setDopHeight,dopHeight, dopHeightCanvas, setDopHeightCanvas, heightM}) => {
    const refTop=useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(refTop.current!==null && refContainer.current){
            const resizeableEle = refContainer.current;
            let y = 0;
            const styles = window.getComputedStyle(resizeableEle);
            let heightd = parseInt(styles.height, 10);
            const onMouseMoveTopResize = (event:any) => {
            const dy = event.clientY - y;
            heightd = heightd - dy;
            y = event.clientY;
            const rangeBetweenHeightVolume=heightV-dopHeight
            const rangeBetweenHeightCanvas=heightM? heightM-dopHeightCanvas : 0
            let range=0
            if(graphicRef.current?.clientHeight){
                range=graphicRef.current?.clientHeight-180<70 ? 70 : 0
            }
            
            if(refContainer.current && refTop.current && graphicRef.current ){
                if(heightd-1<42){
                    setHeightV(()=>42);
                    refTop.current.style.top = `${graphicRef.current.clientHeight-77}px`;
                }else if(heightd+1>graphicRef.current?.clientHeight-180+range){
                    setHeightV(()=>{
                    if(graphicRef.current?.clientHeight!==undefined){
                        return graphicRef.current?.clientHeight-180+range
                    }else{
                        return 0
                    }
                })
                refTop.current.style.top = `${graphicRef.current.clientHeight-(graphicRef.current.clientHeight-145+range)}px`;
                }else{
                    setHeightV(()=>heightd)
                    setDopHeight(()=>heightd-rangeBetweenHeightVolume)
                    setDopHeightCanvas(()=>{
                        if(graphicRef.current?.clientHeight){
                          return graphicRef.current?.clientHeight-heightd-70-rangeBetweenHeightCanvas
                        }else{
                          return 0
                        }
                    })
                    setHeightM(()=>{
                        if(graphicRef.current?.clientHeight){
                          return graphicRef.current?.clientHeight-heightd-70
                        }else{
                          return 0
                        }
                    })
                    refTop.current.style.top = `${graphicRef.current.clientHeight-heightd-33}px`;
                    }
                };   
            }
            const onMouseUpTopResize = (event:any) => {
              document.removeEventListener("mousemove", onMouseMoveTopResize);
            };
    
            const onMouseDownTopResize = (event:any) => {
              const styles = window.getComputedStyle(resizeableEle);
              resizeableEle.style.bottom = styles.bottom;
              y = event.clientY;
              document.addEventListener("mousemove", onMouseMoveTopResize);
              document.addEventListener("mouseup", onMouseUpTopResize);
            };
            refTop.current.addEventListener("mousedown", onMouseDownTopResize);
        
            return () => {
                if(refTop.current!==null){
                    refTop.current.removeEventListener("mousedown", onMouseDownTopResize); 
                }
            };
        }
    }, [heightV, dopHeight, dopHeightCanvas, heightM]);
  return (
    <div className={styles.resizer} ref={refTop}></div>
  )
}

export default Resizer