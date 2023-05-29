import { MutableRefObject } from "react"
import { DrawVolumeTextOneCandle } from "../components/VolumeCanvas/helpers/DrawVolumeTextOneCandle"

export function DrawCrosshairCanvas(ctx2:CanvasRenderingContext2D,canvas2:HTMLCanvasElement, data: string[][], candleWidth:number, candleSpacing:number,scrolledCandle:number,xMouse:number,q:boolean, voRef:MutableRefObject<HTMLCanvasElement | null> | undefined){
    const candlestiks=data
    const redColor='#ef5350'
    const greenColor='#26a69a'
    let b_drawMouseOverlay=false
    const volumeCanvas=voRef?.current
    const ctxV=volumeCanvas?.getContext('2d')
    let rect = canvas2.getBoundingClientRect();
    canvas2?.addEventListener('mousemove',function(e){
        const getMousePos = ( e: MouseEvent) =>{
            return { x: e.clientX-rect.left , y: e.clientY-rect.top };
        }
        q=true
        let mousePosition = getMousePos( e );
        mousePosition.x += candleWidth/2;
        b_drawMouseOverlay = true;
        if (mousePosition.y<1 ) b_drawMouseOverlay = false;
        if(b_drawMouseOverlay && ctxV && volumeCanvas){
                let crosshairX = e.offsetX;
                let crosshairY = e.offsetY;
                // очищаем холст
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctxV.clearRect(0, 0, volumeCanvas.width, volumeCanvas.height);
                // рисуем перекрестие
                if(q){
                    ctx2.beginPath();
                    ctx2.lineWidth=0.5
                    ctx2.setLineDash([4,4])
                    ctx2.moveTo(crosshairX, 0);
                    ctx2.lineTo(crosshairX, canvas2.height);
                    ctx2.moveTo(0, crosshairY);
                    ctx2.lineTo(canvas2.width, crosshairY);
                    ctx2.strokeStyle='#425382'
                    ctx2.stroke();
                    //volume
                    ctxV.beginPath();
                    ctxV.lineWidth=0.5
                    ctxV.setLineDash([4,4])
                    ctxV.moveTo(crosshairX, 0);
                    ctxV.lineTo(crosshairX, volumeCanvas.height);
                    ctxV.strokeStyle='#425382'
                    ctxV.stroke()
                }else{
                    ctx2.beginPath();
                    ctx2.lineWidth=0.5
                    ctx2.setLineDash([4,4])
                    ctx2.moveTo(crosshairX, 0);
                    ctx2.lineTo(crosshairX, canvas2.height);
                    ctx2.strokeStyle='#425382'
                    ctx2.stroke();
                    //volume
                    ctxV.beginPath();
                    ctxV.lineWidth=0.5
                    ctxV.setLineDash([4,4])
                    ctxV.moveTo(crosshairX, 0);
                    ctxV.lineTo(crosshairX, volumeCanvas.height);
                    ctxV.moveTo(0, crosshairY);
                    ctxV.lineTo(volumeCanvas.width, crosshairY);
                    ctxV.strokeStyle='#425382'
                    ctxV.stroke()
                }
                //formula of calculating candle!!!
                const neededCandle=candlestiks[scrolledCandle-1+Math.round((Math.round((e.clientX-rect.left+candleWidth/2))/((candleWidth*1)+candleSpacing)))]
                if(neededCandle){
                        let color = neededCandle[4] > neededCandle[1]  ? greenColor : redColor;
                        ctx2.font = "11px Verdana";
                        ctx2.fillStyle = "#aaaebf";
                        ctx2.fillText( "O: ",5,30,);
                        ctx2.fillText( "C: ",95,30,);
                        ctx2.fillText( "H: ",185,30,);
                        ctx2.fillText( "L: ",275,30,);
                        ctx2.fillStyle = color;
                        ctx2.fillText(neededCandle[1],20,30,);
                        ctx2.fillText(neededCandle[4],110,30,);
                        ctx2.fillText(neededCandle[2],200,30,);
                        ctx2.fillText(neededCandle[4],290,30,);
                        DrawVolumeTextOneCandle(ctxV,volumeCanvas,color,neededCandle[5]) 
                }  
        }else{
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        }
    })   
    canvas2.addEventListener('mouseleave',function(){
            b_drawMouseOverlay=false
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            if(ctxV && volumeCanvas){
                ctxV.clearRect(0, 0, volumeCanvas.width, volumeCanvas.height);
            }
    })    
}