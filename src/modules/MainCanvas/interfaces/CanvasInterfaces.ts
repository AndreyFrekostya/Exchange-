import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { IGraphic } from "../../../pages/MainPage/slices/GraphicSlice";
type setState<T>=Dispatch<SetStateAction<T>>
export interface ICrosshairCanvasProps{
    setActive:setState<{active:boolean,y:number}>,
    active:{
      active:boolean,
      y:number
    },
    isMouseClientY:number
    xLeft:number,
    setXLeft:setState<number>,
    data:string[][],
    candleWidth:number,
    setCandleWidth:setState<number>
    candleSpacing:number,
    setPressedCandle:setState<string[] | undefined>,
    graphicRef:RefObject<HTMLDivElement>,
    setMouseX:setState<number>,
    mouseX:number,
    setCandleSpacing:setState<number>,
    setIfPlus:setState<boolean>,
    priceWidth:number,
    heightM:number | undefined,
    isPressed:boolean,
    setIsPressed:setState<boolean>,
    ctx:CanvasRenderingContext2D | null | undefined,
    howCandleInRange:number,
    mainCanvas:HTMLCanvasElement | null,
    setMaxPrice:setState<number>,
    setMinPrice:setState<number>,
    setStartCandle:setState<number>,
    historyData:string[][]
    setHistoryData:setState<string[][]>,
    graphic:IGraphic,
    allDataCopy:string[][],
    setData:setState<string[][]>
}

export interface IMainCanvas{
    graphicRef:RefObject<HTMLDivElement>,
    data:string[][],
    howCandleInRange:number,
    setHowCandleInRange:setState<number>,
    candleWidth:number, 
    setCandleWidth:setState<number>,
    xLeft:number ,
    setXLeft:setState<number>,
    startCandle:number ,
    setStartCandle:setState<number>,
    candleSpacing:number,
    setCandleSpacing:setState<number>,
    setIsMouseOnGraphic:setState<{ x: number;y:number; q: boolean; }>,
    isMouseOnGraphic:{x:number,y:number, q:boolean},
    voRef:MutableRefObject<HTMLCanvasElement | null>,
    heightM:number | undefined,
    setHeightM:setState<number | undefined>,
    heightV:number,
    setHeightV:setState<number>,
    pressedCandle:string[] | undefined,
    setPressedCandle:setState<string[] | undefined>,
    priceWidth:number,
    priceRef:MutableRefObject<HTMLCanvasElement | null>,
    fixedNumber:number,
    mainCanvasRef:MutableRefObject<HTMLCanvasElement | null>,
    ifFirst:boolean, 
    setIfFirst:setState<boolean>,
    lastData:string[],
    setLastData:setState<string[]>,
    dataHistory:string[][],
    setData:setState<string[][]>,
    allDataCopy:string[][],
    setAllDataCopy:setState<string[][]>,
    setIsGottenHistory:setState<boolean>,
    graphic:IGraphic,
    firstData:string[][],
    dataUpdated:string[]
}

