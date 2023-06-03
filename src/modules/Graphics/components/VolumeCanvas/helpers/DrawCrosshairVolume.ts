import { MutableRefObject } from "react"
import { DrawVolumeTextOneCandle } from "./DrawVolumeTextOneCandle"

export function DrawCrosshairVolume(
    ctx:CanvasRenderingContext2D,
    canvas:HTMLCanvasElement,
    data:string[][],
    candleWidth:number,
    candleSpacing:number,
    scrolledCandle:number,
    xMouse:number,
    q:boolean,
    grRef:MutableRefObject<HTMLCanvasElement | null> | undefined,
    eClientX:number,
    eOffsetY:number,
    xLeft:number,
    eOffsetX:number){
    let b_drawMouseOverlay=false
    const candlestiks=data
    const GraphicCanvas=grRef?.current
    const grCtx=GraphicCanvas?.getContext('2d')
    const redColor='#ef5350'
    const greenColor='#26a69a'
    let rect = canvas.getBoundingClientRect();
    q=false
    let allLeft=Math.abs(xLeft)+(eClientX-rect.left)
    let neededCandle=candlestiks[Math.floor(allLeft/(candleWidth+candleSpacing))]
    let x=(candlestiks.indexOf(neededCandle)-scrolledCandle)*(candleWidth+candleSpacing)+candleWidth/2
    if(!neededCandle){
        x=eOffsetX
    }
    if( grCtx && GraphicCanvas){
        let crosshairY = eOffsetY+0.5;
        // очищаем холст
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        grCtx.clearRect(0, 0, GraphicCanvas.width, GraphicCanvas.height);
        // рисуем перекрестие
        if(!q){
            ctx.beginPath();
            ctx.lineWidth=0.5
            ctx.setLineDash([4,4])
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.moveTo(0, crosshairY);
            ctx.lineTo(canvas.width, crosshairY);
            ctx.strokeStyle='#a9b3cf'
            ctx.stroke();
            //volume
            grCtx.beginPath();
            grCtx.lineWidth=0.5
            grCtx.setLineDash([4,4])
            grCtx.moveTo(x, 0);
            grCtx.lineTo(x, GraphicCanvas.height);
            grCtx.strokeStyle='#a9b3cf'
            grCtx.stroke()
        }else{
            ctx.beginPath();
            ctx.lineWidth=0.5
            ctx.setLineDash([4,4])
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.strokeStyle='#a9b3cf'
            ctx.stroke();
            //volume
            grCtx.beginPath();
            grCtx.lineWidth=0.5
            grCtx.setLineDash([4,4])
            grCtx.moveTo(x, 0);
            grCtx.lineTo(x, GraphicCanvas.height);
            grCtx.moveTo(0, crosshairY);
            grCtx.lineTo(GraphicCanvas.width, crosshairY);
            grCtx.strokeStyle='#a9b3cf'
            grCtx.stroke()
        } 
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
            grCtx.fillText(String((neededCandle[1]).slice(0,7)),20,30,);
            grCtx.fillText(String((neededCandle[4]).slice(0,7)),110,30,);
            grCtx.fillText(String((neededCandle[2]).slice(0,7)),200,30,);
            grCtx.fillText(String((neededCandle[3]).slice(0,7)),290,30,);
        
        }
    }       
    canvas.addEventListener('mouseleave',function(){
            b_drawMouseOverlay=false
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if(grCtx && GraphicCanvas){
                grCtx.clearRect(0, 0, GraphicCanvas.width, GraphicCanvas.height);
            }
    }) 
}