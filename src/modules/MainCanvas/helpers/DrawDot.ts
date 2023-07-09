export function DrawDot(ctx:CanvasRenderingContext2D, x:number, y:number){
    ctx.beginPath();
	ctx.arc(Math.round(x), Math.round(y), 4.5, 0, 2*Math.PI, false);
	ctx.fillStyle = '#151924';
	ctx.fill();
	ctx.lineWidth = 1.5;
	ctx.strokeStyle = '#1f58f4';
	ctx.stroke();
    ctx.closePath()
}