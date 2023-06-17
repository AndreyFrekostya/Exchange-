import React, { RefObject } from 'react'
import {CoinList} from '../../../AllCoins/components/CoinList/CoinList';
import Groups from '../Groups/Groups';
import CropDinIcon from '@mui/icons-material/CropDin';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './styles.module.css'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IGraphic, clearWideScreen, setWideScreen } from '../../../../pages/MainPage/slices/GraphicSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { rememberMode } from '../../../MenuSettings/slices/GraphicRememberLastMode';
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice';
import { changeGraphicMode } from '../../../MenuSettings/slices/GraphicModeSlice';
interface IHeaderGraphic{
    one:boolean | undefined,
    setActiveCoin:(arg:boolean)=>void,
    activeCoin:boolean,
    graphic:IGraphic,
    graphicRef:RefObject<HTMLDivElement>,
    wideS:boolean | undefined
}
const HeaderGraphic:React.FC<IHeaderGraphic> = ({one,setActiveCoin,activeCoin,graphic,graphicRef,wideS}) => {
    const dispatch=useAppDispatch()
    const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true)?.name)
    const lastMode=useAppSelector(state=>state.lastMode)
    const openWideScreen=()=>{
        dispatch(rememberMode(mode))
        dispatch(changeDistance(graphic.distance))
        dispatch(setWideScreen(graphic.id))
        dispatch(changeGraphicMode('one'))
      }
      const closeWideScreen=()=>{
        dispatch(clearWideScreen())
        dispatch(changeGraphicMode(lastMode))
      }
  return (
    <>
        {one ? activeCoin ? (
        <div className={styles.headerGraph}>
          <CoinList graphicRef={graphicRef} id={graphic.id} active={activeCoin} setActive={setActiveCoin}/>
          <div className={styles.groups}>
          <Groups group={graphic.group}/>
          {graphic.coin!=='' ? (<p onClick={()=>setActiveCoin(!activeCoin)} className={styles.coin}>{graphic.coin} <span className={graphic.typeCoin==='f' || graphic.typeCoin==='d'  ? styles.futures : styles.spot}>{graphic.typeCoin!=='' ? 'futures' : 'spot'}</span></p>) : (null)}
          </div>
        </div>

      ) : (
      <div className={styles.headerGraph} style={{marginLeft:'2px'}}> 
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className={styles.groups}><Groups group={graphic.group}/></div>
          {graphic.coin!=='' ? (<p onClick={()=>setActiveCoin(!activeCoin)} className={styles.coin}>{graphic.coin} <span className={graphic.typeCoin==='f' || graphic.typeCoin==='d'  ? styles.futures : styles.spot}>{graphic.typeCoin!=='' ? 'futures' : 'spot'}</span></p>) : (null)}
        </div>
      </div>
      ) : (
        <div className={styles.headerGraph}>
          <div className={styles.groups}>
            <Groups group={graphic.group}/>
            {graphic.coin!=='' ? (<p onClick={()=>setActiveCoin(!activeCoin)} className={styles.coin}>{graphic.coin} <span className={graphic.typeCoin==='f' || graphic.typeCoin==='d'  ? styles.futures : styles.spot}>{graphic.typeCoin!=='' ? 'futures' : 'spot'}</span></p>) : (null)}
          </div>
          <div className={styles.leftHand}>
            {!one ? graphic.choosed  ?(<FiberManualRecordIcon className={styles.dot}/>) : (null) : (null)}
            {!one ? wideS ? (<RemoveIcon className={styles.wideS} onClick={closeWideScreen}/>) : (<CropDinIcon className={styles.wideS} onClick={openWideScreen}/>) : (null)}
          </div>
          {activeCoin ? (<CoinList graphicRef={graphicRef} id={graphic.id} active={activeCoin} setActive={setActiveCoin}/>) : (null)}
        </div>
      )}
    </>
  )
}

export default HeaderGraphic