import { ICoin } from "../../../pages/MainPage/api/CoinApi";

export const sortByVolume=(value:number |null, sorted:ICoin[])=>{
    if(value==null){
        
    }else{
        return sorted.filter(item=>item.volume>value)
    }
}