import axios from 'axios';

class MercadoBitcoinApi {
  constructor(coin) {
    this.coin = coin || 'BTC';

    this.api = axios.create({
      baseURL: 'https://www.mercadobitcoin.net',
    });
  }

  ticker() {
    return this.api.get(`/api/${this.coin}/ticker/`).then((response) => {
      // console.log(response);
      const d = response.data.ticker;
      return {
        ticker: {
          high: parseFloat(d.high),
          low: parseFloat(d.low),
          volume: parseFloat(d.vol),
          last: parseFloat(d.last),
          buy: parseFloat(d.buy),
          sell: parseFloat(d.sell),
          date: d.date,
        },
      };
    }).catch(error =>
      // console.log(error);
      error);
  }
}

module.exports = MercadoBitcoinApi;
