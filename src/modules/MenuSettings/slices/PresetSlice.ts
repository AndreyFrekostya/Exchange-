import { createSlice } from '@reduxjs/toolkit';
interface IPreset{
    id: number,
    name: string
}
const initialState: IPreset[]=[{id:1,name: 'coin 1'},{id:2, name:'coin 2'}]
const PresetSlice = createSlice({
    name: 'preset',
    initialState,
    reducers: {
        addPreset(state, action){
            state.push({id: state[-1].id+1, name: `coin ${state[-1].id+1}`})
        }
    },
});

export const {addPreset} = PresetSlice.actions;

export default PresetSlice.reducer;