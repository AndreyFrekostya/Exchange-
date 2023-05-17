import { createContext, useContext } from "react";
interface MyContext{
    filterByAtoZ:boolean | null | string,
    filterByMarket:string | null
    filterByChangePercent:number,
    filterByBaseV:boolean | null,
    filterByV: number | null,
    filterByPercentFromHtoL:boolean | null,
    filterByVFromHtoL:boolean | null,
    setFilterByAtoZ:(arg:boolean | null | string)=>void
    setFilterByMarket:(arg:string | null)=>void
    setFilterByChangePercent:(arg:number)=>void
    setFilterByBaseV:(arg:boolean | null)=>void
    setFilterByV:(arg:number | null)=>void
    setFilterByPercentFromHtoL:(arg: boolean | null)=>void
    setFilterByVFromHtoL:(arg: boolean | null)=>void
}
export const ContextFilter=createContext<MyContext>({
    filterByAtoZ:false,
    filterByMarket:null,
    filterByChangePercent:0,
    filterByBaseV:null,
    filterByV:0,
    filterByPercentFromHtoL:null,
    filterByVFromHtoL:null,
    setFilterByAtoZ:()=>{},
    setFilterByMarket:()=>{},
    setFilterByChangePercent:()=>{},
    setFilterByBaseV:()=>{},
    setFilterByV:()=>{},
    setFilterByPercentFromHtoL:()=>{},
    setFilterByVFromHtoL:()=>{},
})
export const useContextFilter=()=>useContext(ContextFilter)