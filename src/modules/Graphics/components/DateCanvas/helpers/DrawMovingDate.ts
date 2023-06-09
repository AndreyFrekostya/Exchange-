export function DrawMovingDate(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][], xLeft:number,eClientX:number,candleWidth:number, candleSpacing:number, scrolledCandle:number, pressedCandle:string[] | undefined){
    let rect=canvas.getBoundingClientRect()
    let allLeft=xLeft>=0 ? (eClientX-rect.left)-Math.abs(xLeft) : Math.abs(xLeft)+(eClientX-rect.left)
    let neededCandle=data[Math.floor(allLeft/(candleWidth+candleSpacing))]
    function formatDateTime(timestamp:string) {
        const date = new Date(timestamp);
        // Получаем значения года, месяца, дня и часа
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        // Формируем строку с датой и временем
        const formattedDateTime = `${day}.${month}.${year}, ${hour}:${minutes}`;
        
        return formattedDateTime;
      }
    let x=(data.indexOf(neededCandle)-scrolledCandle)*(candleWidth+candleSpacing)+candleWidth/2
    if(!neededCandle){
        x=-200
    }
    if(x+60>canvas.width){
        x=canvas.width-65
    }
    if(x-65<0 && eClientX!==-200){
        x=65
    }
    if(x!==-200){
        if(neededCandle!==undefined){
            ctx.clearRect(0,0,canvas.width, canvas.height)
            ctx.beginPath();
            ctx.lineWidth = 0.1;
            ctx.fillStyle='#26304a'
            ctx.fillRect( Math.round(x-65) , 2 , 130 , 20 );
            ctx.strokeStyle='#26304a'
            ctx.lineWidth=0.1
            ctx.strokeRect(Math.round(x-65) , 2 , 130 , 20)
            ctx.beginPath()
            ctx.fillStyle = '#aaaebf';
            ctx.font = "11px Tahoma";
            ctx.fillText(formatDateTime(neededCandle[0]),x-45.5, 15.5)
        }else{
            ctx.clearRect(0,0,canvas.width,canvas.height) 
        }
    }else{
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
}