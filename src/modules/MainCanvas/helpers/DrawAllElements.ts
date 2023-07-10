import { IDrawingElements } from "../../../pages/MainPage/slices/GraphicSlice"
import { DrawDot } from "./DrawDot"
import { DrawGrLine } from "./DrawGrLine"
import { DrawGrLuch } from "./DrawGrLuch"
import { DrawLineBetweenTwoDot } from "./DrawLineBeetwenTwoDot"
import { DrawRectangle } from "./DrawRectangle"

export function DrawAllElements(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,drawingElements:IDrawingElements,x:number, crosshairY:number){
    ctx.setLineDash([])
    if(drawingElements.lines.length!==0){
        drawingElements.lines.forEach((line)=>{
            let higherX=line.x1>line.x2 ? line.x1 : line.x2
            let lowerX=line.x1>line.x2 ? line.x2 : line.x1
            let ifInScreen=higherX<canvas.clientWidth && lowerX>0 ? true : false
            let ifInRightPartScreen=higherX>canvas.clientWidth && lowerX<canvas.clientWidth ? true : false
            let ifInLeftPartScreen=higherX>0 && lowerX<0 ? true : false
            if(ifInScreen || ifInRightPartScreen  || ifInLeftPartScreen){
                if(line.x1!==0 && line.x2==0){
                    DrawLineBetweenTwoDot(ctx, line.x1,line.y1,x,crosshairY)
                }
                if(line.x2!==0 && line.x1!==0){
                    DrawLineBetweenTwoDot(ctx, line.x1,line.y1,line.x2,line.y2)
                }
                if(line.x1!==0){
                    DrawDot(ctx, line.x1, line.y1)
                }
                if(line.x2!==0){
                    DrawDot(ctx, line.x2, line.y2)
                }
            }
        })
    }
    if(drawingElements.grLines.length!==0){
        let xDot=canvas.clientWidth/2
        drawingElements.grLines.forEach((grLine)=>{
            if(grLine.y>0 && grLine.y<canvas.clientHeight){
                DrawGrLine(ctx, grLine.y, 0, canvas.clientWidth*2,xDot)
            }
        })
    }
    if(drawingElements.grRay.length!==0){
        drawingElements.grRay.forEach((grRay)=>{
            if(grRay.x<canvas.clientWidth && grRay.y>0 && grRay.y<canvas.clientHeight){
                DrawGrLuch(ctx, grRay.x, grRay.y,canvas.clientWidth*2)
            }
        })
    }
    if(drawingElements.rectangles.length!==0){
        drawingElements.rectangles.forEach((rect)=>{
            if(rect.x!==0 && rect.x1==0){
                DrawRectangle(ctx, rect.x,rect.y,x,crosshairY)
            }else if(rect.x!==0 && rect.x1!==0){
                let higherX=rect.x>rect.x1 ? rect.x : rect.x1
                let lowerX=rect.x>rect.x1 ? rect.x1 : rect.x
                if(higherX>canvas.clientWidth && lowerX<canvas.clientWidth || lowerX<0 && higherX>0 || higherX<canvas.clientWidth && lowerX>0){
                    DrawRectangle(ctx, rect.x,rect.y,rect.x1,rect.y1)
                }
            }
        })
    }
}