import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getExpenditure from '../Request_API';
import { AddWallet, EditForm } from '../actions';

const INITIAL_FORM_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};
class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      ...INITIAL_FORM_STATE,
    };
  }

  handleUpdateState = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  }

  clearSpacesForm = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1,
      ...INITIAL_FORM_STATE,
    }));
  }

  disableButton = () => {
    const { value, description } = this.state;
    if (value === 0 || description === '') return true;
    return false;
  }

  handleClickSubmit = async () => {
    const { totalExpenditure, dispatch, setTypeForm, idButtonTable } = this.props;
    const { currency, description, method, tag, value } = this.state;
    const requestApi = await getExpenditure();
    if (setTypeForm === 'Editar despesa') {
      const prevState = {
        id: idButtonTable,
        currency,
        description,
        method,
        tag,
        value,
      };
      dispatch(EditForm({ expenses: prevState }));
      return this.setState(INITIAL_FORM_STATE);
    }
    dispatch(AddWallet({
      expenses: [{ ...this.state, exchangeRates: requestApi }],
    }));
    totalExpenditure();
    this.clearSpacesForm();
  }

  render() {
    const { allCurrency, setTypeForm } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form className="p-2 bg-gray-700 h-16 flex items-center justify-around">
        <label htmlFor="value" className="text-zinc-200 px-2">
          Valor:
          <input
            className="outline-none w-20 text-gray-800 px-1 ml-2 rounded"
            type="text"
            id="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleUpdateState }
          />
        </label>
        <label htmlFor="description" className="text-zinc-200">
          Descrição:
          <input
            className=" w-40 outline-none px-1 text-gray-800 ml-2 rounded"
            type="text"
            id="description"
            value={ description }
            onChange={ this.handleUpdateState }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency" className="text-zinc-200">
          Moeda
          <select
            className="w-24 text-gray-800 transition outline-none ml-2 rounded"
            type="text"
            id="currency"
            value={ currency }
            onChange={ this.handleUpdateState }
            data-testid="currency-input"
          >
            {
              allCurrency.map((money, index) => (
                <option
                  className="text-gray-800 text-center bg-gray-200"
                  key={ index }
                >
                  {money}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method" className="text-zinc-200 ">
          Método de pagamento
          <select
            id="method"
            value={ method }
            className="text-gray-800 transition outline-none ml-2"
            data-testid="method-input"
            onChange={ this.handleUpdateState }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="text-zinc-200">
          Despesa
          <select
            id="tag"
            value={ tag }
            onChange={ this.handleUpdateState }
            className="text-gray-800 transition outline-none ml-2"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          className="bg-green-700  p-1 rounded-md text-zinc-200 disabled:brightness-75"
          onClick={ this.handleClickSubmit }
          disabled={ this.disableButton() }
        >
          { setTypeForm }
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  allCurrency: state.wallet.currencies,
  setTypeForm: state.wallet.typeForm,
  expenses: state.wallet.expenses,
  idButtonTable: state.wallet.idButtonTable,
});

Form.propTypes = {
  allCurrency: PropTypes.arrayOf(String).isRequired,
  totalExpenditure: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  setTypeForm: PropTypes.string.isRequired,
  idButtonTable: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Form);
