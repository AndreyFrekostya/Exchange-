export function DrawInfoVolume(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,y:number, maxVolume:number){
    function nFormatter(num:number) {
        if (num >= 1000000000) {
        return (num / 1000000000).toFixed(3).replace(/.0$/, '') + 'B';
        }
        if (num >= 1000000) {
        return (num / 1000000).toFixed(3).replace(/.0$/, '') + 'M';
        }
        if (num >= 1000) {
        return (num / 1000).toFixed(3).replace(/.0$/, '') + 'K';
        }
        return num.toFixed(0);
    }
    const heightScale=(canvas.height-14)/maxVolume;
    let volume=(canvas.height-y)/heightScale
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.beginPath();
    ctx.fillStyle='#26304a'
    ctx.fillRect( 2 , y-10 , 59 , 20 );
    ctx.beginPath()
    ctx.fillStyle = '#aaaebf';
    ctx.font = "11px Tahoma";
    ctx.fillText(nFormatter(volume ),8, y+4)
}