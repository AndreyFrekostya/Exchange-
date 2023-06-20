import { DrawCandle } from "./DrawCandle";
import { DrawLine } from "./DrawLine";
import { yToPixelCoords } from "../../Graphics/helpers/yToPixelCoords";

export const RedrawOneCandle=(ctx:CanvasRenderingContext2D,candle:string[],width:number,candleWidth:number,maxPrice:number,priceRange:number,height:number,candleSpacing:number,x:number)=>{
    const redColor='#EB602F'
    const greenColor='#03fcdf'
    ctx.imageSmoothingEnabled = false;
    let color = candle[4] > candle[1]  ? greenColor : redColor;
    const open=Number(candle[1])
    const close=Number(candle[4])  
    let yCoords=yToPixelCoords(maxPrice,candle[4] > candle[1] ? close : open,priceRange,height)
    const heightCandle = Math.abs(yToPixelCoords(maxPrice,open,priceRange,height) - yToPixelCoords(maxPrice,close,priceRange,height));
    const yLineStart=yToPixelCoords(maxPrice,Number(candle[3]),priceRange,height)
    const yLineEnd=yToPixelCoords(maxPrice,Number(candle[2]),priceRange,height)
    ctx.clearRect(x-candleSpacing/2,0,candleWidth+candleSpacing,height)
    DrawCandle(ctx,Math.round(x),Math.round(yCoords),Math.round(candleWidth),Math.round(heightCandle+1),color)
    DrawLine( ctx,Math.round(x), Math.round(yLineStart) , Math.round(x), Math.round(yLineEnd),candleWidth , color );
}