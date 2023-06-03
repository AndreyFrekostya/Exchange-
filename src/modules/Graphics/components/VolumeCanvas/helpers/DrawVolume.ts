import { RefObject } from "react";
import { yToPixelCoords } from "../../../helpers/yToPixelCoords";

export function DrawVolume(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][], maxVolume:number,xLeft:number,candleWidth:number, candleSpacing:number){
    const chartHeight=canvas.height
    const chartWidth=canvas.width
    const redColor='#EB602F'
    const greenColor='#37DBBA'
    let x0=xLeft
    const heightScale = (ctx.canvas.height-15) / maxVolume;
    // Рисование графика объема для каждой свечи
    data.forEach((candle)=>{
        const volume = Number(candle[5]);
        // Вычисление высоты графика объема
        const height = volume * heightScale;
        ctx.fillStyle = candle[4] > candle[1]  ? greenColor : redColor;;
        // Рисование прямоугольника для графика объема
        ctx.fillRect(x0, ctx.canvas.height - height, candleWidth, height);

        // Обновление координат для следующей свечи
        x0=x0+candleWidth+candleSpacing
    })
}