//1m=1 5m=2 15m=3 30m=4 1h=5 4h=6 1d=7
export function CheckPriority(distance:string){
    if(distance==='1m'){
        return 1
    }
    if(distance==='5m'){
        return 2
    }
    if(distance==='15m'){
        return 3
    }
    if(distance==='30m'){
        return 4
    }
    if(distance==='1h'){
        return 5
    }
    if(distance==='4h'){
        return 6
    }
    if(distance==='1d'){
        return 7
    }
    else{return 0}
}