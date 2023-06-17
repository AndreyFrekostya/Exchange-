import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export interface ICoinTickerFUTURES{
  symbol:string,
  priceChangePercent:string,
  lastPrice:string,
  volume:string,
  quoteVolume:string,
  lastId: number
}
export interface ICoinTickerCoinM{
  symbol:string,
  priceChangePercent:string,
  lastPrice:string,
  volume:string,
  baseVolume:string,
  lastId: number
}
export interface ICoin{
  symbol:string,
  status:string,
  permissions: string[],
  priceChangePercent:number,
  lastPrice:number,
  volume:number,
  quoteVolume:number,
  isAdded:boolean,
  t:string
}
export interface ICoinQuery{
  symbols:ICoin[]
}
export const CoinApi=createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({baseUrl:'https:'}),
    endpoints: (build)=>({
      getCoin: build.query<ICoin[],void>({
        async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
          //usdM futures
          const usdMResponse = await fetchWithBQ('//fapi.binance.com/fapi/v1/exchangeInfo')
          const usdM = usdMResponse.data as ICoinQuery
          const usdMTickerResponse=await fetchWithBQ('https://fapi.binance.com/fapi/v1/ticker/24hr')
          const usdMTicker=usdMTickerResponse.data as ICoinTickerFUTURES[]
          const merge=[]
          for(let i=0; i<usdM.symbols.length; i++){
            let ticker=usdMTicker.find(item=>item.symbol===usdM.symbols[i].symbol)
            merge.push({
              symbol:usdM.symbols[i].symbol,
              status:usdM.symbols[i].status,
              priceChangePercent:Number(ticker?.priceChangePercent),
              lastPrice:Number(ticker?.lastPrice),
              volume: Number(ticker?.volume),
              quoteVolume:Number(ticker?.quoteVolume),
              t:'f'
            })
          }

          // coinM futures
          const coinMResponse = await fetchWithBQ(`//dapi.binance.com/dapi/v1/exchangeInfo`)
          const coinM:ICoinQuery=coinMResponse.data as ICoinQuery
          const coinMTickerResponse=await fetchWithBQ('https://dapi.binance.com/dapi/v1/ticker/24hr')
          const coinMTicker=coinMTickerResponse.data as ICoinTickerCoinM[]
          const mergeCoinM=[]
          for(let i=0; i<coinM.symbols.length; i++){
            let ticker=coinMTicker.find(item=>item.symbol===coinM.symbols[i].symbol)
            mergeCoinM.push({
              symbol:coinM.symbols[i].symbol,
              status:coinM.symbols[i].status,
              priceChangePercent:Number(ticker?.priceChangePercent),
              lastPrice:Number(ticker?.lastPrice),
              volume: Number(ticker?.volume),
              quoteVolume:Number(ticker?.baseVolume),
              t:'d'
            })
          }

          // coin spot 
          const coinSpotResponse = await fetchWithBQ(`//api.binance.com/api/v3/exchangeInfo?permissions=SPOT`)
          const coinSpot:ICoinQuery=coinSpotResponse.data as ICoinQuery
          const coinSpotFiltered=coinSpot.symbols.filter(item=>item.status!=='BREAK' && item.status!=='SETTLING')
          const coinSpotTickerResponse=await fetchWithBQ('https://api.binance.com/api/v1/ticker/24hr')
          const coinSpotTicker=coinSpotTickerResponse.data as ICoinTickerFUTURES[]
          const coinSpotTickerFilter=coinSpotTicker.filter(item=>item.lastId!==-1 && item.lastPrice!=='0.00000000')
          const mergeCoinSpot:any=[]
          for(let i=0; i<coinSpotFiltered.length; i++){
            let ticker=coinSpotTickerFilter.find(item=>item.symbol===coinSpotFiltered[i].symbol)
            mergeCoinSpot.push({
              symbol:coinSpotFiltered[i].symbol,
              status:coinSpotFiltered[i].status,
              priceChangePercent:Number(ticker?.priceChangePercent),
              permissions:coinSpotFiltered[i].permissions,
              lastPrice:Number(ticker?.lastPrice),
              volume: Number(ticker?.volume),
              quoteVolume:Number(ticker?.quoteVolume),
              t:''
            })
          }
          const allCoins=merge.concat(mergeCoinM).concat(mergeCoinSpot)
          const allCoinsFiltered=allCoins.filter(item=>item.status!=='BREAK' && item.status!=='SETTLING' && item.status!=='PENDING_TRADING')
          //all
          allCoinsFiltered.sort((a, b) => a.symbol > b.symbol ? 1 : -1);
          return allCoinsFiltered
            ? { data: allCoinsFiltered as ICoin[] }
            : { error: coinSpotResponse.error as FetchBaseQueryError }
          },
      }),
    })
})

export const {useGetCoinQuery,useLazyGetCoinQuery}=CoinApi