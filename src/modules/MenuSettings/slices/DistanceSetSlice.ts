import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../../../hooks/redux-hooks';
const initialState='5m'
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