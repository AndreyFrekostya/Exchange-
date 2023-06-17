export function DateCanvasStart(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, data: string[][], xLeft:number,candleWidth:number,candleSpacing:number, scrollCandle:number, distance:string){
    let range = Math.floor(150/(candleWidth+candleSpacing))
    let coord=xLeft+candleWidth/2
    let maxXLeft=data.length*(candleWidth+candleSpacing)+xLeft
    function formatDateTime(timestamp:string, lastTimestamp:string) {
        let obj={year:0,month:'',day:'',hour:'',minutes:''}
        let obj2={year:0,month:'',day:'',hour:'',minutes:''}
        for(let i=0; i<3; i++){
            const date = new Date(i===1 ?timestamp : lastTimestamp);
            // Получаем значения года, месяца, дня и часа
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            if(i===1){
                obj.year=year
                obj.month=month
                obj.day=day
                obj.hour=hour
                obj.minutes=minutes
            }else{
                obj2.year=year
                obj2.month=month
                obj2.day=day
                obj2.hour=hour
                obj2.minutes=minutes
            } 
        }
        if(distance.slice(-1)==='М' || distance.slice(-1)==='Ч'){
            if(obj.day!==obj2.day){
                return `${obj.day}-${obj.month}`
            }else{
                return `${obj.hour}:${obj.minutes}`
            }
        }else{
            if(obj.year!==obj2.year){
                return `${obj.day}-${obj.month}-${obj.year}`
            }else{
                return `${obj.day}-${obj.month}`
            }
        }
    }
    ctx.clearRect( 0 , 0 , canvas.width , canvas.height  );
    ctx.font = "11px Tahoma";
    ctx.fillStyle = "#aaaebf";
    for (let i=0; coord<maxXLeft; i++){
        let x=coord+(candleWidth+candleSpacing)*range
        let lastAllLeft=Math.abs(xLeft)+coord
        let lastCandle=data[Math.floor(lastAllLeft/(candleWidth+candleSpacing))]
        let allLeft=Math.abs(xLeft)+x
        let neededCandle=data[Math.floor(allLeft/(candleWidth+candleSpacing))]
        if(neededCandle){
            ctx.beginPath();
            ctx.setLineDash([])
            ctx.lineWidth=1
            let ranger=String(x).includes('.') ? 0 : 0.5
            ctx.moveTo(x+ranger, 0);
            ctx.lineTo(x+ranger,5);
            ctx.strokeStyle = '#82848c';
            ctx.stroke();
            ctx.textAlign = 'center';
            ctx.fillText(formatDateTime(neededCandle[0], lastCandle[0]),x+0.5, 15+0.5)
        }
        coord=coord+(candleWidth+candleSpacing)*range
        
    }
    // ctx.
}