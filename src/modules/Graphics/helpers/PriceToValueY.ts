export function  PriceToValueY(maxPrice:number, minPrice:number, howCandleInRange:number, allWidth:number, height:number, y:number){
    const priceRange = maxPrice - minPrice;
    const pricePerPixel = priceRange / (howCandleInRange * allWidth);
    const priceOffset = (height - y) * pricePerPixel;
    const price = ((y)*priceRange/(height-21))-maxPrice;
    return price
}