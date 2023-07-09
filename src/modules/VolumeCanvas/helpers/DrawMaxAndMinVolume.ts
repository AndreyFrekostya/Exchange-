export function DrawMaxAndMinVolume(ctx:any,canvas:HTMLCanvasElement, maxVolume:number, minVolume:number,width:number,dopHeight:number, yDown:number){
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
    const heightCanvas=dopHeight
    const heightScale = (heightCanvas-15)  / maxVolume;
    const rangeMaxMin=heightCanvas-16-19
    const range=80
    let howLines=Math.round(rangeMaxMin/range)
    let newArr=[16,heightCanvas-16]
    let volumeArr: number[]=[maxVolume,minVolume]
    let rangeHeight=(canvas.height-dopHeight)/2
    for (let i=0; i<howLines-2; i++){
        if(newArr[i+1]-newArr[i]>80){
            addValue(newArr)
        }else{
            break
        }
    }
    function addValue(arr: number[]){
        let length=arr.length
        
        for (let i=0; i<length-1; i++){
            let merge=(arr[i]+arr[i+1])/2
            arr.push(merge)
            volumeArr.push(merge/heightScale)
        }
        arr.sort((a, b) => a - b)
        volumeArr.sort((a, b) => b - a)
    }
    // Рисование прямоугольника для графика объема
    ctx.beginPath();
    // to get a crisp 1 pixel wide line, we need to add 0.5 to the coords
    ctx.imageSmoothingEnabled = false;
    ctx.font = "100 10.5px Helvetica ";
    ctx.textRendering = "optimizeLegibility";
    ctx.fontStretch =  "ultra-expanded";
    ctx.fontKerning = "normal";
    ctx.letterSpacing = "0.5px";
    ctx.fillStyle = "#d1d4dc";
    for (let i=0; i<newArr.length; i++){
        let length=ctx.measureText(String(nFormatter(volumeArr[i]))).width
        let x=(width-length)/2
        ctx.strokeStyle = '#82848c';
        ctx.stroke();
        let newHeightScale=(canvas.height-15)  / maxVolume
        let y=heightScale*volumeArr[i]+yDown+rangeHeight
        if(i==newArr.length-1){
            y=y+5
        }
        ctx.fillText(String(nFormatter(volumeArr[i])),x, canvas.height-y)
        //newArr[i]+4+0.5
    }
}