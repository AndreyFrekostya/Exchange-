import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export interface ICoinInListGraphic{
  symbol:string,
  status:string,
  permissions: string[],
  t:string
}
export interface ICoinQuery{
  symbols:ICoinInListGraphic[]
}
export const CoinInListApi=createApi({
    reducerPath: 'coinInListApi',
    baseQuery: fetchBaseQuery({baseUrl:'https:'}),
    endpoints: (build)=>({
      getCoinInList: build.query<ICoinInListGraphic[],void>({
        async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
          //usdM futures
          const usdMResponse = await fetchWithBQ('//fapi.binance.com/fapi/v1/exchangeInfo')
          const usdM = usdMResponse.data as ICoinQuery
          for(let i=0; i<usdM.symbols.length; i++){
            usdM.symbols[i].t='f'
          }
          // coinM futures
          const coinMResponse = await fetchWithBQ(`//dapi.binance.com/dapi/v1/exchangeInfo`)
          const coinM:ICoinQuery=coinMResponse.data as ICoinQuery
          for(let i=0; i<coinM.symbols.length; i++){
            coinM.symbols[i].t='d'
          }
          // coin spot 
          const coinSpotResponse = await fetchWithBQ(`//api.binance.com/api/v3/exchangeInfo?permissions=SPOT`)
          const coinSpot:ICoinQuery=coinSpotResponse.data as ICoinQuery
          for(let i=0; i<coinSpot.symbols.length; i++){
            coinSpot.symbols[i].t=''
          }
          //all
          const allCoins=usdM.symbols.concat(coinM.symbols).concat(coinSpot.symbols)
          const allCoinsFiltered=allCoins.filter(item=>item.status!=='BREAK' && item.status!=='SETTLING' && item.status!=='PENDING_TRADING')
          //
          allCoinsFiltered.sort((a, b) => a.symbol > b.symbol ? 1 : -1);
          return allCoinsFiltered
            ? { data: allCoinsFiltered as ICoinInListGraphic[] }
            : { error: coinSpotResponse.error as FetchBaseQueryError }
          },
      }),
    })
})

export const {useGetCoinInListQuery}=CoinInListApi