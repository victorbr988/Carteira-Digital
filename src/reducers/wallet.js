// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_WALLET, REMOVE_WALLET, SET_TYPE_FORM, EDIT_FORM, SET_ID_BUTTON_TABLE } from '../actions';

const INITAL_STATE_TYPEFORM = 'Adicionar despesa';

const INFO_WALLET = {
  currencies: [],
  expenses: [],
  typeForm: INITAL_STATE_TYPEFORM,
  idButtonTable: 0,
};

const userWallet = (store = INFO_WALLET, action) => {
  switch (action.type) {
  case ADD_WALLET:
    return {
      ...store,
      currencies: action.payload.currencies || store.currencies,
      expenses: action.payload.expenses
        ? [
          ...store.expenses,
          ...action.payload.expenses,
        ] : store.expenses,
    };
  case REMOVE_WALLET:
    return {
      ...store,
      currencies: store.currencies,
      expenses: store.expenses.filter(({ id }) => id !== action.payload.id),
      typeForm: INITAL_STATE_TYPEFORM,
    };
  case SET_TYPE_FORM:
    return {
      ...store,
      typeForm: action.payload,
    };
  case EDIT_FORM:
    return {
      ...store,
      typeForm: INITAL_STATE_TYPEFORM,
      expenses: store.expenses
        .map((state) => (state.id === action.payload.expenses.id
          ? {
            ...state, ...action.payload.expenses,
          } : state
        )),
    };
  case SET_ID_BUTTON_TABLE:
    return {
      ...store,
      idButtonTable: action.payload.idButtonTable,
    };
  default: return store;
  }
};

export default userWallet;
