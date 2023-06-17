import { createSlice } from '@reduxjs/toolkit';
import { ICoin } from '../api/CoinApi';
const initialState: ICoin[]=[]
const AllCoinsSlice = createSlice({
    name: 'allcoins',
    initialState,
    reducers: {
       setCoins(state, action){
        return action.payload 
       },
       addCoin(state, action){
        if(action.payload.type==='f'){
            const coin=state.find(item=>item.symbol===action.payload.symbol &&  item.permissions===undefined)
            if(coin){
                coin.isAdded=!coin.isAdded
            }
        }else{
            const coin=state.find(item=>item.symbol===action.payload.symbol &&  item.permissions!==undefined)
            if(coin){
                coin.isAdded=!coin.isAdded
            }
        }
       }
    },
});

export const {setCoins, addCoin} = AllCoinsSlice.actions;

export default AllCoinsSlice.reducer;