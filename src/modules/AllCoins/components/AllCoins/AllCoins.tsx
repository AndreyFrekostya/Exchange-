import React, { RefObject, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { setGraphicCoin, setGraphicDistance } from '../../../../pages/MainPage/slices/GraphicSlice';
import { changeDistance } from '../../../MenuSettings/slices/DistanceSetSlice';
import { ICoin, ICoinQuery } from '../../../../pages/MainPage/api/CoinApi'
import Loader from '../../../../components/Loading/Loader';
interface AllCoins{
    graphicRef: RefObject<HTMLDivElement>,
    requestingSymbols: ICoin[],
    data:ICoin[] | undefined,
    text: string,
    id: number,
    visibleRows: number
}
const AllCoins:React.FC<AllCoins> = ({graphicRef,requestingSymbols,data,text,id,visibleRows }) => {
    const graphic=useAppSelector(state=>state.graphics.find(item=>item.id===id))
    const dispatch=useAppDispatch()
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [start, setStart] = useState<number>(0);
    const chooseCoin=(id:number, coin: string, type: string | undefined)=>{
        if(graphic?.distance==='0'){
            dispatch(changeDistance('Д'))
            dispatch(setGraphicDistance('Д'))
        }
        dispatch(setGraphicCoin({id:id,coin:coin, type: type}))
    }
    useEffect(()=>{
        setStart(0)
        if(rootRef.current!==null){
            rootRef.current.scrollTop=0
        }
    },[requestingSymbols])
    function getTopHeight() {
        return 29.5 * start;
    }
    function getBottomHeight() {
        if(data!==undefined){
            if(requestingSymbols.length<visibleRows){
                return 29.5 * requestingSymbols.length
            }else{
                return 29.5 * (requestingSymbols.length - (start + visibleRows + 1));
            }
        }
    }
    useEffect(()=>{
        getBottomHeight()
    },[requestingSymbols])
    useEffect(() => {
        function onScroll(e:any) {
            if(data!==undefined){
                setStart(Math.min(
                    data.length - visibleRows - 1,
                    Math.floor(e.target.scrollTop / 29.5)
                ));
            }
        }
        if(rootRef.current!==null){
            rootRef.current.addEventListener('scroll', onScroll);
        }
    
        return () => {
          if(rootRef.current!==null){
            rootRef.current.removeEventListener('scroll', onScroll);
          }
        }
      }, [data?.length, visibleRows]);
    return (
    <div className={styles.coins} >
             <div className={styles.coinsName} ref={rootRef} style={{ height: 29.5 * visibleRows + 1, overflow: 'auto' }}>
                    <div>
                    <div style={{ height: getTopHeight() }} />
                    {requestingSymbols?.slice(start, start + visibleRows + 1).map((sym:ICoin,index:number)=>(
                        <div key={start + index} className={styles.symbol} onClick={()=>chooseCoin(id,sym.symbol, sym.t)}>
                            <p>{sym.symbol}</p>
                            <p className={sym.permissions==undefined ? styles.futures : styles.spot}>{ sym.permissions==undefined ? 'futures' : 'spot'}</p>
                        </div>
                    ))}
                    <div style={{ height: getBottomHeight() }} />  
                    </div>
                {text.length!==0 && requestingSymbols.length==0 && <p className={styles.nothing}>Ничего не найдено!</p>}
             </div>
        </div>
  )
}

export default AllCoins