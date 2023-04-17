import { createSlice } from '@reduxjs/toolkit';
interface IModeGraphics{
    id:number,
    name:string,
    numOfGraph:number,
    choosed:boolean
}
const initialState:IModeGraphics[]=[{id:0, name: 'one',numOfGraph:1, choosed: true},
{id:1, name: 'two',numOfGraph:2, choosed: false},
{id:2, name: 'four',numOfGraph:4, choosed: false},
]
const GraphicModeSlice = createSlice({
    name: 'graphic_mode',
    initialState,
    reducers: {
        changeGraphicMode(state, action){
            const mode=state.find(item=>item.name===action.payload) //name
            if (!mode) return;
            state.map(item=>{item.choosed=false})
            mode.choosed=true
        },
        setNewModePreset(state,action){

        }
    },
});

export const {changeGraphicMode,setNewModePreset} = GraphicModeSlice.actions;

export default GraphicModeSlice.reducer;