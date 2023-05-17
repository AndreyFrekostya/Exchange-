import { createSlice } from '@reduxjs/toolkit';
import { type } from 'os';
interface IChoosedCoin{
    coin: string,
    type:string
}
const initialState: IChoosedCoin={coin: '', type: ''}
const CoinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        changeCoin(state,action){
            state.coin=action.payload.coin
            state.type=action.payload.type
        } 
    },
});

export const {changeCoin} = CoinSlice.actions;

export default CoinSlice.reducer;