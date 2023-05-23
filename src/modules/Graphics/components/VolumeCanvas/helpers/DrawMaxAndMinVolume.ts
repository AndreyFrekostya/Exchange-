export function DrawMaxAndMinVolume(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement, maxVolume:number, minVolume:number){
    function nFormatter(num:number) {
        if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/.0$/, '') + 'B';
        }
        if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/.0$/, '') + 'M';
        }
        if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/.0$/, '') + 'K';
        }
        return num.toFixed(0);
    }
    const FixNumber=(num:number)=>{
        return num.toFixed(4)
    }
    const max=nFormatter(Number(maxVolume))
    const min=nFormatter(Number(minVolume))
    const heightScale = (ctx.canvas.height-15)  / maxVolume;

    const heightMax = maxVolume * heightScale;
    const heightMin=minVolume*heightScale
        // Рисование прямоугольника для графика объема
    
    ctx.beginPath();
    // to get a crisp 1 pixel wide line, we need to add 0.5 to the coords
    ctx.font = "11px Tahoma";
    ctx.fillStyle = "#aaaebf";
    //max
    ctx.moveTo(0.5, ctx.canvas.height - heightMax);
	ctx.lineTo(5.5,ctx.canvas.height - heightMax);
	ctx.strokeStyle = '#82848c';
	ctx.stroke();
    ctx.fillText(String(max),8, 15)

    //min
    ctx.moveTo(0.5, ctx.canvas.height - heightMin);
	ctx.lineTo(5.5,ctx.canvas.height - heightMin);
	ctx.strokeStyle = '#82848c';
	ctx.stroke();
    ctx.fillText(String(min), 8, 64);
}