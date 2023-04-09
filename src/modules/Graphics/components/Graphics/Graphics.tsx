import React from 'react'
import Graphic from '../Graphic/Graphic'
import styles from './styles.module.css'
import { useAppSelector } from '../../../../hooks/redux-hooks'
export const Graphics = () => {
  const mode=useAppSelector(state=>state.modeGraphic)
  return (
    <div className={styles.wrap}>
      {mode==='one' ?(
      <div className={styles.one}><Graphic id={'1'}/></div>
      ) : (null)}
      {mode==='two_vertical' ?(
        <div className={styles.two_v}>
          <Graphic id={'1'}/>
          <Graphic id={'2'}/>
        </div>
      ) : (null)}
      {mode==='two_horizontal' ?(
        <div className={styles.two_h}>
          <Graphic id={'1'}/>
          <Graphic id={'2'}/>
        </div>
      ) : (null)}
      {mode==='four' ?(
        <div className={styles.four}>
          <Graphic id={'1'}/>
          <Graphic id={'2'}/>
          <Graphic id={'3'}/>
          <Graphic id={'4'}/>
        </div>
      ) : (null)}
    </div>
  )
}

