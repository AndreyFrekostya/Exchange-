import { DrawDot } from "./DrawDot";

export function DrawRectangle(ctx:CanvasRenderingContext2D, x:number, y:number, x1:number, y1:number){
    ctx.beginPath();
    ctx.fillStyle = 'rgba(50,30,66,0.5)'
	ctx.fillRect(x,y,x1-x,y1-y)
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#bc2bd4';
	ctx.strokeRect(x,y,x1-x,y1-y);
    ctx.closePath()
    DrawDot(ctx,x,y)
    DrawDot(ctx,x1,y)
    DrawDot(ctx,x1,y1)
    DrawDot(ctx,x,y1)
    DrawDot(ctx,(x1+x)/2,y)
    DrawDot(ctx,x1,(y1+y)/2)
    DrawDot(ctx,(x1+x)/2,y1)
    DrawDot(ctx,x,(y1+y)/2)
}
// ctx.moveTo(Math.round(x)+0.5,Math.round(y)+0.5)
//     ctx.lineTo(Math.round(x1)+0.5,Math.round(y)+0.5)
//     ctx.lineTo(Math.round(x1)+0.5,Math.round(y1)+0.5)
//     ctx.lineTo(Math.round(x)+0.5,Math.round(y1)+0.5)
//     ctx.lineTo(Math.round(x)+0.5,Math.round(y)+0.5)