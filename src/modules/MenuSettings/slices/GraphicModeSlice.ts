import { createSlice } from '@reduxjs/toolkit';
const initialState='one'
const GraphicModeSlice = createSlice({
    name: 'graphic_mode',
    initialState,
    reducers: {
        changeGraphicMode:(_, action)=>action.payload
    },
});

export const {changeGraphicMode} = GraphicModeSlice.actions;

export default GraphicModeSlice.reducer;