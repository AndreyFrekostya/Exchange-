import React from 'react'
import styles from './styles.module.css'
interface ICoinSetting{
    setting: number
}
const SettingCoin:React.FC<ICoinSetting> = ({setting}) => {
  return (
    <div className={styles.wrap}>
        {setting}
    </div>
  )
}

export default SettingCoin