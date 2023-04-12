import { createSlice } from '@reduxjs/toolkit';
export interface IGraphic{
    id: number,
    distance: string,
    drawingElemets: [], 
    choosed: boolean
}
const initialState:IGraphic[]=[{id:0,distance: '5m', drawingElemets: [], choosed: true}, 
    {id:1, distance:'1h', drawingElemets:[], choosed: false},
    {id:2, distance:'4h', drawingElemets:[], choosed: false},
    {id:3, distance:'1d', drawingElemets:[], choosed: false},
]
const GraphicModeSlice = createSlice({
    name: 'graphics',
    initialState,
    reducers: {
        setGraphicDistance(state, action){
            const graphic=state.find(item=>item.choosed==true)
            if(!graphic) return;
            graphic.distance=action.payload
        },
        setChoosedGraphic(state, action){
            const graphic=state.find(item=>item.id==action.payload.id)
            if(!graphic){
                return;
            }
            state.map(item=>{
                item.choosed=false
            })
            graphic.choosed=true
        },
        clearChoosed(state){
            state.map(item=>item.choosed=false)
            state[0].choosed=true
        }
    },
});

export const {setGraphicDistance, setChoosedGraphic,clearChoosed} = GraphicModeSlice.actions;

export default GraphicModeSlice.reducer;
