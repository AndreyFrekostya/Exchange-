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
    //75
    const heightMax = maxVolume * heightScale;
    const rangeMaxMin=canvas.height-16-19
    const range=39
    let howLines=Math.round(rangeMaxMin/range)+1
    let coordsArr=[16,56]
    const heightMin=minVolume*heightScale
        // Рисование прямоугольника для графика объема
    
    ctx.beginPath();
    // to get a crisp 1 pixel wide line, we need to add 0.5 to the coords
    ctx.font = "11px Tahoma";
    ctx.fillStyle = "#aaaebf";
    //max
    ctx.moveTo(0.5, 16);
	ctx.lineTo(5.5,16);
	ctx.strokeStyle = '#82848c';
	ctx.stroke();
    ctx.fillText(String(max),8, 20)

    //min
    ctx.moveTo(0.5, canvas.height-19);
	ctx.lineTo(5.5,canvas.height-19);
	ctx.strokeStyle = '#82848c';
	ctx.stroke();
    ctx.fillText(String(min), 8, canvas.height-16);
    // for (let i=0; i<coordsArr.length; i++){
    //     let merge=coordsArr[i]+coordsArr[i+1]/2
    //     coordsArr.push(merge)
    //     coordsArr.sort((a, b) => a - b)
    // }
    // console.log(coordsArr)
}