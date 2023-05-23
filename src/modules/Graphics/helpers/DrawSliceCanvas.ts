import { RefObject } from "react";
import { xToPixelCoords } from "./xToPixelCoords";
import { yToPixelCoords } from "./yToPixelCoords";
import { DrawCandle } from "./DrawCandle";
import { DrawLine } from "./DrawLine";

export function DrawScliceCanvas ( ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][], container:HTMLDivElement,maxPrice:number, minPrice:number,candleWidth:number, candleSpacing:number,candles:number){
    const candlestiks=data
    const heightCanvas=canvas.height
    const wholeCandle=candleWidth+candleSpacing
    console.log(candleSpacing, candleWidth)
    const widthCanvas=candlestiks.length*wholeCandle
    canvas.width=widthCanvas
    const redColor='#ef5350'
    const greenColor='#26a69a'
    const reduction=10
    const priceRange=maxPrice-minPrice
    const newWidth=container.clientWidth-(2*reduction)
    const visibleRows=newWidth/wholeCandle+10
    const edge=reduction/wholeCandle
    const lastStartIndex=container.scrollLeft/wholeCandle
    const newIndex=edge+lastStartIndex
    const newLastIndex=newIndex+visibleRows
    candlestiks.slice(newIndex, newLastIndex).forEach((candle:string[],index:number)=>{
        const redColor='#ef5350'
        const greenColor='#26a69a'
        let color = candle[4] > candle[1]  ? greenColor : redColor;
        const open=Number(candle[1])
        const close=Number(candle[4])
        let xCoords=xToPixelCoords((Number(candle[0])),candlestiks,widthCanvas,candleWidth)  
        let yCoords=yToPixelCoords(maxPrice,candle[4] > candle[1] ? close : open,priceRange,heightCanvas)
        const heightCandle = Math.abs(yToPixelCoords(maxPrice,open,priceRange,heightCanvas) - yToPixelCoords(maxPrice,close,priceRange,heightCanvas));
        DrawCandle(ctx,xCoords,yCoords,candleWidth,heightCandle,color)
        const xLineStart=xToPixelCoords((Number(candle[0])),candlestiks,widthCanvas,candleWidth)
        const yLineStart=yToPixelCoords(maxPrice,Number(candle[3]),priceRange,heightCanvas)
        const yLineEnd=yToPixelCoords(maxPrice,Number(candle[2]),priceRange,heightCanvas)
        DrawLine( ctx,xLineStart, yLineStart , xLineStart, yLineEnd,candleWidth , color );
})
}