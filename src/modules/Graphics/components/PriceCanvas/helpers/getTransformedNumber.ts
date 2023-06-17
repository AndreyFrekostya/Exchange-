export function getTransformedNumber(n:number, ranger2?:number, cb?:(arg:number)=>number){
    function goThroughNumber(n:number,range:number){
        let nString=String(n)
        let divider=''
        let rangefromUndefined=ranger2 ? 1 : 0
        for(let i=0; i<nString.length-range+rangefromUndefined;i++){
            if(n>100){
                if(i===0){
                    divider=divider+'1'
                }else{
                    divider=divider+'0'
                }
            }else if(n>=10){
                divider='10'
            }else{
                divider='1'
            }
        }
        if(cb){
            return cb(n/Number(divider))*Number(divider)
        }else{
            return Math.round(n/Number(divider))*Number(divider)
        }
    }
    let rounded=goThroughNumber(n,1)
    if(rounded%25!==0 && String(rounded).length>1){
        return goThroughNumber(n,0)
    }else{
        return rounded
    }
}
//1000000000000000
//14285714285714286