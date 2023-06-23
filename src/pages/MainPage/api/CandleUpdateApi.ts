import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface IKlinesSymbol{
    symbol:string,
    interval:string,
    type:string
}
interface IResponseKlines{
  k:{
    t:number,
    o:string,
    h:string,
    l:string,
    c:string,
    v:string
  }
}
//<symbol>@kline_<interval>
export const candleUpdateApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getUpdatedKlines: build.query<string[], IKlinesSymbol>({
      query: ({symbol, interval,type}) => `https://${type}api.binance.com/${type}api/v${type==='' ? '3' : '1'}/klines?symbol=${symbol.toUpperCase()}&interval=${interval}&limit=${type==='' ? 500 : 1500}`,
      async onCacheEntryAdded(arg,{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${arg.symbol.toLowerCase()}@kline_${arg.interval}`)
        try {
          await cacheDataLoaded
          const listener = (event: MessageEvent) => {
            let data = JSON.parse(event.data)
            updateCachedData((draft) => {
              return [data.k.t,data.k.o,data.k.h,data.k.l, data.k.c,data.k.v]
            })
          }

          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close()
      },
    }),
  }),
})

export const { useGetUpdatedKlinesQuery } = candleUpdateApi