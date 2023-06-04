export function DrawMovingDate(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][], xLeft:number,eClientX:number,candleWidth:number, candleSpacing:number, scrolledCandle:number, pressedCandle:string[] | undefined){
    let rect=canvas.getBoundingClientRect()
    let allLeft=Math.abs(xLeft)+(eClientX-rect.left)
    let neededCandle=data[Math.floor(allLeft/(candleWidth+candleSpacing))]
    let date='0'
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
    let x=(data.indexOf(neededCandle)-scrolledCandle)*(candleWidth+candleSpacing)+candleWidth/2
    // if(pressedCandle!==undefined){
    //     x=(data.indexOf(pressedCandle)-scrolledCandle)*(candleWidth+candleSpacing)+candleWidth/2
    // }
    if(!neededCandle){
        x=-200
    }
    if(x+60>canvas.width){
        x=canvas.width-65
    }
    if(x-65<0 && eClientX!==-200){
        x=65
    }
    if(neededCandle!==undefined){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.beginPath();
        ctx.fillStyle='#26304a'
        ctx.fillRect( x-65 , 2 , 130 , 20 );
        ctx.beginPath()
        ctx.fillStyle = '#aaaebf';
        ctx.font = "11px Tahoma";
        ctx.fillText(formatDateTime(neededCandle[0]),x-45, 15)
    }
}