export function DrawVolumeFunc(ctx:CanvasRenderingContext2D,candlestiks:string[][],candleWidth:number,maxVolume:number,candleSpacing:number,xLeft:number){
    const heightScale = (ctx.canvas.height-15)  / maxVolume;
    let x = xLeft;
    const redColor='#EB602F'
    const greenColor='#03fcdf'
    // Рисование графика объема для каждой свечи
    candlestiks.forEach((candle)=>{
        const volume = Number(candle[5]);

        // Вычисление высоты графика объема
        const height = volume * heightScale;
        ctx.fillStyle = candle[4] > candle[1]  ? greenColor : redColor;;
        // Рисование прямоугольника для графика объема
        ctx.fillRect(Math.round(x), Math.round(ctx.canvas.height - height), candleWidth, height);

        // Обновление координат для следующей свечи
        x += candleWidth + candleSpacing;
    })
}