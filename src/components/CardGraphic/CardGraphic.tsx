import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import styles from './styles.module.css'
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
type Active={
    active:boolean, y:number
}
interface ICardGraphic{
    active:Active,
    setActive:Dispatch<SetStateAction<Active>>,
    crosshairRef: HTMLCanvasElement | null,
    ctx:CanvasRenderingContext2D | null | undefined,
    minPrice:number,
    maxPrice:number, 
    yDown:number,
    canvas:HTMLCanvasElement| null,
    dopHeightCanvas:number,
    
}
const CardGraphic:React.FC<ICardGraphic> = ({active, setActive,crosshairRef,ctx, minPrice, maxPrice, yDown,canvas, dopHeightCanvas}) => {
    const ref=useRef<HTMLDivElement>(null)
    const [price, setPrice]=useState<number>(0)
    const getTop=()=>{
        if(canvas){
            let rangeHeight=(canvas.height-dopHeightCanvas)/2
            if( crosshairRef && active.y!==0){
                if(active.y-30+192>crosshairRef.clientHeight){
                    let price=minPrice + (dopHeightCanvas-active.y+yDown+rangeHeight)*(maxPrice-minPrice)/dopHeightCanvas;
                    setPrice(()=>price)
                    console.log(active.y, active.y-50-192)
                    return active.y-50-192+'px'
                }else{
                    return active.y-30+'px'
                }
            }
        }   
    }
  return (
    <div ref={ref} className={styles.wrap} style={{top:getTop(), right:'0px'}}>
        <div style={{marginBottom:'6px'}} className={styles.item}>
            <AddAlarmIcon/> 
            <p>Добавить оповещения на монету на цену</p>
        </div>
        <div style={{borderTop:'1px solid #434651'}}>
            <div style={{marginTop:'6px'}} className={styles.item}>
                <KeyboardArrowDownOutlinedIcon/>
                <p>Продать монету Лимит 1 @ {price}</p>
            </div>
        </div>
        <div className={styles.item}>
            <KeyboardArrowUpOutlinedIcon/>
            <p>Купить монету Лимит 1 @ {price}</p>
        </div>
        <div style={{borderBottom:'1px solid #434651'}}>
            <div style={{paddingLeft:'37px',marginBottom:'6px'}} className={styles.item}>
                <p>Создать новую заявку...</p>
            </div>
        </div>
        <div style={{marginTop:'6px'}} className={styles.item}>
            <HorizontalRuleIcon/>
            <p>Нарисовать горизонтальную линию на {price}</p>
        </div>
    </div>
  )
}

export default CardGraphic