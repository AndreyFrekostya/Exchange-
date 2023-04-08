import React from 'react'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import styles from './styles.module.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
const TableLine = () => {
  return (
    <div className={styles.wrap}>
            <div className={styles.name}>
              <StarBorderOutlinedIcon/>
                <h5>name</h5>
                <ContentCopyIcon className={styles.copy}/>
            </div>
            <div className={styles.info}>3.7</div>
            <div className={styles.infoGreen}>4.44</div>
            <div className={styles.infoRed}>16.3</div>
            <div className={styles.infoGreen}>56.3</div>
            <div className={styles.infoRed}>4.2</div>
            <div className={styles.info}> </div>
            <div className={styles.info}>144</div>
            <div className={styles.info}>0</div>
            <div className={styles.info}>0.6</div>
      
    </div>
  )
}

export default TableLine