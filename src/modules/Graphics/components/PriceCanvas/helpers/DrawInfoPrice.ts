export function DrawInfoPrice (ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, howCandleInRange:number,maxPrice:number, minPrice:number,y:number, candleWidth:number, candleSpacing:number,q:boolean){
    const totalCandleHeight = candleWidth + candleSpacing;

  // Рассчитываем значение цены на основе координаты мыши
  // const priceRange = maxPrice - minPrice;
  // const pricePerPixel = priceRange / canvas.height;
  // const priceOffset = maxPrice - pricePerPixel * canvas.height;
  // const price = priceOffset - (y - canvas.height) * pricePerPixel;
  //end - high
  //start - low
  let price=minPrice + (canvas.height-y)*(maxPrice-minPrice)/(canvas.height+5);
  if(q){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.beginPath();
    ctx.fillStyle='#26304a'
    ctx.fillRect( 2 , y+20/2 , 59 , 20 );
    ctx.beginPath()
    ctx.fillStyle = '#aaaebf';
    ctx.font = "11px Tahoma";
    ctx.fillText(String(price.toFixed(1) ),8, y+25)
  }else{
    ctx.clearRect(0,0,canvas.width, canvas.height)
  }
}