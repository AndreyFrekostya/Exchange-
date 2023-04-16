import { createSlice } from '@reduxjs/toolkit';
const initialState='one'
const GraphicRememberModeSlice = createSlice({
    name: 'graphic_mode_last',
    initialState,
    reducers: {
        rememberMode(state,action){
            return action.payload
        }
    },
});

export const {rememberMode} = GraphicRememberModeSlice.actions;

export default GraphicRememberModeSlice.reducer;