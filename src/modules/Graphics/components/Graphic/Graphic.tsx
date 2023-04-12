import React from 'react'
import styles from './styles.module.css'
import { IGraphic } from '../../../../pages/MainPage/slices/GraphicSlice'
interface IGraphicComponent{
  graphic: IGraphic,
  onClick: ()=>void
}
const Graphic:React.FC<IGraphicComponent> = ({graphic, onClick}) => {
  return (
    <div className={styles.wrap} onClick={onClick}>
      <div className={graphic.choosed ? styles.innerActive : styles.inner}>
        Graphic {graphic.id+1} and {graphic.distance}
      </div>
    </div>
  )
}

export default Graphic