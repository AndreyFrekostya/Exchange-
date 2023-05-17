import { createSlice } from '@reduxjs/toolkit';
import { ICoin } from '../api/CoinApi';
const initialState: ICoin[]=[]
const AllCoinsInListSlice = createSlice({
    name: 'allcoinsinlist',
    initialState,
    reducers: {
       setCoinsInList(state, action){
        return action.payload 
       }
    },
});

export const {setCoinsInList} = AllCoinsInListSlice.actions;

export default AllCoinsInListSlice.reducer;