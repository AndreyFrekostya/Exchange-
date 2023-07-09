import { yToPixelCoords } from "../../../helpers/yToPixelCoords";

export function DrawLastUpdatedPrice(ctx:any,canvas:HTMLCanvasElement, candle: string[], maxPrice:number,priceRange:number,height:number, timer:string,timeFrame:string,fixedNumber:number, width:number, dopHeight:number,yDown:number){
    let range=dopHeight ? (height-dopHeight)/2 : 0
    let newHeight=dopHeight ? dopHeight : height
    let color = candle[4] > candle[1]  ? '#09e8bb' : '#EB602F';
    let colorForText=candle[4]>candle[1] ? '#191970' : '#fff'
    let price: string | number=Number(candle[4])
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
    const yLine=Math.round(yToPixelCoords(maxPrice,Number(candle[4]),priceRange,newHeight))+range+yDown
    ctx.beginPath();
	ctx.setLineDash([0,0]);
	ctx.lineWidth = 1;
    ctx.fillStyle=color
    let widthTimer=ctx.measureText(timer).width
    let xTimer=(width-widthTimer)/2
	ctx.fillRect(1,yLine+5,width-5.7,30)
    ctx.font = "100 10.5px Helvetica ";
    ctx.textRendering = "optimizeLegibility";
    ctx.fontStretch =  "ultra-expanded";
    ctx.fontKerning = "normal";
    ctx.letterSpacing = "0.5px";
    ctx.fillStyle = colorForText;
    ctx.closePath()
    ctx.beginPath()
    ctx.fillText(timer,xTimer,yLine+30.5)
    ctx.fillText(price,x, yLine+15.5)
}