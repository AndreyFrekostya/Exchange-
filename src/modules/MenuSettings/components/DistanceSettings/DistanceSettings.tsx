import React from 'react'
import styles from './styles.module.css'
import IconMenu from '../../../../ui/IconMenu/IconMenu'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { changeDistance } from '../../slices/DistanceSetSlice'
import { setGraphicDistance } from '../../../../pages/MainPage/slices/GraphicSlice'

const DistanceSettings = () => {
    const distances=['1m', '5m', '15m', '30m', '1h', '4h','1d']
    const distanceFromSlice=useAppSelector(state=>state.distance)
    const graphics=useAppSelector(state=>state.graphics)
    const dispatch=useAppDispatch()
    const setDistace=(arg:string)=>{
        dispatch(setGraphicDistance(arg))
        dispatch(changeDistance(arg))
    }
  return (
    <div className={styles.wrap}>
        {distances.map((distance,index)=>(
            <IconMenu onClick={()=>setDistace(distance)} key={index} className={distance==distanceFromSlice ? styles.activeWrap : styles.disabledWrap}>
                <p>{distance}</p>
            </IconMenu>
        ))}
    </div>
  )
}

export default DistanceSettings