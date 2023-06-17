export function DrawInfoVolume(ctx:any,canvas:HTMLCanvasElement,y:number, maxVolume:number,priceWidth:number){
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
    ctx.lineWidth = 0.1;
    ctx.fillStyle='#363a45'
    ctx.fillRect( 1 ,y-9.25 , priceWidth-4.5 , 20 );
    ctx.beginPath()
    ctx.imageSmoothingEnabled = false;
    ctx.font = "100 10.5px Helvetica ";
    ctx.textRendering = "optimizeLegibility";
    ctx.fontStretch =  "ultra-expanded";
    ctx.fontKerning = "normal";
    ctx.letterSpacing = "0.5px";
    ctx.fillStyle = "#fff";
    let priceLength=ctx.measureText(nFormatter(volume )).width
    let x=(priceWidth-priceLength)/2
    ctx.fillText(nFormatter(volume ),x, y+4.5)
}