export function DrawLine(ctx:CanvasRenderingContext2D,xStart:number , yStart:number , xEnd:number , yEnd:number,candleWidth:number , color:string ){
	ctx.beginPath();
	ctx.setLineDash([]);
	ctx.lineWidth = 0.75;
    // to get a crisp 1 pixel wide line, we need to add 0.5 to the coords
	ctx.moveTo( xStart+candleWidth/2 , yStart+0.5);
	ctx.lineTo( xEnd+candleWidth/2  , yEnd+0.5);
	ctx.strokeStyle = color;
	ctx.stroke();
}