import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
type setState<T>=Dispatch<SetStateAction<T>>
export interface IResizer{
    heightV:number,
    refContainer:RefObject<HTMLDivElement>,
    graphicRef:RefObject<HTMLDivElement>,
    setHeightV:setState<number>,
    setHeightM:setState<number | undefined>
}

export interface ICanvasVolume{
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
    grRef:MutableRefObject<HTMLCanvasElement | null>,
    heightM:number | undefined,
    setHeightM:setState<number | undefined>,
    heightV:number,
    setHeightV:setState<number>,
    priceWidth:number,
    fulfieldGraphicRefAndVolumeAndPrice:(grRef:HTMLCanvasElement | null | undefined, voRef:HTMLCanvasElement | null | undefined,priceRefArg: HTMLCanvasElement | null | undefined)=>void,
    volumeRef:MutableRefObject<HTMLCanvasElement | null>
}

export interface CrosshairVolumeProps{
    setIsMouseOnGraphic:setState<{x:number,y:number, q:boolean}>,
    isMouseOnGraphic:{x:number,y:number, q:boolean},
    refCanvas4:MutableRefObject<HTMLCanvasElement | null>,
    ctx4:CanvasRenderingContext2D | null | undefined,
    data:string[][],
    candleWidth:number,
    candleSpacing:number,
    xLeft:number,
    graphicRef:RefObject<HTMLDivElement>,
    maxVolume:number,
    priceWidth:number,
    heightV:number,
    grRef:MutableRefObject<HTMLCanvasElement | null>
}