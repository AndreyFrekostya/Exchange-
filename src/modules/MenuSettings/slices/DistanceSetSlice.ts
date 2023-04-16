import { createSlice } from '@reduxjs/toolkit';
const initialState='1d'
const DistanceSetSlice = createSlice({
    name: 'distance',
    initialState,
    reducers: {
        changeDistance(state,action){
            return action.payload 
        } 
    },
});

export const {changeDistance} = DistanceSetSlice.actions;

export default DistanceSetSlice.reducer;