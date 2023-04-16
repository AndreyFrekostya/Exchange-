import { createSlice } from '@reduxjs/toolkit';
export interface IGraphic{
    id: number,
    distance: string,
    drawingElemets: [], 
    choosed: boolean,
    widescreen: boolean
}
// const initialState=[{id:0, distance: '5m', drawingElemets: []}]
// const initialState=[{id:0, distance:'1h', drawingElemets:[], choosed: false, widescreen: false},
// {id:1, distance:'5m', drawingElemets:[], choosed: false, widescreen: false},]
//const initialState:IGraphic[]=[{id:0,distance: '1d', drawingElemets: [], choosed: true, widescreen: false}, 
// {id:1, distance:'4h', drawingElemets:[], choosed: false, widescreen: false},
// {id:2, distance:'1h', drawingElemets:[], choosed: false, widescreen: false},
// {id:3, distance:'5m', drawingElemets:[], choosed: false, widescreen: false},
// ]
const initialState:IGraphic[]=[{id:0,distance: '1d', drawingElemets: [], choosed: true, widescreen: false}, 
    {id:1, distance:'4h', drawingElemets:[], choosed: false, widescreen: false},
    {id:2, distance:'1h', drawingElemets:[], choosed: false, widescreen: false},
    {id:3, distance:'5m', drawingElemets:[], choosed: false, widescreen: false},
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
            const graphic=state.find(item=>item.id===action.payload.id)
            if(!graphic){
                return;
            }
            state.map(item=>{
                item.choosed=false
            })
            graphic.choosed=true
        },
        clearChoosed(state){
            state.map(item=>{item.choosed=false})
            state[0].choosed=true
        },
        setGraphicsOnTwoMode(state){
            const copyArr=state.slice(0)
            copyArr.sort((a, b) => a.distance > b.distance ? 1 : -1); 
        },
        setWideScreen(state, action){
            const graphic =state.find(item=>item.id===action.payload)
            if(!graphic){return;}
            state.map(item=>{item.widescreen=false})
            graphic.widescreen=true
        },
        clearWideScreen(state){
            state.map(item=>item.widescreen=false)
        }
    },
});

export const {setGraphicDistance, setChoosedGraphic,clearChoosed, setGraphicsOnTwoMode,setWideScreen,clearWideScreen} = GraphicModeSlice.actions;

export default GraphicModeSlice.reducer;
