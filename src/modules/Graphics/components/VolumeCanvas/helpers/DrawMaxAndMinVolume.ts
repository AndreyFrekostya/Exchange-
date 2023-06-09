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
    const rangeMaxMin=canvas.height-16-19
    const range=90
    let howLines=Math.round(rangeMaxMin/range)
    let newArr=[16,canvas.height-16]
    let volumeArr: number[]=[maxVolume,minVolume]
    let length=newArr.length
    for (let i=0; i<howLines-2; i++){
        addValue(newArr)
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
    ctx.font = "11px Tahoma";
    ctx.fillStyle = "#aaaebf";
    for (let i=0; i<newArr.length; i++){
        ctx.moveTo(1, newArr[i]+0.5);
        ctx.lineTo(5.5,newArr[i]+0.5);
        ctx.strokeStyle = '#82848c';
        ctx.stroke();
        ctx.fillText(String(nFormatter(volumeArr[i])),8, newArr[i]+4+0.5)
    }
}