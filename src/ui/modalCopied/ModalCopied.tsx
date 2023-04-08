import React,{FC} from 'react'
import styles from './styles.module.css'
interface ImodalCopy{
    isActiveModal: boolean
}
const ModalCopied: FC<ImodalCopy> = ({isActiveModal}) => {
  return (
    <>
        {isActiveModal ? (<div className={styles.modal}>Copied!</div>) : (null)}
    </>
  )
}

export default ModalCopied