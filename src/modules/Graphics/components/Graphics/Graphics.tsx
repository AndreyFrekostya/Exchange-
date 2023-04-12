import React from 'react'
import Graphic from '../Graphic/Graphic'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { setChoosedGraphic, setGraphicDistance } from '../../../../pages/MainPage/slices/GraphicSlice'
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice'
export const Graphics = () => {
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed==true)?.name)
  const dispatch=useAppDispatch()
  const graphics=useAppSelector(state=>state.graphics)
  const chooseGraphic=(id:number)=>{
    if(mode!=='one'){
      dispatch(setChoosedGraphic({id}))
      const item=graphics.find(graphic=>graphic.id==id)
      const choosedDistance=item?.distance
      dispatch(changeDistance(choosedDistance))
    }
  }
  return (
    <div className={styles.wrap}>
      {mode==='one' ?(
        <div className={styles.one}><Graphic onClick={()=>chooseGraphic(graphics[0].id)} graphic={graphics[0]}/></div>
      ) : (null)}
      {mode==='two_vertical' ?(
        <div className={styles.two_v}>
          <Graphic graphic={graphics[0]} onClick={()=>chooseGraphic(graphics[0].id)}/>
          <Graphic graphic={graphics[1]} onClick={()=>chooseGraphic(graphics[1].id)}/>
        </div>
      ) : (null)}
      {mode==='two_horizontal' ?(
        <div className={styles.two_h}>
          <Graphic graphic={graphics[0]} onClick={()=>chooseGraphic(graphics[0].id)}/>
          <Graphic graphic={graphics[1]} onClick={()=>chooseGraphic(graphics[1].id)}/>
        </div>
      ) : (null)}
      {mode==='four' ?(
        <div className={styles.four}>
          {graphics.map(graphic=>(
            <Graphic graphic={graphic} key={graphic.id} onClick={()=>chooseGraphic(graphic.id)}/>
          ))}
        </div>
      ) : (null)}
    </div>
  )
}

