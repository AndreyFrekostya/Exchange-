import { RefObject } from "react";
import { CalculateXRange } from "./CalculateXRange";
import { CalculateYRange } from "./CalculateYRange";
import { DrawCandle } from "./DrawCandle";
import { DrawLine } from "./DrawLine";
import { xToPixelCoords } from "./xToPixelCoords";
import { yToPixelCoords } from "./yToPixelCoords";
import { yToValueCoords } from "./yToValueCoords";
import { xToValueCoords } from "./xToValueCoords";
import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import { DrawCandleFunc } from "./DrawCandleFunc";
interface ICanvasGraphicStart {
        ctx:CanvasRenderingContext2D,
        canvas:HTMLCanvasElement,
        ctx2:CanvasRenderingContext2D,
        canvas2:HTMLCanvasElement, 
        data: string[][], 
        refContainer:RefObject<HTMLDivElement>,
        maxPrice:number, 
        minPrice:number,
        candleWidth:number, 
        candleSpacing:number,
        xStartLeft:number, 
        setXStart:(arg:number)=>void,
        howCandleInRange:number,
        startCandle:number
}
export function CanvasGraphicStart({ctx,canvas,ctx2,canvas2, data, refContainer,maxPrice,minPrice,candleWidth,candleSpacing,xStartLeft, setXStart, howCandleInRange, startCandle}:ICanvasGraphicStart):void{
        const candlestiks=data
        let container=refContainer.current
        const marginRight=30
        const marginBottom=40
        const width = parseInt( String(canvas.width) )-marginRight;
	const height = parseInt( String(canvas.height) )-marginBottom;
        ctx.clearRect( 0 , 0 , width , height );
        const redColor='#ef5350'
        const greenColor='#26a69a'
        let b_drawMouseOverlay=false
        const priceRange = maxPrice - minPrice;
        DrawCandleFunc(ctx,candlestiks,width,candleWidth,maxPrice,priceRange,height,candleSpacing, howCandleInRange, startCandle, xStartLeft)
        if(container){
                container.scrollLeft=container.scrollWidth
        }
        
        //при движении мыши
        canvas2?.addEventListener('mousemove',function(e){
                const getMousePos = ( e: MouseEvent) =>{
                    let rect = canvas2.getBoundingClientRect();
                    return { x: e.clientX-rect.left , y: e.clientY-rect.top };
                }
                let mousePosition = getMousePos( e );
                mousePosition.x += candleWidth/2;
                b_drawMouseOverlay = true;
                if ( mousePosition.x < 0 ) b_drawMouseOverlay = false;
                if ( mousePosition.x > canvas2.width-1 ) b_drawMouseOverlay = false;
                if ( mousePosition.y > canvas2.height-5 || mousePosition.y<1 ) b_drawMouseOverlay = false;
                if(b_drawMouseOverlay){
                        let crosshairX = e.offsetX;
                        let crosshairY = e.offsetY;
                        // очищаем холст
                        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                        // рисуем перекрестие
                        ctx2.beginPath();
                        ctx2.lineWidth=0.5
                        ctx2.setLineDash([4,4])
                        ctx2.moveTo(crosshairX, 0);
                        ctx2.lineTo(crosshairX, canvas2.height);
                        ctx2.moveTo(0, crosshairY);
                        ctx2.lineTo(canvas2.width, crosshairY);
                        ctx2.strokeStyle='#425382'
                        ctx2.stroke();
                        
                        

                        // yMouseHover = yToValueCoords(minPrice,height,marginBottom, mousePosition.y,priceRange,yPixelRange );
                        // xMouseHover = xToValueCoords(Number(candlestiks[0][0]),Number(candlestiks[0][0])-Number(candlestiks[candlestiks.length-1][0]), mousePosition.x,xPixelRange );
                        // let candlestickDelta = Number(candlestiks[0][0])-Number(candlestiks[candlestiks.length-1][0]);
                        // hoveredCandlestickID = Math.floor((xMouseHover-Number(candlestiks[0][0]))/candlestickDelta);
                        // xMouseHover = Math.floor(xMouseHover/candlestickDelta)*candlestickDelta;
                        // // mousePosition.x = xToPixelCoords((Number(candlestiks[0][0])),candlestiks.slice(scrollCandle,scrollCandle+howCandleInRange),width,candleWidth );
                        // ctx2.fillStyle = "#737478";
                        // ctx2.font = "11px Tahoma";
                        // ctx2.fillText( "O: "+candlestiks[hoveredCandlestickID][1] ,5,30, );
                        // ctx2.fillText( "C: "+candlestiks[hoveredCandlestickID][4] ,75,30, );
                        // ctx2.fillText( "H: "+candlestiks[hoveredCandlestickID][2] ,145,30, );
                        // ctx2.fillText( "L: "+candlestiks[hoveredCandlestickID][4] ,215,30, );
                        
                }else{
                        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                }
        })   
        canvas2.addEventListener('mouseleave',function(){
                b_drawMouseOverlay=false
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        })    
}

        