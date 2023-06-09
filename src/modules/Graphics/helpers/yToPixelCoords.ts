export function yToPixelCoords(maxPrice:number, price:number, priceRange:number, height:number):number{
    return  ((maxPrice-price) /priceRange)*height
}