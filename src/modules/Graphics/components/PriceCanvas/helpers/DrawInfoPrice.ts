export function DrawInfoPrice (ctx:any,canvas:HTMLCanvasElement, howCandleInRange:number,maxPrice:number, minPrice:number,y:number, candleWidth:number, candleSpacing:number,q:boolean,fixedNumber:number,width:number){
  let price:string | number=minPrice + (canvas.height-y-61)*(maxPrice-minPrice)/(canvas.height-61);
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    ctx.fillStyle='#363a45'
    ctx.fillRect( 1, y+11, width-5.5 , 20 );
    ctx.strokeStyle='#363a45'
    ctx.beginPath()
    ctx.imageSmoothingEnabled = false;
    ctx.font = "100 10.5px Helvetica ";
    ctx.textRendering = "optimizeLegibility";
    ctx.fontStretch =  "ultra-expanded";
    ctx.fontKerning = "normal";
    ctx.letterSpacing = "0.5px";
    ctx.fillStyle = "#fff";
    //трансформирование цены
    let priceArr=String(price).split('.')
    if(priceArr[0]!=='0'){
      let ended=price.toFixed(1).split('.')[1]
      price=String(new Intl.NumberFormat('ru-RU').format(Number(priceArr[0])))
      let end=''.padEnd(fixedNumber,'0')
      if(price.includes(',')){
        price=price.replace(',','.')+'.'+end
      }else{
        price=price+'.'+end
      }
    }else{
      price=Number(price).toFixed(fixedNumber)
    }
    let priceLength=ctx.measureText(price).width
    let x=(width-priceLength)/2
    ctx.fillText(price!=='не число.undefined' ? price : '0',x, y+25)
  
}
