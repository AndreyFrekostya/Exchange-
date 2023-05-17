export function xToValueCoords(xStart:number,xRange:number,x:number,xPixelRange:number){
    return xStart + ( x - 0) * xRange/xPixelRange;
}