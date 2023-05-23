import { RefObject } from "react";
import { xToPixelCoords } from "../../../helpers/xToPixelCoords";
import { yToPixelCoords } from "../../../helpers/yToPixelCoords";

export function DrawVolume(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,container:HTMLDivElement, data: string[][], maxVolume:number){
    const marginRight=30
    const chartHeight=canvas.height
    const chartWidth=data.length*3
    canvas.width=chartWidth-30
    const width=chartWidth-marginRight
    const candleWidth=1.5
    const redColor='#ef5350'
    const greenColor='#26a69a'
    let x = candleWidth / 2;
    let y = 0;
    const candleSpacing=1.7
    if(container){
        container.scrollLeft=container.scrollWidth
    }
    // Масштабирование графика объема по высоте
    const heightScale = (ctx.canvas.height-15) / maxVolume;

    // Рисование графика объема для каждой свечи
    data.forEach((candle)=>{
        const volume = Number(candle[5]);
        // Вычисление высоты графика объема
        const height = volume * heightScale;
        ctx.fillStyle = candle[4] > candle[1]  ? greenColor : redColor;;
        // Рисование прямоугольника для графика объема
        ctx.fillRect(x, ctx.canvas.height - height, candleWidth, height);

        // Обновление координат для следующей свечи
        x += candleWidth + candleSpacing+10;
    })
}


//   data.forEach((candle)=>{
//     const x = xToPixelCoords(Number(candle[0]),data,chartWidth,candleWidth) - candleWidth / 2;
//     const y = yToPixelCoords(maxPrice,Number(candle[4]),priceRange,chartHeight);
//     const volumeHeight = ((Number(candle[5]) / 100000) * chartHeight) / 2;
//     ctx.fillStyle = candle[4] > candle[1]  ? greenColor : redColor;;
//     ctx.fillRect(x, y + 2, candleWidth, volumeHeight);
// })