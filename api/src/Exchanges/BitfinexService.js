import axios from 'axios';
import MoneyConverterService from '../Commons/MoneyConverterService' ;

class BitfinexService {
  constructor(coin) {
    this.coin = coin || 'BTCUSD';

    this.api = axios.create({
      baseURL: 'https://api.bitfinex.com',
    });
    this.MoneyConverterService = new MoneyConverterService();
  }

  async ticker() {
    const response = await this.api.get(`/v1/pubticker/${this.coin}`);
    // console.log(response);
    const d = response.data;

    const cotacoes = await this.MoneyConverterService.getCotacoes();
    const fatorReal = cotacoes.rates.BRL;
    console.log('Cotação do Real para o dólar', cotacoes.rates.BRL);

    return {
      ticker: {
        mid: parseFloat(d.mid),
        sell: parseFloat(d.bid * fatorReal),
        buy: parseFloat(d.ask * fatorReal),
        last: parseFloat(d.last_price * fatorReal),
        low: parseFloat(d.low * fatorReal),
        high: parseFloat(d.high * fatorReal),
        volume: parseFloat(d.volume),
        date: d.timestamp,
      },
    };
  }
}

module.exports = BitfinexService;
