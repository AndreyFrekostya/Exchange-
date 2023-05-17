import { createSlice } from '@reduxjs/toolkit';
import { IGraphic } from '../../../pages/MainPage/slices/GraphicSlice';
interface IPreset{
    id: number,
    name: string,
    settings: IGraphic[],
    mode: string,
    coin:string
}
const initialState: IPreset[]=[]
const PresetSlice = createSlice({
    name: 'preset',
    initialState,
    reducers: {
        addPreset(state, action){
            if(state.length===0){
                state.unshift({id: 1, name: action.payload.name, settings: action.payload.settings, mode: action.payload.mode,coin:action.payload.coin})
            }else{
                state.unshift({id: state[0].id+1, name: action.payload.name,settings: action.payload.settings, mode: action.payload.mode,coin:action.payload.coin})
            }
        },
        deletePreset(state,action){
            return state.filter(item=>item.id!==action.payload)
        }
    },
});

export const {addPreset, deletePreset} = PresetSlice.actions;

export default PresetSlice.reducer;