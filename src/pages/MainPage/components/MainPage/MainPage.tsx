import React, { createContext, useEffect, useState } from 'react'
import styles from './styles.module.css'
import Header from '../Header/Header'
import {Graphics} from '../../../../modules/Graphics/components/Graphics/Graphics'
import { PanelBottom } from '../../../../modules/PanelBottom'
import { useGetCoinQuery } from '../../api/CoinApi'
import { useAppDispatch } from '../../../../hooks/redux-hooks'
import { setCoins } from '../../slices/AllCoinsSlice'
export interface IDataPanelB{
  isFull: boolean,
  height: number, 
}
export const ContextIsLoadingDataModal=createContext<boolean>(true)
const MainPage = () => {
  const {data, isLoading}=useGetCoinQuery()
  const dispatch=useAppDispatch()
  const [dataPanelB, setDataPanelB]=useState<IDataPanelB>({isFull:false, height:45})
  const [dataPanelR, setDataPanelR]=useState<boolean>(false)
  const changeDataPanelB=(data:IDataPanelB)=>{setDataPanelB({isFull:data.isFull, height:data.height})}
  const changeDataPanelR=(isActive: boolean)=>{
    setDataPanelR(isActive)
  }
  useEffect(()=>{
    dispatch(setCoins(data))
  },[data])
  return (
    <div className={styles.wrap}>
      <div className={styles.firstColomn}>
        <ContextIsLoadingDataModal.Provider value={isLoading}>
          <Header/>
        </ContextIsLoadingDataModal.Provider>
        <Graphics dataPanelB={dataPanelB} changeDataPanelR={changeDataPanelR}/>
        <PanelBottom changeDataPanelB={changeDataPanelB} dataPanelR={dataPanelR}/>
      </div>
    </div>
  )
}
export default MainPage