
export const CoinList = () =>
`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
`https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365) =>
`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;

export const TrendingCoins = () =>
`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const NewsTopics = () =>
`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=52318f88dd2b48f1ab98077345863a06`
