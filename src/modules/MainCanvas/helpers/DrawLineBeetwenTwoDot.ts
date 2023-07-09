export function DrawLineBetweenTwoDot(ctx:CanvasRenderingContext2D, x1:number,y1:number, x2:number, y2:number){
    ctx.beginPath();
	ctx.moveTo(Math.round(x1)+0.5,Math.round(y1)+0.5)
    ctx.lineTo(Math.round(x2)+0.5,Math.round(y2)+0.5)
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#fff';
	ctx.stroke();
    ctx.closePath()
}