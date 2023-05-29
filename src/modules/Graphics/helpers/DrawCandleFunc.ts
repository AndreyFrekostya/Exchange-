import { DrawCandle } from "./DrawCandle";
import { DrawLine } from "./DrawLine";
import { yToPixelCoords } from "./yToPixelCoords";

export const DrawCandleFunc=(ctx:CanvasRenderingContext2D,candlestiks:string[][],width:number,candleWidth:number,maxPrice:number,priceRange:number,height:number,candleSpacing:number, howCandleInRange:number, startCandle:number,xLeft:number)=>{
    let x0=xLeft
    const redColor='#EB602F'
    const greenColor='#37DBBA'
    candlestiks.slice(startCandle,startCandle+howCandleInRange).forEach((candle:string[],index:number)=>{
            let color = candle[4] > candle[1]  ? greenColor : redColor;
            const open=Number(candle[1])
            const close=Number(candle[4])  
            let yCoords=yToPixelCoords(maxPrice,candle[4] > candle[1] ? close : open,priceRange,height)
            const heightCandle = Math.abs(yToPixelCoords(maxPrice,open,priceRange,height) - yToPixelCoords(maxPrice,close,priceRange,height));
            DrawCandle(ctx,x0,Math.round(yCoords),candleWidth,heightCandle+1,color)
            const yLineStart=yToPixelCoords(maxPrice,Number(candle[3]),priceRange,height)
            const yLineEnd=yToPixelCoords(maxPrice,Number(candle[2]),priceRange,height)
            DrawLine( ctx,x0, yLineStart , x0, yLineEnd,candleWidth , color );
            x0=x0+candleWidth+candleSpacing
    })
    
}