import React, { useEffect } from 'react'
import Graphic from '../Graphic/Graphic'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { setChoosedGraphic } from '../../../../pages/MainPage/slices/GraphicSlice'
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice'
export const Graphics = () => {
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true)?.name)
  const wideScreenGraphic=useAppSelector(state=>state.graphics.find(g=>g.widescreen===true))
  const dispatch=useAppDispatch()
  const graphics=useAppSelector(state=>state.graphics)
  const chooseGraphic=(id:number)=>{
    if(mode!=='one'){
      dispatch(setChoosedGraphic(id))
      const item=graphics.find(graphic=>graphic.id===id)
      const choosedDistance=item?.distance
      dispatch(changeDistance(choosedDistance))
    }
  }
  return (
    <div className={styles.wrap}>
      {mode==='one' ?(
        <>
        {wideScreenGraphic!==undefined ? (
          <div className={styles.one}><Graphic wideS={true} onClick={()=>chooseGraphic(wideScreenGraphic.id)} graphic={wideScreenGraphic}/></div> 
        ) : (
          <div className={styles.one}>
            <Graphic graphic={graphics[0]} one={true} onClick={()=>chooseGraphic(graphics[0].id)} />
          </div> 
        )} 
        </>
      ) : (null)}
      {mode==='two' ?(
        <div className={styles.two_h}>
          <Graphic graphic={graphics[1]} onClick={()=>chooseGraphic(graphics[1].id)} />
          <Graphic graphic={graphics[2]} onClick={()=>chooseGraphic(graphics[2].id)} />
        </div>
      ) : (null)}
      {mode==='four' ?(
        <div className={styles.four}>
          <Graphic graphic={graphics[3]} onClick={()=>chooseGraphic(graphics[3].id)} />
          <Graphic graphic={graphics[4]} onClick={()=>chooseGraphic(graphics[4].id)} />
          <Graphic graphic={graphics[5]} onClick={()=>chooseGraphic(graphics[5].id)} />
          <Graphic graphic={graphics[6]} onClick={()=>chooseGraphic(graphics[6].id)} />

        </div>
      ) : (null)}
    </div>
  )
}

