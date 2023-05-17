import React,{useState,useEffect, useRef} from 'react'
import { Glass } from '../../../Glass'
import { Order } from '../../../Order'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './styles.module.css'
import { IDataPanelB } from '../../../../pages/MainPage/components/MainPage/MainPage';
interface IPanelRight{
  dataPanelB:IDataPanelB,
  changeDataPanelR:(arg:boolean)=>void
}
interface KeyboardEvent {
    code: string;
  }
export const PanelRight:React.FC<IPanelRight> = ({dataPanelB,changeDataPanelR}) => {
    const [active, setActive]=useState<boolean>(false)
    const openPanel=(e:KeyboardEvent)=>{
        const input=document.getElementById('preset_input')
        if(e.code=='KeyE' && input!==document.activeElement){
            setActive(!active)
        }
    }
    useEffect(()=>{
        document.addEventListener('keydown', openPanel)
            return () => {
                document.removeEventListener("keydown", openPanel);
            };
        
    },[active])
    useEffect(()=>{
      if(dataPanelB.height!==45 || dataPanelB.isFull){
        setActive(false)
      }
    },[dataPanelB])
    useEffect(()=>{changeDataPanelR(active)},[active])
  return (
    <div className={styles.wrap}>
            <div className={styles.arrow}>
              <div className={styles.arrowWrap} style={{borderLeft: active ? 'none' : '4px solid #2a2e39'}} onClick={()=>setActive(!active)}>
                {active ? (<ArrowForwardIcon className={styles.forward} />) 
                  : 
                  (<ArrowBackIcon className={styles.back}/>)}   
              </div> 
            </div>
            {active ? (
                    <div className={styles.panel}>
                            <Glass/>
                            <Order/>
                    </div>
            ) : (null)}
    </div>
  )
}
