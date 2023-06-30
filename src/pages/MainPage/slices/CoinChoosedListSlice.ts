import { createSlice } from '@reduxjs/toolkit';
import { ICoin } from '../api/CoinApi';
const initialState: ICoin[]=[]
const CoinChoosedListSlice = createSlice({
    name: 'allcoins',
    initialState,
    reducers: {
       addCoinList(state, action){
       const nameCoin=state.find(item=>item.symbol===action.payload.sym.symbol)
       if(nameCoin){
            if((action.payload.type==='futures' && nameCoin?.permissions===undefined) || (action.payload.type==='spot' && nameCoin?.permissions!==undefined)){
                return state.filter(item=>item.symbol!==nameCoin.symbol)
            }
       }else{
           state.push(action.payload.sym)
        }
       }
    },
});

export const {addCoinList} = CoinChoosedListSlice.actions;

export default CoinChoosedListSlice.reducer;