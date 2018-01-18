import axios from 'axios';

class MoneyConverterService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.fixer.io',
    });
  }

  getCotacoes(b) {
    const base = b || 'USD';

    return this.api.get(`/latest?base=${base}`).then(response => response.data).catch(error => ({ message: error.response.data.message }));
  }
}

module.exports = MoneyConverterService;
