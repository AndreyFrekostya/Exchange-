export function DrawCandle(ctx:CanvasRenderingContext2D, x:number , y:number , width:number , height:number , color:string ){
    ctx.beginPath();
    ctx.setLineDash([]);
	ctx.lineWidth = 0.1;
    ctx.fillStyle  = color;
	ctx.fillRect( x , y , width , height );
    ctx.strokeStyle=color
    ctx.lineWidth=0.1
    ctx.strokeRect(x,y,width,height)
}