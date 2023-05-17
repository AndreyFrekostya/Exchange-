import { ICoin } from "../../../pages/MainPage/api/CoinApi";

export function sortByNameAndInt(field: string, reverse: boolean | null | string, primer: undefined | ((arg:any )=>any)){
    if(reverse!==null){
        const key = primer ?
        function(x:any) {
          return primer(x[field])
        } :
        function(x:any) {
          return x[field]
        };
    
        const reverseNum:number = !reverse ? 1 : -1;
      
        return function(a:ICoin, b:ICoin) {
          return a = key(a), b = key(b), reverseNum * (Number((a > b)) - Number((b > a)));
        }
      }
}