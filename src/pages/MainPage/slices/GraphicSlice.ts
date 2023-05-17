import { createSlice } from '@reduxjs/toolkit';
export interface IGraphic{
    id:number, 
    distance:string, 
    drawingElemets:[],
    choosed:boolean,
    widescreen:boolean,
    priority:number,
    coin: string,
    group:number | null,
    typeCoin: string
}
const initialState:IGraphic[]=[
    {id:0,distance: '0', drawingElemets: [], choosed: true, widescreen: false,priority:2, coin: '',group: null, typeCoin: ''},
    {id:1,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:5, coin: '',group: null, typeCoin: ''},
    {id:2,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: ''},
    {id:3,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: ''},
    {id:4,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: ''},
    {id:5,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: ''},
    {id:6,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:7, coin: '',group: null, typeCoin: ''},
    {id:7,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:6, coin: '',group: null, typeCoin: ''},
    {id:8,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:5, coin: '',group: null, typeCoin: ''},
    {id:9,distance: '0', drawingElemets: [], choosed: false, widescreen: false,priority:2, coin: '',group: null, typeCoin: ''},
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
        }
    },
});

export const {setGraphicDistance, setChoosedGraphic, setGraphicsOnTwoMode,setWideScreen,clearWideScreen, setGraphicsPreset, setGraphicCoin, setGraphicGroup, unTieGraphicGroup, setGlobalCoin} = GraphicModeSlice.actions;

export default GraphicModeSlice.reducer;
