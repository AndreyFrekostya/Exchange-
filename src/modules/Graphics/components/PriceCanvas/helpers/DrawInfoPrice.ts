export function DrawInfoPrice (ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, howCandleInRange:number,maxPrice:number, minPrice:number,y:number, candleWidth:number, candleSpacing:number,q:boolean){
  let price=minPrice + (canvas.height-y)*(maxPrice-minPrice)/(canvas.height+5);
  if(q){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.fillStyle='#26304a'
    ctx.fillRect( 2 , Math.round(y+20/2) , 59 , 20 );
    ctx.strokeStyle='#26304a'
    ctx.lineWidth=0.1
    ctx.strokeRect( 2 , Math.round(y+20/2) , 59 , 20 );
    ctx.beginPath()
    ctx.fillStyle = '#aaaebf';
    ctx.font = "11px Tahoma";
    ctx.fillText(String(price.toFixed(1) ),8.5, y+24.5)
  }else{
    ctx.clearRect(0,0,canvas.width, canvas.height)
  }
}
