import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import trand from './../../../../images/drawing/trand.svg'
import fib from './../../../../images/drawing/fib.svg'
import gorizontal from './../../../../images/drawing/gorizontal.svg'
import gr_luch from './../../../../images/drawing/gr luch.svg'
import magnit1 from './../../../../images/drawing/magnit 1.svg'
import price from './../../../../images/drawing/price.svg'
import profile_ob from './../../../../images/drawing/profile ob.svg'
import rect from './../../../../images/drawing/rect.svg'
import rubber from './../../../../images/drawing/rubber.svg'
import text from './../../../../images/drawing/text.svg'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { changeInstrument } from '../../slices/DrawigSetSlice'
import { deleteAllDrawingElements } from '../../../../pages/MainPage/slices/GraphicSlice'
const DrawingSettings = () => {
    const instruments=[trand,gorizontal,gr_luch,fib,rect,price,profile_ob,text]
    const dispatch=useAppDispatch()
    const drawingChoosed=useAppSelector(state=>state.drawing)
    const setDrawing=(index:number)=>{
        const clicked=instruments[index].substring(24, instruments[index].indexOf('.'))
        dispatch(changeInstrument({element:clicked}))
    }
    return (
    <div className={styles.wrap}>
        {instruments.map((instrument,index)=>(
            <IconMenu key={index} 
            className={instruments[index].substring(24, instruments[index].indexOf('.'))===drawingChoosed.name ? styles.activeDraw : styles.disabledDraw} 
            onClick={()=>setDrawing(index)}>
                <img src={instrument} alt="" />
            </IconMenu>
        ))}
        <div className={styles.disabledDraw }>
            <img onClick={()=>dispatch(deleteAllDrawingElements())} src={rubber} alt="" />
        </div>
        <div className={drawingChoosed.isMagnit===true ? styles.activeDraw : styles.disabledDraw }>
            <img onClick={()=>dispatch(changeInstrument({element:'magnit 1'}))} src={magnit1} alt="" />
        </div>
    </div>
  )
}

export default DrawingSettings