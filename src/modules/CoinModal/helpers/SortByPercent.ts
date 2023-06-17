import { ICoin } from "../../../pages/MainPage/api/CoinApi";

export const sortByPercent=(value:number, sorted:ICoin[])=>{
    if(value===0){
        return sorted
    }else{
        return sorted.filter(item=>item.priceChangePercent>=value)
    }
}