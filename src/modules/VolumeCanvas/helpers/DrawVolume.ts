export function DrawVolume(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][], maxVolume:number,xLeft:number,candleWidth:number, candleSpacing:number, dopHeight:number, yDown:number){
    const redColor='#EB602F'
    const greenColor='#03fcdf'
    let x0=xLeft
    let range=dopHeight ? (ctx.canvas.height-dopHeight)/2 : 0
    let newHeight=dopHeight ? dopHeight : ctx.canvas.height
    const heightScale = (newHeight-14) / maxVolume;
    // Рисование графика объема для каждой свечи
    data.forEach((candle)=>{
        const volume = Number(candle[5]);
        // Вычисление высоты графика объема
        const height = volume * heightScale;
        ctx.fillStyle = candle[4] > candle[1]  ? greenColor : redColor;
        // Рисование прямоугольника для графика объема
        ctx.fillRect(Math.round(x0), newHeight - height+range-yDown, candleWidth, height);

        // Обновление координат для следующей свечи
        x0=x0+candleWidth+candleSpacing
    })
}