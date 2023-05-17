import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { changeDistance } from '../../slices/DistanceSetSlice'
import { setGraphicDistance } from '../../../../pages/MainPage/slices/GraphicSlice'

const DistanceSettings = () => {
    const distances=['1М', '5М', '15М', '30М', '1Ч', '4Ч','Д', 'Н','Mес']
    const distanceFromSlice=useAppSelector(state=>state.distance)
    const dispatch=useAppDispatch()
    const setDistance=(arg:string)=>{
        dispatch(setGraphicDistance(arg))
        dispatch(changeDistance(arg))
    }
  return (
    <div className={styles.wrap}>
        {distances.map((distance,index)=>(
            <IconMenu onClick={()=>setDistance(distance)} key={index} className={distance===distanceFromSlice ? styles.activeWrap : styles.disabledWrap}>
                <p>{distance}</p>
            </IconMenu>
        ))}
    </div>
  )
}

export default DistanceSettings