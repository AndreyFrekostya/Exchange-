export function CalculateYRange(candlesticks:string[][]){
    const copy=[...candlesticks]
    const sortedCandleSticksByHigh=copy.sort((a,b)=>Number(b[2])-Number(a[2]))//by high
    const sortedCandleSticksByLow=copy.sort((a,b)=>Number(a[3])-Number(b[3]))//by low
    let yStart = Number(sortedCandleSticksByHigh[0][2]);
    let yEnd = Number(sortedCandleSticksByLow[0][3]);
    let yRange = yStart - yEnd;
    console.log(yStart,yEnd,yRange);
    return [yStart,yEnd,yRange]
}