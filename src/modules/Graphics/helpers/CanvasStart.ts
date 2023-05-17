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

export function CanvasStart(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,ctx2:CanvasRenderingContext2D,canvas2:HTMLCanvasElement,data: string[][], refContainer:RefObject<HTMLDivElement>){
        const candlestiks=data
        let container=refContainer.current
        const marginRight=30
        const marginBottom=40
        let candleWidth = 3;
        let scrollCandle=0
        let howCandleInRange=0
        if(refContainer.current){
                howCandleInRange=Math.round(refContainer.current.clientWidth/candleWidth)
                scrollCandle=candlestiks.length-howCandleInRange-1
        }
        const heightCanvas=canvas.height
        const widthCanvas=candlestiks.length*3
        canvas.width=widthCanvas
        console.log('start')
        // устанавливаем ширину 2 канваса
        if(container){
                canvas2.width=container.clientWidth
        }
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
        let minPrice=Math.min(...candlestiks.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[3])));
        let maxPrice=Math.max(...candlestiks.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[2])));
        let priceRange = maxPrice - minPrice;
        const drawCandleFunc=(start:number, end:number)=>{
                candlestiks.forEach((candle,index)=>{
                        let color = candle[4] > candle[1]  ? greenColor : redColor;
                        const open=Number(candle[1])
                        const close=Number(candle[4])
                        let xCoords=xToPixelCoords((Number(candle[0])),candlestiks,width,candleWidth)  
                        let yCoords=yToPixelCoords(maxPrice,candle[4] > candle[1] ? close : open,priceRange,height)
                        const heightCandle = Math.abs(yToPixelCoords(maxPrice,open,priceRange,height) - yToPixelCoords(maxPrice,close,priceRange,height));
                        DrawCandle(ctx,xCoords,yCoords,candleWidth-2,heightCandle,color)
                        const xLineStart=xToPixelCoords((Number(candle[0])),candlestiks,width,candleWidth)
                        const yLineStart=yToPixelCoords(maxPrice,Number(candle[3]),priceRange,height)
                        const yLineEnd=yToPixelCoords(maxPrice,Number(candle[2]),priceRange,height)
                        DrawLine( ctx,xLineStart-1, yLineStart , xLineStart-1 , yLineEnd,candleWidth , color );
                })
        }
        // draw candle
        drawCandleFunc(0,candlestiks.length)
        if(container){
                container.scrollLeft=container.scrollWidth
        }
        //scroll
        // добавление обработчиков событий
        let isPressed=false
        let startX=0
        let deltaX = 0
        container?.addEventListener('mousedown', handleMouseDown);
        container?.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp)
        function handleMouseDown(e:MouseEvent){
                e.preventDefault();
                if(container){
                        container.style.cursor='pointer';
                }      
                console.log('mousedown')
                isPressed=true
                startX = e.clientX;
        }
        function handleMouseMove(event:MouseEvent) {
                event.preventDefault();
                if(container && isPressed){
                        deltaX = startX-event.clientX;
                        container.scrollLeft = container.scrollLeft + deltaX;
                        startX=event.clientX
                        scrollCandle=container.scrollLeft/3
                        console.log('move')
                        let lastmax=maxPrice
                        let lastmin=minPrice
                        let lastRange=priceRange
                        minPrice=Math.min(...candlestiks.slice(scrollCandle,scrollCandle+howCandleInRange).map((d)=>Number(d[3])));
                        maxPrice=Math.max(...candlestiks.slice(scrollCandle,candlestiks.length).map((d)=>Number(d[2])));
                        
                        priceRange = maxPrice - minPrice;
                        if(maxPrice!==lastmax || minPrice!==lastmin || priceRange!==lastRange ){
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                drawCandleFunc(0,candlestiks.length)
                        } 
                }
        }
        function handleMouseUp(event:MouseEvent) {
                event.preventDefault();
                startX=0
                isPressed=false
                console.log('mouseup')
                if(container){
                        container.style.cursor='crosshair'
                }
                container?.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                
        }
        document.removeEventListener('mousedown', handleMouseDown);
        
        //
        let scale = 1;

        // Обработчик события скролла колеса мыши
        // canvas2.addEventListener('wheel', (event) => {
        //         event.preventDefault(); // Отключаем стандартное поведение страницы при скролле

        //         // Изменяем значение масштабирования в зависимости от направления скролла
        //         if (event.deltaY < 0) {
        //         scale += 0.1;
        //         } else {
        //         scale -= 0.1;
        //         }

        //         // Ограничиваем масштабирование в пределах от 0.1 до 2
        //         if (scale < 0.1) {
        //         scale = 0.1;
        //         } else if (scale > 5) {
        //         scale = 5;
        //         }

        //         // Устанавливаем новое значение масштабирования контекста canvas
        //         ctx.setTransform(scale, 0, 0, scale, -30, 0);
        //         ctx.clearRect( 0 , 0 , widthCanvas , heightCanvas );
        //         drawCandleFunc(0,candlestiks.length)
        //});
        //при движении мыши
        // container?.addEventListener('mousemove',function(e){
        //         const getMousePos = ( e: MouseEvent) =>{
        //             let rect = canvas.getBoundingClientRect();
        //             return { x: e.clientX-rect.left , y: e.clientY-rect.top };
        //         }
        //         let mousePosition = getMousePos( e );
        //         mousePosition.x += candleWidth/2;
        //         b_drawMouseOverlay = true;
        //         if ( mousePosition.x < 0 ) b_drawMouseOverlay = false;
        //         if ( mousePosition.x > canvas2.width-10 ) b_drawMouseOverlay = false;
        //         if ( mousePosition.y > heightCanvas-10 || mousePosition.y<10 ) b_drawMouseOverlay = false;
        //         if(b_drawMouseOverlay){
        //                 let crosshairX = e.offsetX;
        //                 let crosshairY = e.offsetY;
        //                 // очищаем холст
        //                 ctx2.clearRect(0, 0, canvas.width, canvas.height);
        //                 // рисуем перекрестие
        //                 ctx2.beginPath();
        //                 ctx2.lineWidth=0.5
        //                 ctx2.setLineDash([4,4])
        //                 ctx2.moveTo(crosshairX, 0);
        //                 ctx2.lineTo(crosshairX, canvas.height);
        //                 ctx2.moveTo(0, crosshairY);
        //                 ctx2.lineTo(canvas.width, crosshairY);
        //                 ctx2.strokeStyle='#425382'
        //                 //Ctx2.strokeStyle='#2b2b2b'
        //                 ctx2.stroke();
                        
                        

        //                 yMouseHover = yToValueCoords(minPrice,height,marginBottom, mousePosition.y,priceRange,yPixelRange );
        //                 xMouseHover = xToValueCoords(Number(candlestiks[0][0]),Number(candlestiks[0][0])-Number(candlestiks[candlestiks.length-1][0]), mousePosition.x,xPixelRange );
        //                 let candlestickDelta = Number(candlestiks[0][0])-Number(candlestiks[candlestiks.length-1][0]);
        //                 hoveredCandlestickID = Math.floor((xMouseHover-Number(candlestiks[0][0]))/candlestickDelta);
        //                 xMouseHover = Math.floor(xMouseHover/candlestickDelta)*candlestickDelta;
        //                 mousePosition.x = xToPixelCoords((Number(candlestiks[0][0])),candlestiks.slice(scrollCandle,scrollCandle+howCandleInRange),width,candleWidth );
        //                 ctx2.font = "11px serif";
        //                 ctx2.fillStyle = "#737478";
        //                 ctx2.fillText( "O: "+candlestiks[hoveredCandlestickID][1] ,canvas2.scrollLeft+5, 10, );
        //                 ctx2.fillText( "C: "+candlestiks[hoveredCandlestickID][4] ,105,  10, );
        //                 // ctx2.fillText( "H: "+candlestiks[hoveredCandlestickID][2] ,75,  10, );
        //                 // ctx2.fillText( "L: "+candlestiks[hoveredCandlestickID][4] ,105,  10, );
                        
        //         }else{
        //                 ctx2.clearRect(0, 0, canvas.width, canvas.height);
        //         }
        // })       
}

        