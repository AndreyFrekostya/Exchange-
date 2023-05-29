export function DrawVolumeTextOneCandle(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,color:string, volume:string){
    function nFormatter(num:number) {
        if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/.0$/, '') + 'B';
        }
        if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/.0$/, '') + 'M';
        }
        if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/.0$/, '') + 'k';
        }
        return num;
    }
    ctx.beginPath()
    ctx.fillStyle = color;
    ctx.fillStyle = '#aaaebf';
    ctx.font = "11px Tahoma";
    ctx.fillText(`VOLUME:`,8, 15)
    ctx.fillStyle = color;
    ctx.fillText(String(nFormatter(Math.round(Number(volume)))),60,15)
}