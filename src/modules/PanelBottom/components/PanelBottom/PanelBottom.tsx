import React, { useRef, useState, useEffect } from 'react'
import styles from './styles.module.css'
import panel from './../../../../images/other/panel.svg'
import { IDataPanelB } from '../../../../pages/MainPage/components/MainPage/MainPage'
interface IPanelBottom{
    changeDataPanelB: (data:IDataPanelB)=>void,
    dataPanelR:boolean
}
export const PanelBottom: React.FC<IPanelBottom> = ({changeDataPanelB, dataPanelR}) => {
    const [height, setHeight]=useState<number>(45)
    const [remeberHeight, setRememberHeight]=useState<number>(200)
    const [activeTab, setActiveTab]=useState<number>(0)
    const [isFull, setisFull]=useState<boolean>(false)
    const ref=useRef<HTMLDivElement | null>(null)
    const refTop=useRef<HTMLDivElement | null>(null)
    const tabs:number[]=[1,2,3,4,5]
    const openPanel=(arg:number)=>{
        if(height===45 && activeTab===0){
            if(remeberHeight===45 || remeberHeight<45){
                setHeight(200); 
                setRememberHeight(200)
            }else{
                setHeight(remeberHeight)
            }
            setActiveTab(arg)
        }
        if(height!==45 && activeTab!==arg){
            setActiveTab(arg)
        }
        if(height!==45 && activeTab===arg){
            setHeight(45)
            setActiveTab(0)
        }
        if(height<45 && activeTab!==arg){
            setHeight(200)
            setActiveTab(arg)
        }
        if(isFull && activeTab!==arg){
            setActiveTab(arg)
        }
        if(isFull && height===45 && activeTab===arg){
            setActiveTab(0)
            setHeight(45)
            setisFull(false)
        }
    }
    const setFull=()=>{
        if(!isFull && activeTab===0){
            setActiveTab(1)
            setisFull(true)
        }
        if(!isFull && activeTab!==0){
            setisFull(true)
        }
        if(isFull && height===45){
            setisFull(false)
            setActiveTab(0)
        }
        if(isFull && height!==45){
            setisFull(false)
        }
        if(isFull && height<45){
            setisFull(false)
            setHeight(45)
            setActiveTab(0)
        }
    }
    useEffect(() => {
        if(ref.current!==null && refTop.current!==null){
            const resizeableEle = ref.current;
            const styles = window.getComputedStyle(resizeableEle);
            let heightd = parseInt(styles.height, 10);
            let y = 0;
            let fullWindow=window.innerHeight-77
            const onMouseMoveTopResize = (event:any) => {
            if(height===45 && !isFull){
                setActiveTab(1)
            }
            const dy = event.clientY - y;
            heightd = heightd - dy;
            y = event.clientY;
            setHeight(heightd)
            setRememberHeight(heightd)
            if(heightd===45 || heightd<45){
                setActiveTab(0)
                setHeight(45)
                setisFull(false)
            }
            if(activeTab===0 && heightd>46){
                setActiveTab(1)
            }
            if(heightd===fullWindow || heightd>fullWindow){
                setisFull(true)
                setHeight(45)
            }
            if(heightd<fullWindow){
                setisFull(false)
            }
            resizeableEle.style.height = `${heightd}px`;
            };
    
            const onMouseUpTopResize = (event:any) => {
            document.removeEventListener("mousemove", onMouseMoveTopResize);
            };
    
            const onMouseDownTopResize = (event:any) => {
            y = event.clientY;
            const styles = window.getComputedStyle(resizeableEle);
            resizeableEle.style.bottom = styles.bottom;
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
      }, [height,isFull]);
      useEffect(()=>{
        changeDataPanelB({isFull, height})
      },[height,isFull])
      useEffect(()=>{
        if(dataPanelR){
            setHeight(45)
            setisFull(false)
            setActiveTab(0)
        }
      },[dataPanelR])
  return (
    <div className={styles.wrap} style={{height: isFull ? '100vh' : height,borderTop: isFull ? 'none' : '5px solid  #2a2e39'}} ref={ref}>
        <div className={styles.resizer} ref={refTop}>
        </div>
        <div className={styles.header}>
            <div className={styles.tabs}>
                {tabs.map(tab=>(
                    <div key={tab} className={styles.tab} style={{backgroundColor: activeTab===tab ? '#323232' : ''}} onClick={()=>openPanel(tab)}>
                        <p>Вкладка {tab}</p>
                    </div>
                ))}
            </div>
            <div className={styles.openOnFullWindow} onClick={setFull}>
                 <img src={panel} alt="" />   
            </div>
        </div>
        <div className={styles.main}>
            Панель
        </div>
    </div>
  )
}