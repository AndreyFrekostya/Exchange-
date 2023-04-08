import React from 'react'
import DistanceSettings from '../../../../modules/MenuSettings/components/DistanceSettings/DistanceSettings'
import DrawingSettings from '../../../../modules/MenuSettings/components/DrawingSettings/DrawingSettings'
import GraphicSettings from '../../../../modules/MenuSettings/components/GraphicSettings/GraphicSettings'
import Other from '../../../../modules/MenuSettings/components/OtherSettings/Other'
import CoinName from '../../../../modules/MenuSettings/components/CoinName/CoinName'
export const MenuSettings = () => {
  return (
    <>
        <CoinName/>
        <DistanceSettings/>
        <DrawingSettings/>
        <GraphicSettings/>
        <Other/>
    </>
  )
}
