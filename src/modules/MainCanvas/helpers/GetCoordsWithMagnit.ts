import { yToPixelCoords } from "../../Graphics/helpers/yToPixelCoords"
import { DrawingElements } from "./DrawCrosshairCanvas"

export function GetCoordsWithMagnit(drawingElementsOnPanel:DrawingElements, neededCandle:string[],crosshairY:number, dopHeight:number, maxPrice:number, priceRange:number, rangeHeight:number, yDown:number){
    if (drawingElementsOnPanel.name!=='nothing'&& drawingElementsOnPanel.isMagnit===true && neededCandle){
        let open=neededCandle[4]>neededCandle[1] ? neededCandle[4] : neededCandle[1]
        let close=neededCandle[4]>neededCandle[1] ? neededCandle[1] : neededCandle[4]
        let yCenterCandle=((yToPixelCoords(maxPrice,Number(neededCandle[4]),priceRange,dopHeight)+yToPixelCoords(maxPrice,Number(neededCandle[1]),priceRange,dopHeight))/2)+40+rangeHeight+yDown
        let yCenterBetweenHighOpen=((yToPixelCoords(maxPrice,Number(open),priceRange,dopHeight)+yToPixelCoords(maxPrice,Number(neededCandle[2]),priceRange,dopHeight))/2)+40+rangeHeight+yDown
        let yCenterBetweenLowClose=((yToPixelCoords(maxPrice,Number(close),priceRange,dopHeight)+yToPixelCoords(maxPrice,Number(neededCandle[3]),priceRange,dopHeight))/2)+40+rangeHeight+yDown
        if(crosshairY<yCenterBetweenHighOpen){
            crosshairY=yToPixelCoords(maxPrice,Number(neededCandle[2]),priceRange,dopHeight)+40+rangeHeight+yDown
        }else if(crosshairY<yCenterCandle){
            crosshairY=yToPixelCoords(maxPrice,Number(open),priceRange,dopHeight)+40+rangeHeight+yDown
        }else if( crosshairY>yCenterCandle && crosshairY<yCenterBetweenLowClose){
            crosshairY=yToPixelCoords(maxPrice,Number(close),priceRange,dopHeight)+40+rangeHeight+yDown
        }else{
            crosshairY=yToPixelCoords(maxPrice,Number(neededCandle[3]),priceRange,dopHeight)+40+rangeHeight+yDown
        }
    }else if(drawingElementsOnPanel.name!=='nothing'&& drawingElementsOnPanel.isMagnit===false && neededCandle){
        let open=neededCandle[4]>neededCandle[1] ? neededCandle[4] : neededCandle[1]
        let close=neededCandle[4]>neededCandle[1] ? neededCandle[1] : neededCandle[4]
        let openCoords=yToPixelCoords(maxPrice,Number(open),priceRange,dopHeight)+40+rangeHeight+yDown
        let closeCoords=yToPixelCoords(maxPrice,Number(close),priceRange,dopHeight)+40+rangeHeight+yDown
        let highCoords=yToPixelCoords(maxPrice,Number(neededCandle[2]),priceRange,dopHeight)+40+rangeHeight+yDown
        let lowCoords=yToPixelCoords(maxPrice,Number(neededCandle[3]),priceRange,dopHeight)+40+rangeHeight+yDown
        let yCenterBetweenHighOpen=((yToPixelCoords(maxPrice,Number(open),priceRange,dopHeight)+yToPixelCoords(maxPrice,Number(neededCandle[2]),priceRange,dopHeight))/2)+40+rangeHeight+yDown
        let yCenterBetweenLowClose=((yToPixelCoords(maxPrice,Number(close),priceRange,dopHeight)+yToPixelCoords(maxPrice,Number(neededCandle[3]),priceRange,dopHeight))/2)+40+rangeHeight+yDown
        const heightCandle = Math.abs(yToPixelCoords(maxPrice,Number(open),priceRange,dopHeight) - yToPixelCoords(maxPrice,Number(close),priceRange,dopHeight));
        let ifHeightCandleMore40Number=heightCandle>40 ? true : false
        if(ifHeightCandleMore40Number){
            if(crosshairY>highCoords-40 && crosshairY<yCenterBetweenHighOpen){
                crosshairY=yToPixelCoords(maxPrice,Number(neededCandle[2]),priceRange,dopHeight)+40+rangeHeight+yDown
            }else if(crosshairY>yCenterBetweenHighOpen && crosshairY<openCoords+40){
                crosshairY=yToPixelCoords(maxPrice,Number(open),priceRange,dopHeight)+40+rangeHeight+yDown
            }else if(crosshairY>closeCoords-40 && crosshairY<yCenterBetweenLowClose){
                crosshairY=yToPixelCoords(maxPrice,Number(close),priceRange,dopHeight)+40+rangeHeight+yDown
            }else if(crosshairY>yCenterBetweenLowClose && crosshairY<lowCoords+40){
                crosshairY=yToPixelCoords(maxPrice,Number(neededCandle[3]),priceRange,dopHeight)+40+rangeHeight+yDown
            }
        }else{
            let yCenterCandle=((yToPixelCoords(maxPrice,Number(neededCandle[4]),priceRange,dopHeight)+yToPixelCoords(maxPrice,Number(neededCandle[1]),priceRange,dopHeight))/2)+40+rangeHeight+yDown
            if(crosshairY>highCoords-40 && crosshairY<yCenterBetweenHighOpen){
                crosshairY=yToPixelCoords(maxPrice,Number(neededCandle[2]),priceRange,dopHeight)+40+rangeHeight+yDown
            }else if(crosshairY>yCenterBetweenHighOpen && crosshairY<yCenterCandle){
                crosshairY=yToPixelCoords(maxPrice,Number(open),priceRange,dopHeight)+40+rangeHeight+yDown
            }else if(crosshairY>yCenterCandle && crosshairY<yCenterBetweenLowClose){
                crosshairY=yToPixelCoords(maxPrice,Number(close),priceRange,dopHeight)+40+rangeHeight+yDown
            }else if(crosshairY>yCenterBetweenLowClose && crosshairY<lowCoords+40){
                crosshairY=yToPixelCoords(maxPrice,Number(neededCandle[3]),priceRange,dopHeight)+40+rangeHeight+yDown
            }
        }
    }
    return crosshairY
}