export function getTransformedNumber(n:number){
    if (n >= 1000000000) {
        return Math.round(n/100000000)*100000000
        }
    if (n >= 1000000) {
        return Math.round(n/100000)*100000
    }
    if (n >= 1000) {
        return Math.round(n/100)*100
    }
    if(n>=100){
        return Math.round(n/10)*10
    }
    if(n>=10){
        return Math.round(n/10)*10
    }
    return n;
}