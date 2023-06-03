import { yToPixelCoords } from "../../../helpers/yToPixelCoords";

export function DrawPrice (ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][],xLeft:number,startCandle:number, howCandleInRange:number, maxPrice:number, minPrice:number,candleWidth:number, candleSpacing:number){
    let range=maxPrice-minPrice
    let allWidth=candleWidth+candleSpacing
    let round = (a:number, b:number) => Math.round(a/b)*b
    let getDivider=(a:number)=>{
        let newA=String(a)
        let number='1'
        for (let i=0; i<newA.length-1; i++){
            number=number+'0'
        }
        return Number(number)
    }
    //end - high
    //start - low
    let roundedMaxPrice=round(maxPrice, getDivider(maxPrice))
    let roundedMinPrice=round(minPrice, getDivider(maxPrice))
    let yMax=yToPixelCoords(maxPrice,roundedMaxPrice,maxPrice-minPrice,canvas.height)
    let yMin=yToPixelCoords(maxPrice,roundedMinPrice,maxPrice-minPrice,canvas.height)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.beginPath();
    ctx.font = "11px Tahoma";
    ctx.fillStyle = "#aaaebf";
    //max
    ctx.moveTo(0.5, yMax);
	ctx.lineTo(5.5,yMax);
	ctx.strokeStyle = '#82848c';
	ctx.stroke();
    ctx.fillText(String(roundedMaxPrice),8, yMax+5)
    
    //min
    ctx.moveTo(0.5, yMin);
	ctx.lineTo(5.5,yMin);
	ctx.strokeStyle = '#82848c';
	ctx.stroke();
    ctx.fillText(String(roundedMinPrice), 8, yMin);
}