import { getTransformedNumber } from "./getTransformedNumber"

export function getTransformedNumberWithFloat(n:number,cb?:(arg:number)=>number){
    let stringN=String(n)
    if(stringN.includes('e')){
        let slicedBy=stringN[stringN.length-1]
        stringN=n.toFixed(Number(slicedBy)+2)
    }
    let slicedNumber=''
    let nulledSymols=''
    for(let i=0;i<stringN.length;i++){
        if(stringN[i]!=='0' && stringN[i]!=='.'){
            slicedNumber=stringN.slice(i,stringN.length)
            break
        }else{
            nulledSymols=nulledSymols+stringN[i]
        }
    }
    
    let rounded=getTransformedNumber(Math.round(Number(slicedNumber)),1,cb)
    return nulledSymols+rounded
}