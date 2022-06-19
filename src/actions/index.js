// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';
export const REMOVE_WALLET = 'REMOVE_WALLET';
export const SET_TYPE_FORM = 'SET_TYPE_FORM';
export const EDIT_FORM = 'EDIT_FORM';
export const SET_ID_BUTTON_TABLE = 'SET_ID_BUTTON_TABLE';

export const addUser = (state) => ({
  type: ADD_USER,
  payload: {
    ...state,
  },
});

export const AddWallet = (state) => ({
  type: ADD_WALLET,
  payload: {
    ...state,
  },
});

export const RemoveWallet = (state) => ({
  type: REMOVE_WALLET,
  payload: {
    ...state,
  },
});

export const SetFormType = (state) => ({
  type: SET_TYPE_FORM,
  payload: state,
});

export const EditForm = (state) => ({
  type: EDIT_FORM,
  payload: {
    ...state,
  },
});

export const SetIdButtonTable = (state) => ({
  type: SET_ID_BUTTON_TABLE,
  payload: {
    ...state,
  },
});

const updateCurrency = () => async (dispatch) => {
  const CURRENCY = await fetch('https://economia.awesomeapi.com.br/json/all');
  const CURRENCY_JSON = await CURRENCY.json();
  const allCurrency = Object.keys(CURRENCY_JSON);
  const filterCurrency = allCurrency.filter((currency) => currency !== 'USDT');
  dispatch(AddWallet({ currencies: filterCurrency }));
};
export default updateCurrency;
