export function GetFactorDistance(tf:string){
    if(tf[tf.length-1]==='М'){
        return Number(tf.split('М')[0])
    }
    if(tf==='1Ч'){
        return 60
    }
    if(tf==='4Ч'){
        return 240
    }
    if(tf==='Д'){
        return 720
    }
    if(tf==='Н'){
        return 5040
    }
    if(tf==='Mес'){
        return 1
    }
    return 0
}