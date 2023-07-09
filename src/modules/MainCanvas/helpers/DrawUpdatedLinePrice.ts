import { yToPixelCoords } from "../../Graphics/helpers/yToPixelCoords";
import { DrawLine } from "./DrawLine";

export function DrawUpdatedLinePrice(ctx:CanvasRenderingContext2D, candle:string[],height:number, maxPrice:number, priceRange:number, xLeft:number, width:number, dopHeight: number, yDown:number){
	let color = candle[4] > candle[1]  ? '#03fcdf' : '#EB602F';
	let range=dopHeight ? (height-dopHeight)/2 : 0
	let newHeight=dopHeight ? dopHeight : height
    const yLine=Math.round(yToPixelCoords(maxPrice,Number(candle[4]),priceRange,newHeight))+0.5+range+yDown
    ctx.beginPath();
	ctx.setLineDash([2,2]);
	ctx.lineWidth = 1;
	ctx.moveTo( Math.round(xLeft)+0.5 , yLine);
	ctx.lineTo( Math.round(width)*2+0.5  , yLine);
	ctx.strokeStyle = color;
	ctx.stroke();
}