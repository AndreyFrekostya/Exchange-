import { yToPixelCoords } from "../../../helpers/yToPixelCoords";
import { getTransformedNumber } from "./getTransformedNumber";

export function DrawPrice (ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][],xLeft:number,startCandle:number, howCandleInRange:number, maxPrice:number, minPrice:number,candleWidth:number, candleSpacing:number){
    let range=maxPrice-minPrice
    let numberLines=20
    const maxLabels = Math.floor(canvas.height / (30 + 5)); // Максимальное количество меток, учитывая высоту шкалы и размер шрифта
    const interval = getTransformedNumber(Math.round(range / (maxLabels - 1)));
    const numLabels = Math.min(maxLabels, Math.ceil(range / interval) + 1);
    let firstPrice=Math.round((maxPrice+1* interval)/1000)*1000;
    // Отрисовка меток цены и горизонтальных линий
    ctx.clearRect(0,0,canvas.width,canvas.height)
    canvas.width=canvas.width
    for (let i = 0; i < numLabels*3; i++) {
        const price = firstPrice-interval;
        firstPrice=price
        
        // const y = canvas.height - i * (canvas.height / (numLabels - 1));
        const y=Math.round(yToPixelCoords(maxPrice,price,range,canvas.height))
        let ranger=String(y).includes('.') ? 0 : 0.5
        // Отрисовка горизонтальной линии
        // Отрисовка текста метки цены
        ctx.lineWidth=1
        ctx.moveTo(1, y+ranger);
        ctx.lineTo(5.5,y+ranger);
        ctx.strokeStyle = '#82848c';
        ctx.stroke();
            
        ctx.font = "11px Tahoma";
        ctx.fillStyle = "#aaaebf";
        ctx.fillText(String(price.toLocaleString()), 9, y+3+ranger);
    }
}
// let allWidth=candleWidth+candleSpacing
// let round = (a:number, b:number) => Math.round(a/b)*b
// let getDivider=(a:number)=>{
//     let newA=String(a)
//     let number='1'
//     for (let i=0; i<newA.length-1; i++){
//         number=number+'0'
//     }
//     return Number(number)
// }
//end - high
//start - low
// let roundedMaxPrice=round(maxPrice, getDivider(maxPrice))
// let roundedMinPrice=round(minPrice, getDivider(maxPrice))
// let yMax=yToPixelCoords(maxPrice,roundedMaxPrice,maxPrice-minPrice,canvas.height)
// let yMin=yToPixelCoords(maxPrice,roundedMinPrice,maxPrice-minPrice,canvas.height)
// ctx.clearRect(0,0,canvas.width,canvas.height)
// ctx.beginPath();
// ctx.font = "11px Tahoma";
// ctx.fillStyle = "#aaaebf";
// //max

// ctx.lineTo(5.5,yMax);
// ctx.strokeStyle = '#82848c';
// ctx.stroke();
// ctx.fillText(String(roundedMaxPrice),8, yMax+5)

// //min
// ctx.moveTo(0.5, yMin);
// ctx.lineTo(5.5,yMin);
// ctx.strokeStyle = '#82848c';
// ctx.stroke();
// ctx.fillText(String(roundedMinPrice), 8, yMin);