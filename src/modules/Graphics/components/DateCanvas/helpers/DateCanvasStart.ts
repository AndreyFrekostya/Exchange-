export function DateCanvasStart(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][], xLeft:number,candleWidth:number,candleSpacing:number, scrollCandle:number){
    let range = (candleWidth+candleSpacing)*10
    let kol=(Math.abs(xLeft)+canvas.width)/range
    let coord=xLeft
    let numberOfCandle=0
    function formatDateTime(timestamp:string) {
        const date = new Date(timestamp);
        // Получаем значения года, месяца, дня и часа
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        // Формируем строку с датой и временем
        const formattedDateTime = `${year}.${month}.${day}, ${hour}:${minutes}`;
        
        return formattedDateTime;
      }
      ctx.clearRect( 0 , 0 , canvas.width , canvas.height  );
      ctx.font = "11px Tahoma";
    ctx.fillStyle = "#aaaebf";
    for (let i=0; i<kol; i++){
        let allLeft=coord
        let neededCandle=data[Math.floor(Math.abs(allLeft/(candleWidth+candleSpacing)))]
        let x=(numberOfCandle-scrollCandle)*(candleWidth+candleSpacing)+candleWidth/2
        console.log(numberOfCandle, x)
        if(neededCandle){
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x,10);
            ctx.strokeStyle = '#82848c';
            ctx.stroke();
            ctx.fillText(formatDateTime(neededCandle[0]),x-45, 20)
        }
        coord=coord+range
        numberOfCandle=numberOfCandle+(range/(candleWidth+candleSpacing))
        
    }
    // ctx.
}