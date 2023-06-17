import { ICoin } from "../../../pages/MainPage/api/CoinApi"

export const sortByMarket=(market:string | null, sorted:ICoin[])=>{
        if(market==='spot'){
            const allSpot=sorted.filter(item=>item.permissions!==undefined)
            return allSpot
        }else if(market==='futures'){
            const allFutures=sorted.filter(item=>item.permissions===undefined)
            return allFutures
        }else if(market==='spot_with_f'){
            let result: ICoin[]=[]
            let map=new Map()
            for(let i=0; i<sorted.length; i++){
                let name=sorted[i].symbol
                if(map.has(name)){
                    result.push(sorted[i])
                }else{
                    map.set(name,true)
                }
            }
            const merge:ICoin[]=[]
            result.forEach((item)=>{
                let newCoin=sorted.find(item_inner=>item_inner.symbol===item.symbol && item_inner.permissions!==undefined)
                if(newCoin){
                    merge.push(newCoin)
                }
            })
            return merge
        }else{
            return sorted
        }
    }