import axios from 'axios';

class BitcoinTradeApi {
  constructor(coin) {
    this.coin = coin || 'BTC';

    this.api = axios.create({
      baseURL: 'https://api.bitcointrade.com.br',
    });
  }

  ticker() {
    return this.api.get(`/v1/public/${this.coin}/ticker/`).then(response => ({ ticker: response.data.data })).catch(error => ({ message: error.response.data.message }));
  }
}

module.exports = BitcoinTradeApi;
