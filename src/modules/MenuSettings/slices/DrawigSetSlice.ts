import { createSlice } from '@reduxjs/toolkit';
interface IDrawingElements{
    name:string,
    isMagnit: null | boolean
}
const initialState:IDrawingElements={
    name:'nothing',
    isMagnit:null
}
const DrawingSetSlice = createSlice({
    name: 'drawing',
    initialState,
    reducers: {
        changeInstrument(state,action){
            if(action.payload.element==='magnit 1'){
                if(state.isMagnit===true){
                    state.isMagnit=false
                }else if(state.isMagnit===false){
                    state.isMagnit=null
                }else if(state.isMagnit===null){
                    state.isMagnit=true
                }
            }else{
                if(state.name==action.payload.element && state.name!=='nothing'){
                    state.name='nothing'
                }else{
                    state.name=action.payload.element
                }
            }
        } 
    },
});

export const {changeInstrument} = DrawingSetSlice.actions;

export default DrawingSetSlice.reducer;