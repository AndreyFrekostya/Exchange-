export function DrawLine(ctx:CanvasRenderingContext2D,xStart:number , yStart:number , xEnd:number , yEnd:number,candleWidth:number , color:string ){
	ctx.beginPath();
    // to get a crisp 1 pixel wide line, we need to add 0.5 to the coords
	ctx.moveTo( xStart+candleWidth/2 , yStart);
	ctx.lineTo( xEnd+candleWidth/2  , yEnd);
	ctx.strokeStyle = color;
	ctx.stroke();
}