// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userLogin = (store = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...store,
      ...action.payload,
    };
  default: return store;
  }
};

export default userLogin;
