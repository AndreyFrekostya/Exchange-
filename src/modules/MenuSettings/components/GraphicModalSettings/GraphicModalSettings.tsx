import React,{ useRef} from 'react'
import styles from './styles.module.css'
import one from './../../../../images/graphic/one.svg'
import four_g_2 from './../../../../images/graphic/four g 2.svg'
import four_g_3 from './../../../../images/graphic/four g 3.svg'
import four_g from './../../../../images/graphic/four g.svg'
import four_h from './../../../../images/graphic/four h.svg'
import four_v from './../../../../images/graphic/four v.svg'
import four from './../../../../images/graphic/four.svg'
import three_g_2 from './../../../../images/graphic/three g 2.svg'
import three_g_3 from './../../../../images/graphic/three g 3.svg'
import three_g_4 from './../../../../images/graphic/three g 4.svg'
import three_g from './../../../../images/graphic/three g.svg'
import three_h from './../../../../images/graphic/three h.svg'
import three_v from './../../../../images/graphic/three v.svg'
import two_h from './../../../../images/graphic/two h.svg'
import two_v from './../../../../images/graphic/two v.svg'
import { changeGraphicMode } from '../../slices/GraphicModeSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import { changeDistance } from '../../slices/DistanceSetSlice'
import { setChoosedGraphic } from '../../../../pages/MainPage/slices/GraphicSlice'
import useOutsideClick from '../../../../hooks/useOutClick'
interface IMode{
   url: string, name: string 
}
interface IModal{
    active: boolean,
    setActive:(arg:boolean)=>void
}
interface IModes{
    q:number,
    mode:IMode[]
}
const GraphicModalSettings:React.FC<IModal> = ({active,setActive}) => {
    const dispatch=useAppDispatch()
    const ref=useRef<HTMLDivElement | null>(null)
    const mode=useAppSelector(state=>state.modeGraphic.find(m=>m.choosed===true))
    const allGraphics=useAppSelector(state=>state.graphics)
    const modes:IModes[]=[
    {q:1,mode:
        [
            {url:one, name:'one'}
        ]
    }, 
    {q:2, mode: 
        [{url: two_v, name: 'two v'}, {url:two_h, name: 'two h'}]},
    {q:3, mode: 
        [
            {url:three_v, name: 'three v'},
            {url:three_h, name: 'three h'},
            {url:three_g, name: 'three g'},
            {url:three_g_2, name: 'three g 2'},
            {url:three_g_3, name: 'three g 3'},
            {url:three_g_4, name: 'three g 4'}
        ]
    },
    {q:4, mode: 
        [
            {url:four, name: 'four'},
            {url:four_h, name: 'four h'},
            {url:four_v, name: 'four v'},
            {url:four_g, name: 'four g'},
            {url:four_g_2, name: 'four g 2'},
            {url:four_g_3, name: 'four g 3'},
        ]
    }]
    const onClose=()=>{
        setActive(false)
    }
    const chooseMode=(icon:string)=>{
        dispatch(changeGraphicMode(icon))
        const name=icon.substring(0,4).trimEnd()
        if(name==='one'){
            dispatch(setChoosedGraphic(0))
            dispatch(changeDistance(allGraphics[0].distance))
        }
        if(name==='two'){
            dispatch(setChoosedGraphic(1))
            dispatch(changeDistance(allGraphics[1].distance))
        }
        if(name==='thre'){
            dispatch(setChoosedGraphic(3))
            dispatch(changeDistance(allGraphics[3].distance))
        }
        if(name==='four'){
            dispatch(setChoosedGraphic(6))
            dispatch(changeDistance(allGraphics[6].distance))
        }
        setActive(false)
    }
    useOutsideClick(ref,onClose,active)
  return (
    <div className={styles.modal} ref={ref}>
        <div className={styles.wrap}>
            <div className={styles.group}>
                <p>1</p>
                <div className={styles.modes}>
                    {modes[0].mode.map((m,index)=>(
                        <div key={index} className={styles.modes_two} onClick={()=>chooseMode(m.name)}>
                            <img src={m.url} className={mode?.name===m.name ? styles.activeMode : styles.mode} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.group}>
                <p>2</p>
                <div className={styles.modes}>
                    {modes[1].mode.map((m,index)=>(
                        <div key={index} className={styles.modes_two} onClick={()=>chooseMode(m.name)}>
                            <img className={mode?.name===m.name ? styles.activeMode : styles.mode} src={m.url} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.group}>
                <p>3</p>
                <div className={styles.modes}>
                    {modes[2].mode.map((m,index)=>(
                        <div key={index} className={styles.modes_two} onClick={()=>chooseMode(m.name)}>
                            <img className={mode?.name===m.name ? styles.activeMode : styles.mode} src={m.url} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.group}>
                <p>4</p>
                <div className={styles.modes}>
                    {modes[3].mode.map((m,index)=>(
                        <div key={index} className={styles.modes_two} onClick={()=>chooseMode(m.name)}>
                            <img className={mode?.name===m.name ? styles.activeMode : styles.mode} src={m.url} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default GraphicModalSettings