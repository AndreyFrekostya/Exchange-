import { DrawDot } from "./DrawDot";

export function DrawGrLine(ctx:CanvasRenderingContext2D, y:number, x0:number, x1:number, xDot:number){
    ctx.beginPath();
	ctx.moveTo(Math.round(x0)+0.5,Math.round(y)+0.5)
    ctx.lineTo(Math.round(x1)+0.5,Math.round(y)+0.5)
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#2a65ff';
	ctx.stroke();
    ctx.closePath()
    DrawDot(ctx,Math.round(xDot)+0.5,Math.round(y)+0.5)
}