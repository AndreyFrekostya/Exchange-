import React from 'react'
import styles from './styles.module.css'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PestControlIcon from '@mui/icons-material/PestControl';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
const Other = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.helpers}>
        <p>24h</p>
      </div>
      <div className={styles.helpers}>
        <QuestionMarkIcon/>
      </div >
      <div className={styles.helpers}>
        <PestControlIcon/>
      </div>
      <div className={styles.helpers}>
        <SettingsIcon/>
      </div>
      <div className={styles.helpers}>
        <PersonIcon/>
      </div>     
    </div>
  )
}

export default Other