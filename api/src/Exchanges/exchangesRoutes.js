import BitcoinTradeService from './BitcoinTradeService';
import MercadoBitcoinService from './MercadoBitcoinService';
import BitfinexService from './BitfinexService';

module.exports = (app) => {
  app.get('/exchanges', async (req, res) => {
    const bitcoinTradeApi = new BitcoinTradeService('BTC');
    const mercadoBitcoinApi = new MercadoBitcoinService('BTC');
    const bitfinexApi = new BitfinexService('BTCUSD');

    const tickers = {};

    // busca tickers
    tickers.bitcoinTrade = await bitcoinTradeApi.ticker();
    tickers.mercadoBitcoin = await mercadoBitcoinApi.ticker();
    tickers.bitfinex = await bitfinexApi.ticker();

    // Melhor compra
    const bitcoinTradeBuy = tickers.bitcoinTrade.ticker.buy;
    const mercadoBitcoinBuy = tickers.mercadoBitcoin.ticker.buy;
    let melhorCompra = '!!!Melhor compra: ';
    if (bitcoinTradeBuy < mercadoBitcoinBuy) {
      melhorCompra += `Bitcoin Trade: ${bitcoinTradeBuy} vs ${mercadoBitcoinBuy} != ${mercadoBitcoinBuy - bitcoinTradeBuy}`;
    } else {
      melhorCompra += `Mercado Bitcoin: ${mercadoBitcoinBuy} vs ${bitcoinTradeBuy} != ${bitcoinTradeBuy - mercadoBitcoinBuy}`;
    }

    // Melhor venda
    const bitcoinTradeSell = tickers.bitcoinTrade.ticker.sell;
    const mercadoBitcoinSell = tickers.mercadoBitcoin.ticker.sell;
    let melhorVenda = 'Melhor venda: ';
    if (bitcoinTradeSell > mercadoBitcoinSell) {
      melhorVenda += `Bitcoin Trade: ${bitcoinTradeSell} vs ${bitcoinTradeSell} != ${bitcoinTradeSell - mercadoBitcoinSell}`;
    } else {
      melhorVenda += `Mercado Bitcoin: ${mercadoBitcoinSell} vs ${bitcoinTradeSell} != ${mercadoBitcoinSell - bitcoinTradeSell}`;
    }

    return res.json({ tickers, melhorCompra, melhorVenda });
  });
};
