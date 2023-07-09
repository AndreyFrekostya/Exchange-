import { DrawCandle } from "./DrawCandle";
import { DrawLine } from "./DrawLine";
import { yToPixelCoords } from "../../Graphics/helpers/yToPixelCoords";
//#37dbbba
export const DrawCandleFunc=(ctx:CanvasRenderingContext2D,candlestiks:string[][],width:number,candleWidth:number,maxPrice:number,priceRange:number,height:number,candleSpacing:number, howCandleInRange:number, startCandle:number,xLeft:number, dopHeight:number, yDown:number)=>{
    let range=dopHeight ? (height-dopHeight)/2 : 0
    let newHeight=dopHeight ? dopHeight : height
    let x0=xLeft
    const redColor='#EB602F'
    const greenColor='#03fcdf'
    ctx.imageSmoothingEnabled = false;
    candlestiks.slice(startCandle,startCandle+howCandleInRange).forEach((candle:string[],index:number)=>{
            let color = candle[4] > candle[1]  ? greenColor : redColor;
            const open=Number(candle[1])
            const close=Number(candle[4])  
            let yCoords=yToPixelCoords(maxPrice,candle[4] > candle[1] ? close : open,priceRange,newHeight)+range+yDown
            const heightCandle = Math.abs(yToPixelCoords(maxPrice,open,priceRange,newHeight) - yToPixelCoords(maxPrice,close,priceRange,newHeight));
            if(candleWidth>2){
                DrawCandle(ctx,Math.round(x0),Math.round(yCoords),Math.round(candleWidth),Math.round(heightCandle+1),color)
            }
            const yLineStart=yToPixelCoords(maxPrice,Number(candle[3]),priceRange,newHeight)+range+yDown
            const yLineEnd=yToPixelCoords(maxPrice,Number(candle[2]),priceRange,newHeight)+range+yDown
            DrawLine( ctx,Math.round(x0), Math.round(yLineStart) , Math.round(x0), Math.round(yLineEnd),candleWidth , color );
            x0=x0+candleWidth+candleSpacing
    })
}