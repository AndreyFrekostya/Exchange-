export function yToPixelCoords(maxPrice:number, price:number, priceRange:number, height:number):number{
    return  ((maxPrice-price) /priceRange)*height
}


//this.height - this.marginBottom - (y-this.yStart) * this.yPixelRange/this.yRange;