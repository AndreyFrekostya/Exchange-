import { RefObject } from "react";

export function CrossHairCanvasStart(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,data: string[][], width:number, height:number, graphicRef:RefObject<HTMLDivElement>){
    const candlestiks=data
    const candleWidth=3
    const container =graphicRef.current
    let b_drawMouseOverlay
    let yMouseHover
    let xMouseHover
    let hoveredCandlestickID
    container?.addEventListener('mousemove',function(e){
                const getMousePos = ( e: MouseEvent) =>{
                    let rect = canvas.getBoundingClientRect();
                    return { x: e.clientX-rect.left , y: e.clientY-rect.top };
                }
                let mousePosition = getMousePos( e );
                mousePosition.x += candleWidth/2;
                b_drawMouseOverlay = true;
                if ( mousePosition.x < 0 ) b_drawMouseOverlay = false;
                if ( mousePosition.x > width-10 ) b_drawMouseOverlay = false;
                if ( mousePosition.y > height-10 || mousePosition.y<10 ) b_drawMouseOverlay = false;
                if(b_drawMouseOverlay){
                        let crosshairX = e.offsetX;
                        let crosshairY = e.offsetY;
                        console.log(crosshairY)
                        // очищаем холст
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // рисуем перекрестие
                        ctx.beginPath();
                        ctx.lineWidth=0.5
                        ctx.setLineDash([4,4])
                        ctx.moveTo(crosshairX, 0);
                        ctx.lineTo(crosshairX, canvas.height);
                        ctx.moveTo(0, crosshairY);
                        ctx.lineTo(canvas.width, crosshairY);
                        ctx.strokeStyle='#425382'
                        ctx.stroke();
                        
                        

                        // yMouseHover = yToValueCoords(minPrice,height,marginBottom, mousePosition.y,priceRange,yPixelRange );
                        // xMouseHover = xToValueCoords(Number(candlestiks[0][0]),Number(candlestiks[0][0])-Number(candlestiks[candlestiks.length-1][0]), mousePosition.x,xPixelRange );
                        // let candlestickDelta = Number(candlestiks[0][0])-Number(candlestiks[candlestiks.length-1][0]);
                        // hoveredCandlestickID = Math.floor((xMouseHover-Number(candlestiks[0][0]))/candlestickDelta);
                        // xMouseHover = Math.floor(xMouseHover/candlestickDelta)*candlestickDelta;
                        // mousePosition.x = xToPixelCoords((Number(candlestiks[0][0])),candlestiks.slice(scrollCandle,scrollCandle+howCandleInRange),width,candleWidth );
                        // ctx.font = "11px serif";
                        // ctx.fillStyle = "#737478";
                        // ctx.fillText( "O: "+candlestiks[hoveredCandlestickID][1] ,canvas.scrollLeft+5, 10, );
                        // ctx.fillText( "C: "+candlestiks[hoveredCandlestickID][4] ,105,  10, );
                        // ctx2.fillText( "H: "+candlestiks[hoveredCandlestickID][2] ,75,  10, );
                        // ctx2.fillText( "L: "+candlestiks[hoveredCandlestickID][4] ,105,  10, );
                        
                }else{
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
        })    
}