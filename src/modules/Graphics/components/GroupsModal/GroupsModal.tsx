import React, { useRef, useState } from 'react'
import styles from './styles.module.css'
import useOutsideClick from '../../../../hooks/useOutClick'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { setGraphicGroup, unTieGraphicGroup } from '../../../../pages/MainPage/slices/GraphicSlice'
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice';
interface IGroupModal{
    active:boolean,
    setActive: (arg:boolean)=>void,
    group: number | null
}
const GroupsModal:React.FC<IGroupModal> = ({active, setActive, group}) => {
    const groups=[1,2,3,4,5,6,7,8,9]
    const graphics=useAppSelector(state=>state.graphics)
    const [choosedGroup, setChoosedGroup]=useState<number | null>(group)
    const ref=useRef<HTMLDivElement | null>(null)
    const dispatch=useAppDispatch()
    const onClose=()=>{
        setActive(false)
    }
    const changeGroup=(gr:number)=>{
        dispatch(setGraphicGroup(gr))
        setChoosedGroup(gr)
        if(graphics.find(item=>item.choosed===true)?.distance==='0' && graphics.find(item=>item.group===gr)){
            dispatch(changeDistance('Д'))
        }
    }
    useOutsideClick(ref,onClose, active)
  return (
    <div className={styles.wrap} ref={ref}>
        <div className={styles.groups}>
            {groups.map((group:number)=>(
                <div className={choosedGroup===group ?styles.activeObv :styles.obv} key={group}>
                    <div className={styles.group} onClick={()=>changeGroup(group)}> 
                        <p>{group}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className={styles.untie} onClick={()=>dispatch(unTieGraphicGroup())}>
            <LockOpenIcon onClick={()=>setChoosedGroup(0)}/>
        </div>
    </div>
  )
}

export default GroupsModal