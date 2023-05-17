import React, { useEffect } from 'react'
import Graphic from '../Graphic/Graphic'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { setChoosedGraphic } from '../../../../pages/MainPage/slices/GraphicSlice'
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice'
import { PanelRight } from '../../../PanelRight'
import { IDataPanelB } from '../../../../pages/MainPage/components/MainPage/MainPage'
import { useGetCoinInListQuery } from '../../../../pages/MainPage/api/CoinInListApi'
import { setCoinsInList } from '../../../../pages/MainPage/slices/AllCoinsInListSlice'
interface IGraphics{
  dataPanelB:IDataPanelB,
  changeDataPanelR:(arg:boolean)=>void
}
export const Graphics:React.FC<IGraphics> = ({dataPanelB, changeDataPanelR}) => {
  const {data}=useGetCoinInListQuery()
  const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true)?.name)
  const wideScreenGraphic=useAppSelector(state=>state.graphics.find(g=>g.widescreen===true))
  const dispatch=useAppDispatch()
  const graphics=useAppSelector(state=>state.graphics)
  const chooseGraphic=(id:number)=>{
    const choosedGraphic=graphics.find(item=>item.choosed===true)
    if(mode!=='one' && choosedGraphic?.id!==id){
      dispatch(setChoosedGraphic(id))
      const item=graphics.find(graphic=>graphic.id===id)
      const choosedDistance=item?.distance
      dispatch(changeDistance(choosedDistance))
    }
  }
  useEffect(()=>{
    dispatch(setCoinsInList(data))
  },[data])
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
      {mode==='two h' ?(
        <div className={styles.two_h}>
          <Graphic graphic={graphics[1]} onClick={()=>chooseGraphic(graphics[1].id)} />
          <Graphic graphic={graphics[2]} onClick={()=>chooseGraphic(graphics[2].id)} />
        </div>
      ) : (null)}
      {mode==='two v' ?(
        <div className={styles.two_v}>
          <Graphic graphic={graphics[1]} onClick={()=>chooseGraphic(graphics[1].id)} />
          <Graphic graphic={graphics[2]} onClick={()=>chooseGraphic(graphics[2].id)} />
        </div>
      ) : (null)}
      {mode==='three v' ?(
        <div className={styles.three_v}>
          <Graphic graphic={graphics[3]} onClick={()=>chooseGraphic(graphics[3].id)} />
          <Graphic graphic={graphics[4]} onClick={()=>chooseGraphic(graphics[4].id)} />
          <Graphic graphic={graphics[5]} onClick={()=>chooseGraphic(graphics[5].id)} />
        </div>
      ) : (null)}
      {mode==='three h' ?(
        <div className={styles.three_h}>
          <Graphic graphic={graphics[3]} onClick={()=>chooseGraphic(graphics[3].id)} />
          <Graphic graphic={graphics[4]} onClick={()=>chooseGraphic(graphics[4].id)} />
          <Graphic graphic={graphics[5]} onClick={()=>chooseGraphic(graphics[5].id)} />
        </div>
      ) : (null)}
      {mode==='three g' ?(
        <div className={styles.three_g}>
          <Graphic graphic={graphics[3]} onClick={()=>chooseGraphic(graphics[3].id)} />
          <div className={styles.three_g_p}>
            <Graphic graphic={graphics[4]} onClick={()=>chooseGraphic(graphics[4].id)} />
            <Graphic graphic={graphics[5]} onClick={()=>chooseGraphic(graphics[5].id)} />
          </div>
        </div>
      ) : (null)}
      {mode==='three g 2' ?(
        <div className={styles.three_g2}>
          <div className={styles.three_g_p2}>
            <Graphic graphic={graphics[3]} onClick={()=>chooseGraphic(graphics[3].id)} />
            <Graphic graphic={graphics[4]} onClick={()=>chooseGraphic(graphics[4].id)} />
          </div>
          <Graphic graphic={graphics[5]} onClick={()=>chooseGraphic(graphics[5].id)} />
        </div>
      ) : (null)}
      {mode==='three g 3' ?(
        <div className={styles.three_g3}>
          <Graphic graphic={graphics[3]} onClick={()=>chooseGraphic(graphics[3].id)} />
          <div className={styles.three_g_p3}>
            <Graphic graphic={graphics[4]} onClick={()=>chooseGraphic(graphics[4].id)} />
            <Graphic graphic={graphics[5]} onClick={()=>chooseGraphic(graphics[5].id)} />
          </div>
        </div>
      ) : (null)}
      {mode==='three g 4' ?(
        <div className={styles.three_g3}>
          <div className={styles.three_g_p3}>
            <Graphic graphic={graphics[3]} onClick={()=>chooseGraphic(graphics[3].id)} />
            <Graphic graphic={graphics[4]} onClick={()=>chooseGraphic(graphics[4].id)} />
          </div>
            <Graphic graphic={graphics[5]} onClick={()=>chooseGraphic(graphics[5].id)} />
        </div>
      ) : (null)}
      {mode==='four' ?(
        <div className={styles.obv}>
          <div className={styles.four}>
            <Graphic graphic={graphics[6]} onClick={()=>chooseGraphic(graphics[6].id)} />
            <Graphic graphic={graphics[7]} onClick={()=>chooseGraphic(graphics[7].id)} />
            <Graphic graphic={graphics[8]} onClick={()=>chooseGraphic(graphics[8].id)} />
            <Graphic graphic={graphics[9]} onClick={()=>chooseGraphic(graphics[9].id)} />
          </div>
        </div>
      ) : (null)}
      {mode==='four v' ?(
          <div className={styles.four_v}>
            <Graphic graphic={graphics[6]} onClick={()=>chooseGraphic(graphics[6].id)} />
            <Graphic graphic={graphics[7]} onClick={()=>chooseGraphic(graphics[7].id)} />
            <Graphic graphic={graphics[8]} onClick={()=>chooseGraphic(graphics[8].id)} />
            <Graphic graphic={graphics[9]} onClick={()=>chooseGraphic(graphics[9].id)} />
          </div>
      ) : (null)}
      {mode==='four h' ?(
          <div className={styles.four_h}>
            <Graphic graphic={graphics[6]} onClick={()=>chooseGraphic(graphics[6].id)} />
            <Graphic graphic={graphics[7]} onClick={()=>chooseGraphic(graphics[7].id)} />
            <Graphic graphic={graphics[8]} onClick={()=>chooseGraphic(graphics[8].id)} />
            <Graphic graphic={graphics[9]} onClick={()=>chooseGraphic(graphics[9].id)} />
          </div>
      ) : (null)}
      {mode==='four g' ?(
          <div className={styles.three_g3}>
            <Graphic graphic={graphics[6]} onClick={()=>chooseGraphic(graphics[6].id)} />
            <div className={styles.three_g_p3}>
            <Graphic graphic={graphics[7]} onClick={()=>chooseGraphic(graphics[7].id)} />
            <Graphic graphic={graphics[8]} onClick={()=>chooseGraphic(graphics[8].id)} />
            <Graphic graphic={graphics[9]} onClick={()=>chooseGraphic(graphics[9].id)} />
            </div>
          </div>
      ) : (null)}
      {mode==='four g 2' ?(
          <div className={styles.three_g}>
            <Graphic graphic={graphics[6]} onClick={()=>chooseGraphic(graphics[6].id)} />
            <div className={styles.three_g_p}>
            <Graphic graphic={graphics[7]} onClick={()=>chooseGraphic(graphics[7].id)} />
            <Graphic graphic={graphics[8]} onClick={()=>chooseGraphic(graphics[8].id)} />
            <Graphic graphic={graphics[9]} onClick={()=>chooseGraphic(graphics[9].id)} />
            </div>
          </div>
      ) : (null)}
      {mode==='four g 3' ?(
          <div className={styles.four_g_3}>
            <div className={styles.three_g_p3}>
            <Graphic graphic={graphics[6]} onClick={()=>chooseGraphic(graphics[6].id)} />
            <Graphic graphic={graphics[7]} onClick={()=>chooseGraphic(graphics[7].id)} />
            </div>
            <div className={styles.three_g_p}>
            <Graphic graphic={graphics[8]} onClick={()=>chooseGraphic(graphics[8].id)} />
            <Graphic graphic={graphics[9]} onClick={()=>chooseGraphic(graphics[9].id)} />
            </div>
          </div>
      ) : (null)}
      <PanelRight dataPanelB={dataPanelB} changeDataPanelR={changeDataPanelR}/>
    </div>
  )
}

