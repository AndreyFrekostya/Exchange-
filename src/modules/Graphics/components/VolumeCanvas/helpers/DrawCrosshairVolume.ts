import { MutableRefObject } from "react"
import { DrawVolumeTextOneCandle } from "./DrawVolumeTextOneCandle"

export function DrawCrosshairVolume(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,data:string[][],candleWidth:number,candleSpacing:number,scrolledCandle:number,xMouse:number,q:boolean,grRef:MutableRefObject<HTMLCanvasElement | null> | undefined){
    let b_drawMouseOverlay=false
    const candlestiks=data
    const GraphicCanvas=grRef?.current
    const grCtx=GraphicCanvas?.getContext('2d')
    const redColor='#ef5350'
    const greenColor='#26a69a'
    let rect = canvas.getBoundingClientRect();
    canvas?.addEventListener('mousemove',function(e){
        const getMousePos = ( e: MouseEvent) =>{
            return { x: e.clientX-rect.left , y: e.clientY-rect.top };
        }
        q=false
        let mousePosition = getMousePos( e );
        b_drawMouseOverlay = true;
        if (mousePosition.y<1 ) b_drawMouseOverlay = false;
        if(b_drawMouseOverlay && grCtx && GraphicCanvas){
                let crosshairX = e.offsetX;
                let crosshairY = e.offsetY;
                // очищаем холст
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                grCtx.clearRect(0, 0, GraphicCanvas.width, GraphicCanvas.height);
                // рисуем перекрестие
                if(!q){
                    ctx.beginPath();
                    ctx.lineWidth=0.5
                    ctx.setLineDash([4,4])
                    ctx.moveTo(crosshairX, 0);
                    ctx.lineTo(crosshairX, canvas.height);
                    ctx.moveTo(0, crosshairY);
                    ctx.lineTo(canvas.width, crosshairY);
                    ctx.strokeStyle='#425382'
                    ctx.stroke();
                    //volume
                    grCtx.beginPath();
                    grCtx.lineWidth=0.5
                    grCtx.setLineDash([4,4])
                    grCtx.moveTo(crosshairX, 0);
                    grCtx.lineTo(crosshairX, GraphicCanvas.height);
                    grCtx.strokeStyle='#425382'
                    grCtx.stroke()
                }else{
                    ctx.beginPath();
                    ctx.lineWidth=0.5
                    ctx.setLineDash([4,4])
                    ctx.moveTo(crosshairX, 0);
                    ctx.lineTo(crosshairX, canvas.height);
                    ctx.strokeStyle='#425382'
                    ctx.stroke();
                    //volume
                    grCtx.beginPath();
                    grCtx.lineWidth=0.5
                    grCtx.setLineDash([4,4])
                    grCtx.moveTo(crosshairX, 0);
                    grCtx.lineTo(crosshairX, GraphicCanvas.height);
                    grCtx.moveTo(0, crosshairY);
                    grCtx.lineTo(GraphicCanvas.width, crosshairY);
                    grCtx.strokeStyle='#425382'
                    grCtx.stroke()
                } 
                const neededCandle=candlestiks[scrolledCandle-1+Math.round((Math.round((e.clientX-rect.left+candleWidth/2))/((candleWidth*1)+candleSpacing)))] 
                if(neededCandle){
                    let color = neededCandle[4] > neededCandle[1]  ? greenColor : redColor;
                    DrawVolumeTextOneCandle(ctx,canvas,color,neededCandle[5]) 
                    grCtx.font = "11px Verdana";
                    grCtx.fillStyle = "#aaaebf";
                    grCtx.fillText( "O: ",5,30,);
                    grCtx.fillText( "C: ",95,30,);
                    grCtx.fillText( "H: ",185,30,);
                    grCtx.fillText( "L: ",275,30,);
                    grCtx.fillStyle = color;
                    grCtx.fillText(neededCandle[1],20,30,);
                    grCtx.fillText(neededCandle[4],110,30,);
                    grCtx.fillText(neededCandle[2],200,30,);
                    grCtx.fillText(neededCandle[4],290,30,); 
                
                }
        }else{
                ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    })   
    canvas.addEventListener('mouseleave',function(){
            b_drawMouseOverlay=false
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if(grCtx && GraphicCanvas){
                grCtx.clearRect(0, 0, GraphicCanvas.width, GraphicCanvas.height);
            }
    }) 
}