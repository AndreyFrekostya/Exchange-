import { Dispatch, SetStateAction } from "react";
import { yToPixelCoords } from "../../../helpers/yToPixelCoords";
import { getTransformedNumber } from "./getTransformedNumber";
import { getTransformedNumberWithFloat } from "./getTrasnformedNumerWithFloat";

export function DrawPrice (ctx:any,canvas:HTMLCanvasElement, data: string[][],xLeft:number,startCandle:number, howCandleInRange:number, maxPrice:number, minPrice:number,candleWidth:number, candleSpacing:number,  setWidth:Dispatch<SetStateAction<number>>,width:number,setInterval:Dispatch<SetStateAction<number>>,fixedNumber:number,dopHeightCanvas:number, yDown:number){
    let range=maxPrice-minPrice
    const height=dopHeightCanvas
    const labelsRange=height+21<120 ? 15 : 30
    const maxLabels = Math.round(height / (labelsRange + 5));
    let interval = 0
    let maxArr=String(maxPrice).split('.')
    let minArr=String(minPrice).split('.')
    let maxrounded=0
    let minrounded=0
    let rangeHeight=(canvas.height-dopHeightCanvas)/2
    if(maxArr[0]==='0' || minArr[0]==='0'){
        maxrounded=Number(getTransformedNumberWithFloat(Number(maxPrice),Math.ceil))
        minrounded=Number(getTransformedNumberWithFloat(Number(minPrice),Math.floor))
        interval=Number(getTransformedNumberWithFloat(Number(range / (maxLabels - 1)),Math.floor))
    }else{
        interval=range / (maxLabels - 1) > 0.50 && range / (maxLabels - 1)<1  ? Number(getTransformedNumberWithFloat(Math.ceil(range / (maxLabels - 1)))) : Number(getTransformedNumberWithFloat(range / (maxLabels - 1)))
        maxrounded=getTransformedNumber(Math.ceil(maxPrice),undefined,Math.ceil);
        minrounded=getTransformedNumber(Math.floor(minPrice),undefined,Math.floor);
        minrounded=minrounded-interval*20
    }
    //adaeth
    //Helvetica  
    //Tahoma
    //calibri 11.5px
    //Verdana
    setInterval(interval)
    while(minrounded<maxPrice+5*interval) {
        let price:number | string = minrounded+interval;
        minrounded=minrounded+interval
        const y=yToPixelCoords(maxPrice,price,range,height)+yDown+rangeHeight
        ctx.imageSmoothingEnabled = false;
        ctx.font = "100 10.5px Helvetica ";
        ctx.textRendering = "optimizeLegibility";
        ctx.fontStretch =  "ultra-expanded";
        ctx.fontKerning = "normal";
        ctx.letterSpacing = "0.5px";
        ctx.fillStyle = "#d1d4dc";
        if(maxArr[0]==='0'){
            let sI=String(interval)
            if(sI.split('.')[1]!==undefined){
                let sIArrLengthT=sI.split('.')[1].length
                if(sI.includes('-')){
                    let slicedBy=Number(sI[sI.length-1])
                    price=Number(price.toFixed(slicedBy+2))
                }else{
                    price=price.toFixed(sIArrLengthT+1)
                }
            }else if(sI.includes('e')){
                price=price.toFixed(Number(sI[sI.length-1]))
            }
        }else{
            price=String(new Intl.NumberFormat('ru-RU').format(price))
            let end=''.padEnd(fixedNumber,'0')
            if(price.includes(',')){
                price=price.replace(',','.')+'.'+end
            }else{
                price=price+'.'+end
            }
        }

        let priceLength=ctx.measureText(price).width
        let x=(width-priceLength)/2
        ctx.fillText(String(price), x, y);
    }
}