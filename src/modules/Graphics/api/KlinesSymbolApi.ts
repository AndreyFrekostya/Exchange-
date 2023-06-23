import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface IKlinesSymbol{
    symbol:string,
    interval:string,
    type:string
}
interface IKlinesMutation{
    settings:{
        symbol:string,
        interval:string,
        type:string
    },
    body:string[]
}
interface HistoricaKlines extends IKlinesSymbol{
    start:number,
    end:number
}
type KlinesRespones=string[][]
export const klinesSymbolApi=createApi({
    reducerPath: 'klinesSymbolApi',
    tagTypes: ['Klines'],
    baseQuery: fetchBaseQuery({baseUrl:'https:'}),
    endpoints: (build) => ({
        getKlinesSymbol: build.query<KlinesRespones,IKlinesSymbol>({
            query:({symbol,interval,type})=>`//${type}api.binance.com/${type}api/v${type==='' ? '3' : '1'}/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${type==='' ? 500 : 1500}`,
            providesTags: (result) =>
            result
              ? [
                  ...result.map(() => ({ type: 'Klines' as const,  })),
                  { type: 'Klines', id: 'LIST' },
                ]
              : [{ type: 'Klines', id: 'LIST' }],
        }),
        addKline: build.mutation<void, IKlinesMutation>({
            query: ({settings,body}) => ({
                url: `https://${settings.type}api.binance.com/${settings.type}api/v${settings.type==='' ? '3' : '1'}/klines?symbol=${settings.symbol.toUpperCase()}&interval=${settings.interval}&limit=${settings.type==='' ? 500 : 1500}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Klines', id: 'LIST'}]
        }),
        getHisoricalKlines:build.query<KlinesRespones, HistoricaKlines>({
            query:({symbol,interval,type, start, end})=>`//${type}api.binance.com/${type}api/v${type==='' ? '3' : '1'}/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=1500&startTime=${start}&endTime=${end}`,
        })
    })
})

export const {useLazyGetKlinesSymbolQuery,useAddKlineMutation, useLazyGetHisoricalKlinesQuery}=klinesSymbolApi