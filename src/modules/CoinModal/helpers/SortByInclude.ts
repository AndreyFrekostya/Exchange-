import { useAppSelector } from "../../../hooks/redux-hooks";
import { ICoin } from "../../../pages/MainPage/api/CoinApi";
export function sortByInclude(text:string, sortedArray:ICoin[]):ICoin[]{
    if(text==''){return sortedArray;}
    const copyarr: ICoin[]=[]
    sortedArray?.forEach((symbol)=>{
        if(symbol.symbol.includes(text.toUpperCase())){
            copyarr.push(symbol)
        }
    })
    return copyarr
}