export function CalculateXRange(candlesticks:string[][]){
    const xStart=Number(candlesticks[0][0])
    const xEnd=Number(candlesticks[candlesticks.length-1][0])
    const xRange=xEnd-xStart
    return [xStart,xEnd,xRange]
}