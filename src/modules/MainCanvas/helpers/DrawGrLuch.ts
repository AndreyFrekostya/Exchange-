import { DrawDot } from "./DrawDot";

export function DrawGrLuch(ctx:CanvasRenderingContext2D, x:number, y:number, x1:number){
    ctx.beginPath();
	ctx.moveTo(Math.round(x)+0.5,Math.round(y)+0.5)
    ctx.lineTo(Math.round(x1)+0.5,Math.round(y)+0.5)
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#2a65ff';
	ctx.stroke();
    ctx.closePath()
    DrawDot(ctx, x,y)
}