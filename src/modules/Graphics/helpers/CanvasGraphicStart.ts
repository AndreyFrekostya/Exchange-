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

export function CanvasGraphicStart(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,ctx2:CanvasRenderingContext2D,canvas2:HTMLCanvasElement, data: string[][], refContainer:RefObject<HTMLDivElement>,maxPrice:number, minPrice:number,candleWidth:number, candleSpacing:number){
        const candlestiks=data
        let container=refContainer.current
        const marginRight=30
        const marginBottom=40
        const heightCanvas=canvas.height
        const widthCanvas=candlestiks.length*(candleWidth+2)
        canvas.width=widthCanvas
        const width = parseInt( String(widthCanvas) )-marginRight;
	const height = parseInt( String(heightCanvas) )-marginBottom;
        ctx.clearRect( 0 , 0 , widthCanvas , heightCanvas );
        const redColor='#ef5350'
        const greenColor='#26a69a'
        let b_drawMouseOverlay=false
        let yPixelRange = height-marginBottom
        let zoomStartID=0
        let yMouseHover=0
        let hoveredCandlestickID=0
        let xMouseHover=0
        let xPixelRange = width-marginRight;
        let priceRange = maxPrice - minPrice;
        DrawCandleFunc(ctx,candlestiks,width,candleWidth,maxPrice,priceRange,height,candleSpacing)
        if(container){
                container.scrollLeft=container.scrollWidth
        }
        
        let scale = 1;

        // Обработчик события скролла колеса мыши
        // canvas2.addEventListener('wheel', (event) => {
        //         event.preventDefault(); // Отключаем стандартное поведение страницы при скролле

        //         // Изменяем значение масштабирования в зависимости от направления скролла
        //         if (event.deltaY < 0) {
        //         scale += 0.1;
        //         candleWidth+=1
        //         } else {
        //         scale -= 0.1;
        //         candleWidth-=1
        //         }

        //         // Ограничиваем масштабирование в пределах от 0.1 до 2
        //         if (scale < 0.1) {
        //         scale = 0.1;
        //         } else if (scale > 5) {
        //         scale = 5;
        //         }
        //         console.log(candleWidth)
        //         // Устанавливаем новое значение масштабирования контекста canvas
        //         // ctx.setTransform(scale, 0, 0, scale, 0, 0);
        //         ctx.clearRect( 0 , 0 , widthCanvas , heightCanvas );
        //         DrawCandleFunc(ctx,candlestiks,width,candleWidth,maxPrice,priceRange,height)
        // });
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
                        
                        

                        yMouseHover = yToValueCoords(minPrice,height,marginBottom, mousePosition.y,priceRange,yPixelRange );
                        xMouseHover = xToValueCoords(Number(candlestiks[0][0]),Number(candlestiks[0][0])-Number(candlestiks[candlestiks.length-1][0]), mousePosition.x,xPixelRange );
                        let candlestickDelta = Number(candlestiks[0][0])-Number(candlestiks[candlestiks.length-1][0]);
                        hoveredCandlestickID = Math.floor((xMouseHover-Number(candlestiks[0][0]))/candlestickDelta);
                        xMouseHover = Math.floor(xMouseHover/candlestickDelta)*candlestickDelta;
                        // mousePosition.x = xToPixelCoords((Number(candlestiks[0][0])),candlestiks.slice(scrollCandle,scrollCandle+howCandleInRange),width,candleWidth );
                        ctx2.fillStyle = "#737478";
                        ctx2.font = "11px Tahoma";
                        ctx2.fillText( "O: "+candlestiks[hoveredCandlestickID][1] ,5,30, );
                        ctx2.fillText( "C: "+candlestiks[hoveredCandlestickID][4] ,75,30, );
                        ctx2.fillText( "H: "+candlestiks[hoveredCandlestickID][2] ,145,30, );
                        ctx2.fillText( "L: "+candlestiks[hoveredCandlestickID][4] ,215,30, );
                        
                }else{
                        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                }
        })   
        canvas2.addEventListener('mouseleave',function(){
                b_drawMouseOverlay=false
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        })    
}

        