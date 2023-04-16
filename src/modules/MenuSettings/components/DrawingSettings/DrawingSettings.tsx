import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import trand from './../../../../images/drawing/trand.svg'
import dlin_poz from './../../../../images/drawing/dlin poz.svg'
import fib from './../../../../images/drawing/fib.svg'
import gorizontal from './../../../../images/drawing/gorizontal.svg'
import gr_luch from './../../../../images/drawing/gr luch.svg'
import magnit1 from './../../../../images/drawing/magnit 1.svg'
import korot_poz from './../../../../images/drawing/korot poz.svg'
import price from './../../../../images/drawing/price.svg'
import profile_ob from './../../../../images/drawing/profile ob.svg'
import rect from './../../../../images/drawing/rect.svg'
import rubber from './../../../../images/drawing/rubber.svg'
import text from './../../../../images/drawing/text.svg'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { changeInstrument } from '../../slices/DrawigSetSlice'
const DrawingSettings = () => {
    const instruments=[trand,gorizontal,gr_luch,dlin_poz,korot_poz,fib,rect,price,profile_ob,text,rubber,magnit1]
    const dispatch=useAppDispatch()
    const drawingChoosed=useAppSelector(state=>state.drawing)
    const setDrawing=(index:number)=>{
        const clicked=instruments[index].substring(24, instruments[index].indexOf('.'))
        dispatch(changeInstrument(clicked))
    }
    return (
    <div className={styles.wrap}>
        {instruments.map((instrument,index)=>(
            <IconMenu key={index} 
            className={instruments[index].substring(24, instruments[index].indexOf('.'))===drawingChoosed ? styles.activeDraw : styles.disabledDraw} 
            onClick={()=>setDrawing(index)}>
                <img src={instrument} alt="" />
            </IconMenu>
        ))}
    </div>
  )
}

export default DrawingSettings