import { createSlice } from '@reduxjs/toolkit';
interface IModeGraphics{
    id:number,
    name:string,
    numOfGraph:number,
    choosed:boolean
}
const initialState:IModeGraphics[]=[{id:0, name: 'one',numOfGraph:1, choosed: true},
{id:1, name: 'two v',numOfGraph:2, choosed: false},
{id:2, name: 'two h',numOfGraph:2, choosed: false},
{id:3, name: 'three v',numOfGraph:3, choosed: false},
{id:4, name: 'three h',numOfGraph:3, choosed: false},
{id:5, name: 'three g',numOfGraph:3, choosed: false},
{id:6, name: 'three g 2',numOfGraph:3, choosed: false},
{id:7, name: 'three g 3',numOfGraph:3, choosed: false},
{id:8, name: 'three g 4',numOfGraph:3, choosed: false},
{id:9, name: 'four',numOfGraph:4, choosed: false},
{id:10, name: 'four v',numOfGraph:4, choosed: false},
{id:11, name: 'four h',numOfGraph:4, choosed: false},
{id:12, name: 'four g',numOfGraph:4, choosed: false},
{id:13, name: 'four g 2',numOfGraph:4, choosed: false},
{id:14, name: 'four g 3',numOfGraph:4, choosed: false},
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