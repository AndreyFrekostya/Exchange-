export function DrawCandle(ctx:CanvasRenderingContext2D, x:number , y:number , width:number , height:number , color:string, ){
    ctx.beginPath();
    ctx.fillStyle  = color;
	ctx.fillRect( x , y , width , height );
}