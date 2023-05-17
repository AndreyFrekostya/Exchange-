export function yToValueCoords(minPrice:number,height:number,marginBottom:number, y:number,priceRange:number,yPixelRange:number ){
    return minPrice + ( height - marginBottom - y ) * priceRange/yPixelRange;
}