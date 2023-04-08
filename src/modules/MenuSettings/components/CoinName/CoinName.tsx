import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from './styles.module.css'
import ModalCopied from '../../../../ui/modalCopied/ModalCopied';
const CoinName = () => {
    const coin='Coin name'
    const [isActiveModal, setIsActiveModal]=useState<boolean>(false)
    const copyText=()=>{
      navigator.clipboard.writeText(coin)
      setIsActiveModal(true)
      setTimeout(()=>{
        setIsActiveModal(false)
      }, 1000)
    }
  return (
    <div className={styles.wrap}>
        <h1>{coin} <ContentCopyIcon onClick={copyText}/></h1>
        <ModalCopied isActiveModal={isActiveModal}/>
    </div>
  )
}

export default CoinName