import { createSlice } from '@reduxjs/toolkit';
import { CheckPriority } from '../helpers/CheckPriority';
export interface IGraphic{
    id:number, distance:string, drawingElemets:[],choosed:boolean,widescreen:boolean,priority:number
}
//1m=1 5m=2 15m=3 30m=4 1h=5 4h=6 1d=7
const initialState:IGraphic[]=[
    {id:0,distance: '5m', drawingElemets: [], choosed: true, widescreen: false,priority:2},
    {id:1,distance: '1h', drawingElemets: [], choosed: false, widescreen: false,priority:5},
    {id:2,distance: '5m', drawingElemets: [], choosed: false, widescreen: false,priority:2},
    {id:3,distance: '1d', drawingElemets: [], choosed: false, widescreen: false,priority:7},
    {id:4,distance: '4h', drawingElemets: [], choosed: false, widescreen: false,priority:6},
    {id:5,distance: '1h', drawingElemets: [], choosed: false, widescreen: false,priority:5},
    {id:6,distance: '5m', drawingElemets: [], choosed: false, widescreen: false,priority:2},
]
const GraphicModeSlice = createSlice({
    name: 'graphics',
    initialState,
    reducers: {
        setGraphicDistance(state, action){
            const graphic=state.find(item=>item.choosed===true)
            if(!graphic) return;
            const prior=CheckPriority(action.payload)
            graphic.priority=prior
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
            const fourGraphic=state.slice(3,7)
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
        }
    },
});

export const {setGraphicDistance, setChoosedGraphic, setGraphicsOnTwoMode,setWideScreen,clearWideScreen, setGraphicsPreset} = GraphicModeSlice.actions;

export default GraphicModeSlice.reducer;
