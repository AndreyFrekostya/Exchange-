export function xToPixelCoords(time:number,candlestiks:string[][],chartWidth:number,candleWidth:number):number{
    return ((time - Number(candlestiks[0][0])) / (Number(candlestiks[candlestiks.length - 1][0]) - Number(candlestiks[0][0]))) *chartWidth
}


// export function xToPixelCoords(x:number,xStart:number,xPixelRange:number,xRange:number):number{
//     return(x-xStart) * xPixelRange/xRange;
// }