import { MutableRefObject } from "react"
import { DrawVolumeTextOneCandle } from "../components/VolumeCanvas/helpers/DrawVolumeTextOneCandle"
import { DrawPlus } from "./DrawPlus"

export function DrawCrosshairCanvas(
    ctx2:any,
    canvas2:HTMLCanvasElement, 
    data: string[][], 
    candleWidth:number, 
    candleSpacing:number,
    scrolledCandle:number,
    q:boolean, 
    voRef:MutableRefObject<HTMLCanvasElement | null> | undefined, 
    isPressed:boolean, 
    eClientX:number,
    eOffsetY:number,
    xLeft:number,
    eOffsetX:number,
    xZoom?:number |undefined,
    pressedCandle?:string[],
    ){
    const candlestiks=data
    const redColor='#EB602F'
    const greenColor='#37DBBA'
    const volumeCanvas=voRef?.current
    const ctxV=volumeCanvas?.getContext('2d')
    let rect = canvas2.getBoundingClientRect();
    q=true
    if(ctxV && volumeCanvas){
        let crosshairY = eOffsetY+0.5;
        // очищаем холст
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctxV.clearRect(0, 0, volumeCanvas.width, volumeCanvas.height);
        //formula of calculating candle
        let allLeft=Math.abs(xLeft)+(eClientX-rect.left)
        let neededCandle=candlestiks[Math.floor(allLeft/(candleWidth+candleSpacing))]
        let x=(candlestiks.indexOf(neededCandle)-scrolledCandle)*(candleWidth+candleSpacing)+candleWidth/2
        
        if(!neededCandle){
            x=eOffsetX
        }
        if(xZoom){
            x=xZoom
        }
        if(pressedCandle && isPressed){
            x=(candlestiks.indexOf(pressedCandle)-scrolledCandle)*(candleWidth+candleSpacing)+candleWidth/2
            neededCandle=pressedCandle
        }
        let ranger=String(candleWidth/2).includes('.') ? 0 : 0.5
        // рисуем перекрестие
        if(q){
            ctx2.imageSmoothingEnabled = false
            ctx2.beginPath();
            ctx2.lineWidth=1
            ctx2.setLineDash([4,4])
            ctx2.moveTo(x+ranger, 0);
            ctx2.lineTo(x+ranger, canvas2.height);
            ctx2.moveTo(0, crosshairY);
            ctx2.lineTo(canvas2.width-20, crosshairY);
            ctx2.strokeStyle='#a9b3cf'
            ctx2.stroke();
            ctx2.closePath();
            //volume
            ctxV.beginPath();
            ctxV.lineWidth=1
            ctxV.setLineDash([4,4])
            ctxV.moveTo(x+ranger-0.2, 0);
            ctxV.lineTo(x+ranger-0.2, volumeCanvas.height);
            ctxV.strokeStyle='#a9b3cf'
            ctxV.closePath();
            ctxV.stroke()
            //plus object
            DrawPlus(ctx2,canvas2,crosshairY-0.5)
        }else{
            ctx2.beginPath();
            ctx2.lineWidth=1
            ctx2.setLineDash([4,4])
            ctx2.moveTo(x+ranger, 0);
            ctx2.lineTo(x+ranger, canvas2.height);
            ctx2.strokeStyle='#a9b3cf'
            ctx2.closePath();
            ctx2.stroke();
            //volume
            ctxV.beginPath();
            ctxV.lineWidth=1
            ctxV.setLineDash([4,4])
            ctxV.moveTo(x+ranger-0.2, 0);
            ctxV.lineTo(x+ranger-0.2, volumeCanvas.height);
            ctxV.moveTo(0, crosshairY);
            ctxV.lineTo(volumeCanvas.width, crosshairY);
            ctxV.strokeStyle='#a9b3cf'
            ctxV.closePath();
            ctxV.stroke()
        }
        if(neededCandle){
                let color = neededCandle[4] > neededCandle[1]  ? greenColor : redColor;
                ctx2.lineWidth=1
                ctx2.imageSmoothingEnabled = false;
                ctx2.font = "100 10.5px Helvetica ";
                ctx2.textRendering = "optimizeLegibility";
                ctx2.fontStretch =  "ultra-expanded";
                ctx2.fontKerning = "normal";
                ctx2.letterSpacing = "0.5px";
                ctx2.fillStyle = "#969ea9";
                ctx2.fillText( "O: ",5.5,30.5,);
                ctx2.fillText( "C: ",95.5,30.5,);
                ctx2.fillText( "H: ",185.5,30.5,);
                ctx2.fillText( "L: ",275.5,30.5,);
                ctx2.fillStyle = color;
                ctx2.fillText(String(parseFloat(neededCandle[1])),20.5,30.5,);
                ctx2.fillText(String(parseFloat(neededCandle[4])),110.5,30.5,);
                ctx2.fillText(String(parseFloat(neededCandle[2])),200.5,30.5,);
                ctx2.fillText(String(parseFloat(neededCandle[3])),290.5,30.5,);
                DrawVolumeTextOneCandle(ctxV,volumeCanvas,color,neededCandle[5]) 
        }
    }  
}