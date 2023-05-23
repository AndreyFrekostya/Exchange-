import { DrawCandle } from "./DrawCandle";
import { DrawLine } from "./DrawLine";
import { xToPixelCoords } from "./xToPixelCoords";
import { yToPixelCoords } from "./yToPixelCoords";

export const DrawCandleFunc=(ctx:CanvasRenderingContext2D,candlestiks:string[][],width:number,candleWidth:number,maxPrice:number,priceRange:number,height:number,candleSpacing:number)=>{
    candlestiks.forEach((candle:string[],index:number)=>{
            const redColor='#ef5350'
            const greenColor='#26a69a'
            let color = candle[4] > candle[1]  ? greenColor : redColor;
            const open=Number(candle[1])
            const close=Number(candle[4])
            let xCoords=xToPixelCoords((Number(candle[0])),candlestiks,width,candleWidth)  
            let yCoords=yToPixelCoords(maxPrice,candle[4] > candle[1] ? close : open,priceRange,height)
            const heightCandle = Math.abs(yToPixelCoords(maxPrice,open,priceRange,height) - yToPixelCoords(maxPrice,close,priceRange,height));
            DrawCandle(ctx,xCoords,yCoords,candleWidth,heightCandle,color)
            const xLineStart=xToPixelCoords((Number(candle[0])),candlestiks,width,candleWidth)
            const yLineStart=yToPixelCoords(maxPrice,Number(candle[3]),priceRange,height)
            const yLineEnd=yToPixelCoords(maxPrice,Number(candle[2]),priceRange,height)
            DrawLine( ctx,xLineStart, yLineStart , xLineStart, yLineEnd,candleWidth , color );
    })
}