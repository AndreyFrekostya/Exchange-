import { createSlice } from '@reduxjs/toolkit';
interface IModeGraphics{
    id:number,
    name:string,
    numOfGraph:number,
    choosed:boolean
}
const initialState:IModeGraphics[]=[{id:0, name: 'one',numOfGraph:1, choosed: true},
{id:1, name: 'two_vertical',numOfGraph:2, choosed: false},
{id:1, name: 'two_horizontal',numOfGraph:2, choosed: false},
{id:2, name: 'four',numOfGraph:4, choosed: false},
]
const GraphicModeSlice = createSlice({
    name: 'graphic_mode',
    initialState,
    reducers: {
        changeGraphicMode(state, action){
            const mode=state.find(item=>item.name==action.payload)
            if (!mode) return;
            state.map(item=>{item.choosed=false})
            mode.choosed=true
        }
    },
});

export const {changeGraphicMode} = GraphicModeSlice.actions;

export default GraphicModeSlice.reducer;