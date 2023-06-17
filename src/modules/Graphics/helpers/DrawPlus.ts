export function DrawPlus(ctx:any,canvas:HTMLCanvasElement,y:number){
    ctx.beginPath();
    ctx.setLineDash([])
    ctx.lineWidth=1
    ctx.fillStyle='#363a45'
    ctx.fillRect(Math.floor(canvas.width-19),y-9.5,20,20)
    ctx.arc(canvas.width-9.5, y, 7, 0, 2 * Math.PI, false);
    ctx.moveTo(canvas.width-14.2,y)
    ctx.lineTo(canvas.width-5,y)
    ctx.moveTo(canvas.width-9.5,y+5)
    ctx.lineTo(canvas.width-9.5,y-4.5)
    ctx.strokeStyle = '#fff';
    ctx.stroke();
}