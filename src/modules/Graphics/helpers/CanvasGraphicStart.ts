import { RefObject } from "react";
import { DrawCandle } from "./DrawCandle";
import { DrawLine } from "./DrawLine";
import { yToPixelCoords } from "./yToPixelCoords";
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { DrawCandleFunc } from "./DrawCandleFunc";
interface ICanvasGraphicStart {
        ctx:CanvasRenderingContext2D,
        canvas:HTMLCanvasElement,
        data: string[][], 
        refContainer:RefObject<HTMLDivElement>,
        maxPrice:number, 
        minPrice:number,
        candleWidth:number, 
        candleSpacing:number,
        xStartLeft:number, 
        setXStart:(arg:number)=>void,
        howCandleInRange:number,
        startCandle:number,
        scrolledCandle:number
}
export function CanvasGraphicStart({ctx,canvas, data, refContainer,maxPrice,minPrice,candleWidth,candleSpacing,xStartLeft, setXStart, howCandleInRange, startCandle,scrolledCandle}:ICanvasGraphicStart):void{
        const candlestiks=data
        let container=refContainer.current
        const marginRight=30
        const marginBottom=40
        const width = parseInt( String(canvas.width) )-marginRight;
	const height = parseInt( String(canvas.height) )-marginBottom;
        ctx.clearRect( 0 , 0 , width , height );
        const redColor='#ef5350'
        const greenColor='#26a69a'
        ctx.imageSmoothingEnabled = true;
        const priceRange = maxPrice - minPrice;
        DrawCandleFunc(ctx,candlestiks,width,candleWidth,maxPrice,priceRange,height,candleSpacing, howCandleInRange, startCandle, xStartLeft)
         
}

        