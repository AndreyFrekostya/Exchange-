import { MutableRefObject } from "react"
import { DrawVolumeTextOneCandle } from "./DrawVolumeTextOneCandle"
import { DrawAllElements } from "../../MainCanvas/helpers/DrawAllElements"
import { IDrawingElements } from "../../../pages/MainPage/slices/GraphicSlice"

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
    eOffsetX:number,
    drawingElements:IDrawingElements){
    const candlestiks=data
    const GraphicCanvas=grRef?.current
    const grCtx=GraphicCanvas?.getContext('2d') as any
    const redColor='#EB602F'
    const greenColor='#37DBBA'
    let rect = canvas.getBoundingClientRect();
    q=false
    let allLeft=xLeft>=0 ? (eClientX-rect.left)-Math.abs(xLeft) : Math.abs(xLeft)+(eClientX-rect.left)
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
        //перерисовываем элементы рисования
        grCtx.setLineDash([])
        DrawAllElements(grCtx,canvas,drawingElements,x,crosshairY)
        // рисуем перекрестие
        let ranger=String(candleWidth/2).includes('.') ? 0 : 0.5
        if(!q){
            ctx.beginPath();
            ctx.lineWidth=1
            ctx.setLineDash([4,4])
            ctx.moveTo(x+ranger, 0);
            ctx.lineTo(x+ranger, canvas.height);
            ctx.moveTo(0, crosshairY);
            ctx.lineTo(canvas.width, crosshairY);
            ctx.strokeStyle='#a9b3cf'
            ctx.stroke();
            ctx.closePath()
            //volume
            grCtx.beginPath();
            grCtx.lineWidth=1
            grCtx.setLineDash([4,4])
            grCtx.moveTo(x+ranger, 0);
            grCtx.lineTo(x+ranger, GraphicCanvas.height);
            grCtx.strokeStyle='#a9b3cf'
            grCtx.stroke()
            grCtx.closePath()
            //plus
        }else{
            ctx.beginPath();
            ctx.lineWidth=1
            ctx.setLineDash([4,4])
            ctx.moveTo(x+ranger, 0);
            ctx.lineTo(x+ranger, canvas.height);
            ctx.strokeStyle='#a9b3cf'
            ctx.stroke();
            //volume
            grCtx.beginPath();
            grCtx.lineWidth=1
            grCtx.setLineDash([4,4])
            grCtx.moveTo(x+ranger, 0);
            grCtx.lineTo(x+ranger, GraphicCanvas.height);
            grCtx.moveTo(0, crosshairY);
            grCtx.lineTo(GraphicCanvas.width, crosshairY);
            grCtx.strokeStyle='#a9b3cf'
            grCtx.stroke()
        } 
        if(neededCandle){
            let color = neededCandle[4] > neededCandle[1]  ? greenColor : redColor;
            DrawVolumeTextOneCandle(ctx,canvas,color,neededCandle[5]) 
            grCtx.lineWidth=1
            grCtx.imageSmoothingEnabled = false;
            grCtx.font = "100 10.5px Helvetica ";
            grCtx.textRendering = "optimizeLegibility";
            grCtx.fontStretch =  "ultra-expanded";
            grCtx.fontKerning = "normal";
            grCtx.letterSpacing = "0.5px";
            grCtx.fillStyle = "#969ea9";
            grCtx.fillText( "O: ",5.5,30.5,);
            grCtx.fillText( "C: ",95.5,30.5,);
            grCtx.fillText( "H: ",185.5,30.5,);
            grCtx.fillText( "L: ",275.5,30.5,);
            grCtx.fillStyle = color;
            grCtx.fillText(String(parseFloat(neededCandle[1])),20.5,30.5,);
            grCtx.fillText(String(parseFloat(neededCandle[4])),110.5,30.5,);
            grCtx.fillText(String(parseFloat(neededCandle[2])),200.5,30.5,);
            grCtx.fillText(String(parseFloat(neededCandle[3])),290.5,30.5,);
        
        }
    }       
}