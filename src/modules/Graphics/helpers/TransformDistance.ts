export function TransformDistance(distance:string){
    if(distance[distance.length-1]==='М'){
        return distance.replace('М','m')
    }
    if(distance[distance.length-1]==='Ч'){
        return distance.replace('Ч','h')
    }
    if(distance==='Д'){
        return '1d'
    }
    if(distance==='Н'){
        return '1w'
    }
    if(distance==='Mес'){
        return '1M'
    }
    return ''
}