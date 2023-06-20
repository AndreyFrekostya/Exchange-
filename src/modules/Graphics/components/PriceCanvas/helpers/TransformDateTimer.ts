export function TransfromDateTimer(n:number, time:number, special?:number){
    let min=time
    let max=special ? special : 60
    while(min<=max){
        if(n<=min){
            return min-n
        }else{
            min=min+time
        }
    }
}
