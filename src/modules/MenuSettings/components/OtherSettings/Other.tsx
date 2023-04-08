import React from 'react'
import styles from './styles.module.css'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PestControlIcon from '@mui/icons-material/PestControl';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
const Other = () => {
  return (
    <div className={styles.wrap}>
        <h3>24h</h3>
        <QuestionMarkIcon/>
        <PestControlIcon/>
        <SettingsIcon/>
        <PersonIcon/>
    </div>
  )
}

export default Other