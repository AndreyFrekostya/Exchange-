import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface IKlinesSymbol{
    symbol:string,
    interval:string,
    type:string
}
export const klinesSymbolApi=createApi({
    reducerPath: 'klinesSymbolApi',
    baseQuery: fetchBaseQuery({baseUrl:'https:'}),
    endpoints: (build) => ({
        getKlinesSymbol: build.query<void,IKlinesSymbol>({
            query:({symbol,interval,type})=>`//${type}api.binance.com/${type}api/v${type=='' ? '3' : '1'}/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${type=='' ? 500 : 1500}`
        }),
    })
})

export const {useGetKlinesSymbolQuery,useLazyGetKlinesSymbolQuery}=klinesSymbolApi
// async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
//     const KlinesResponse = await fetchWithBQ(`${_arg.type}api.binance.com/${_arg.type}api/v${_arg.type=='' ? '3' : '1'}/klines?symbol=${_arg.symbol.toUpperCase()}&interval=${_arg.interval}&limit=500`)
//     const point:string[][]=[[''],['']]
//     if(_arg.symbol!=='' && _arg.interval!==''){
//         const arr:string[][]=[[''],['']]
//         return arr
//         ? { data: arr as string[][] }
//         : { error: KlinesResponse.error as FetchBaseQueryError }
//     }
//     return point as string[][]
//     ? { data: point as string[][] }
//     : { error: KlinesResponse.error as FetchBaseQueryError }
//  }


//${type}api.binance.com/${type}api/v${type=='' ? '3' : '1'}/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=500