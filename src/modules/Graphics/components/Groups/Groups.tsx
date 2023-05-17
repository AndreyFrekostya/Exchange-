import React, { useState } from 'react'
import styles from './styles.module.css'
import GroupsModal from '../GroupsModal/GroupsModal'
import LockOpenIcon from '@mui/icons-material/LockOpen';
interface IGroup{
    group:number | null
}
const Groups:React.FC<IGroup> = ({group}) => {
    const [active, setActive]=useState<boolean>(false)
  return (
    <div className={active ? styles.activeWrap: styles.wrap}>
        {group ? (
            <div className={styles.group} onClick={()=>setActive(!active)}>
                <p>{group}</p>
            </div>
        ) : (<LockOpenIcon onClick={()=>setActive(!active)}/>)}
        {active ? (<GroupsModal group={group} active={active} setActive={setActive}/>) : (null)}
    </div>
  )
}

export default Groups