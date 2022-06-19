// import Wallet from "../pages/Wallet";

const getExpenditure = async () => {
  const CURRENCY = await fetch('https://economia.awesomeapi.com.br/json/all');
  const CURRENCY_JSON = await CURRENCY.json();
  return CURRENCY_JSON;
};
export default getExpenditure;
