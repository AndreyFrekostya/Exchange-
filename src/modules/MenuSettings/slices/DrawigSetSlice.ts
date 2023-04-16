import { createSlice } from '@reduxjs/toolkit';
const initialState='nothing'
const DrawingSetSlice = createSlice({
    name: 'drawing',
    initialState,
    reducers: {
        changeInstrument(state,action){
            return action.payload 
        } 
    },
});

export const {changeInstrument} = DrawingSetSlice.actions;

export default DrawingSetSlice.reducer;