import { createSlice } from '@reduxjs/toolkit';
type Lines=Array<{x1:number, y1:number, x2:number, y2:number}>
type GrLines=Array<{y:number}>
type GrRay=Array<{x:number, y:number}>
type Rectangles=Array<{x:number, y:number,x1:number, y1:number}>
type fixedPriceVolume=Array<{x1:number,y2:number,x:number, y:number}>
export interface IDrawingElements{
  lines:Lines,
  grLines:GrLines,
  grRay:GrRay,
  fibonacciRetracement:null,
  rectangles:Rectangles,
  pricesRanges:Rectangles,
  fixedPriceVolume:fixedPriceVolume,
  texts:null,
}
export interface IGraphic{
    id:number, 
    distance:string, 
    drawingElements:IDrawingElements,
    choosed:boolean,
    widescreen:boolean,
    priority:number,
    coin: string,
    group:number | null,
    typeCoin: string,
    priceWidth:number
}
const initialState:IGraphic[]=[
    {id:0,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: true, widescreen: false,priority:2, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:1,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:5, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:2,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:3,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:4,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:5,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:6,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:7, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:7,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:6, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:8,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:5, coin: '',group: null, typeCoin: '',priceWidth:0},
    {id:9,distance: '0', drawingElements: {lines:[],
        grLines:[],
        grRay:[],
        fibonacciRetracement:null,
        rectangles:[],
        pricesRanges:[],
        fixedPriceVolume:[],
        texts:null}, choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: '',priceWidth:0},
]
const GraphicModeSlice = createSlice({
    name: 'graphics',
    initialState,
    reducers: {
        setGraphicDistance(state, action){
            const graphic=state.find(item=>item.choosed===true)
            if(!graphic) return;
            graphic.distance=action.payload
        },
        setChoosedGraphic(state, action){
            const graphic=state.find(item=>item.id===action.payload)
            if(!graphic){
                return;
            }
            state.map(item=>{
                item.choosed=false
            })
            graphic.choosed=true
        },
        setGraphicsOnTwoMode(state){
            const fourGraphic=state.slice(6,10)
            const copyarr=fourGraphic.sort((a, b) => a.priority - b.priority);
            state[1].distance=copyarr[1].distance
            state[2].distance=copyarr[0].distance
        },
        setWideScreen(state, action){
            const graphic=state.find(item=>item.id===action.payload)
            if(!graphic){return;}
            state.map(item=>item.widescreen=false)
            graphic.widescreen=true
        },
        clearWideScreen(state){
            state.map(item=>item.widescreen=false)
        },
        setGraphicsPreset(state,action){
            return action.payload
        },
        setGraphicCoin(state, action){
            const graphic=state.find(item=>item.id===action.payload.id)
            if(!graphic){return;}
            if(graphic.group){
                state.map(item=>{
                    if(item.group===graphic.group){
                        item.coin=action.payload.coin
                        item.typeCoin=action.payload.type
                    }
                })
            }
            graphic.coin=action.payload.coin
            graphic.typeCoin=action.payload.type
        },
        setGraphicGroup(state, action){
            const graphic=state.find(item=>item.choosed===true)
            if(!graphic) return;
            const theSameGraphic=state.find(item=>item.group===action.payload)
            if(theSameGraphic){
                graphic.coin=theSameGraphic.coin
                graphic.typeCoin=theSameGraphic.typeCoin
                if(graphic.distance==='0'){
                    graphic.distance='Д'
                }
            }
            graphic.group=action.payload
        },
        unTieGraphicGroup(state){
            const graphic=state.find(item=>item.choosed===true)
            if(!graphic) return
            graphic.group=null
        },
        setGlobalCoin(state, action){
            state.map(graphic=>{
                if(graphic.distance=='0'){
                    graphic.distance='Д'
                }
                graphic.coin=action.payload.coin
                graphic.typeCoin=action.payload.type
            })
        },
        setPriceWidth(state, action){
            const neededGraph=state.find(i=>i.id=action.payload.id)
            if(!neededGraph)return
            neededGraph.priceWidth=action.payload.width
        },
        addLine(state, action){
            const graph=state.find(gr=>gr.id==action.payload.id)
            if(!graph) return
            graph.drawingElements.lines=[{x1:action.payload.x, y1:action.payload.y, x2:0, y2:0}, ...graph.drawingElements.lines]
        },
        setLine(state, action){
            const graph=state.find(gr=>gr.id==action.payload.id)
            if(!graph) return
            graph.drawingElements.lines[0].x2=action.payload.x
            graph.drawingElements.lines[0].y2=action.payload.y
        },
        addGrLine(state, action){
            const graph=state.find(gr=>gr.id==action.payload.id)
            if(!graph) return
            graph.drawingElements.grLines=[{y:action.payload.y}, ...graph.drawingElements.grLines]
        }, 
        addGrRay(state, action){
            const graph=state.find(gr=>gr.id==action.payload.id)
            if(!graph) return
            graph.drawingElements.grRay=[{x:action.payload.x, y:action.payload.y}, ...graph.drawingElements.grRay]
        },
        addRect(state, action){
            const graph=state.find(gr=>gr.id==action.payload.id)
            if(!graph) return
            graph.drawingElements.rectangles=[{x:action.payload.x,y:action.payload.y,x1:0,y1:0},...graph.drawingElements.rectangles]
        },
        setRect(state, action){
            const graph=state.find(gr=>gr.id==action.payload.id)
            if(!graph) return
            graph.drawingElements.rectangles[0].x1=action.payload.x
            graph.drawingElements.rectangles[0].y1=action.payload.y
        },
        deleteAllDrawingElements(state){
            const graph=state.find(gr=>gr.choosed===true)
            if(!graph) return
            graph.drawingElements={lines:[],
                grLines:[],
                grRay:[],
                fibonacciRetracement:null,
                rectangles:[],
                pricesRanges:[],
                fixedPriceVolume:[],
                texts:null
            }
        },
        remakeCoords(state, action){
            const graph=state.find(gr=>gr.choosed===true)
            if(!graph) return
            graph.drawingElements.lines.forEach((line)=>{
                line.x1=line.x1-action.payload.deltaX
                line.x2=line.x2-action.payload.deltaX
                line.y1=line.y1-action.payload.deltaY
                line.y2=line.y2-action.payload.deltaY             
            })
            graph.drawingElements.grLines.forEach((grLine)=>{
                grLine.y=grLine.y-action.payload.deltaY            
            })
            graph.drawingElements.grRay.forEach((grR)=>{
                grR.y=grR.y-action.payload.deltaY
                grR.x=grR.x-action.payload.deltaX            
            })
            graph.drawingElements.rectangles.forEach((rect)=>{
                rect.y=rect.y-action.payload.deltaY
                rect.x=rect.x-action.payload.deltaX   
                rect.x1=rect.x1-action.payload.deltaX   
                rect.y1=rect.y1-action.payload.deltaY            
            })
        }
    },
});

export const {
    remakeCoords,
    deleteAllDrawingElements,
    setRect,
    addRect,
    addGrRay,
    addGrLine,
    setLine,
    addLine,
    setGraphicDistance, 
    setChoosedGraphic, 
    setGraphicsOnTwoMode,
    setWideScreen,
    clearWideScreen, 
    setGraphicsPreset, 
    setGraphicCoin, 
    setGraphicGroup, 
    unTieGraphicGroup, 
    setGlobalCoin,
    setPriceWidth
} = GraphicModeSlice.actions;

export default GraphicModeSlice.reducer;
