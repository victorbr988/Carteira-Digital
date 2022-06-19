import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { RemoveWallet, SetFormType, SetIdButtonTable } from '../actions';
import Th from './Th';
import Td from './Td';

class Table extends Component {
  renderListExpenditure = () => {
    const { expensesState, dispatch } = this.props;
    function renderTr({
      value,
      currency,
      method,
      tag,
      exchangeRates,
      description,
      id,
    }) {
      return (
        <tr
          key={ id }
          className={
            id % 2 === 0 ? 'bg-gray-900 drop-shadow-md' : 'bg-gray-800'
          }
        >
          <Td>{description}</Td>
          <Td>{tag}</Td>
          <Td>{method}</Td>
          <Td>{Number(value).toLocaleString('pt-br', { style: 'currency', currency })}</Td>
          <Td>{exchangeRates[currency].name}</Td>
          <Td>{Number(exchangeRates[currency].ask).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Td>
          <Td>{(value * exchangeRates[currency].ask).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Td>
          <Td>Real</Td>
          <Td>
            <div className="flex justify-center">
              <BiEditAlt
                data-testid="edit-btn"
                className="text-green-700 cursor-pointer flex text-2xl m-2 rounded-md"
                id={ id }
                onClick={ () => {
                  dispatch(SetFormType('Editar despesa', { idButtonTable: id }));
                  dispatch(SetIdButtonTable({ idButtonTable: id }));
                } }
              />
              <MdDeleteForever
                className="text-red-500 text-2xl cursor-pointer m-2 rounded-md"
                data-testid="delete-btn"
                onClick={ () => dispatch(RemoveWallet({ id })) }
              />
            </div>
          </Td>
        </tr>
      );
    }
    return expensesState.map((objRedux) => renderTr(objRedux));
  }

  render() {
    return (
      <table className="w-full">
        <tr className="text-zinc-200 border-2 border-zinc-600">
          <Th>Descrição</Th>
          <Th>Tag</Th>
          <Th>Método de pagamento</Th>
          <Th>Valor</Th>
          <Th>Moeda</Th>
          <Th>Câmbio utilizado</Th>
          <Th>Valor convertido</Th>
          <Th>Moeda de conversão</Th>
          <Th>Editar/Excluir</Th>
        </tr>
        {this.renderListExpenditure()}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
  idButtonTable: state.wallet.idButtonTable,
});

Table.propTypes = {
  expensesState: propTypes.arrayOf(Object).isRequired,
  dispatch: propTypes.func.isRequired,
};
export default connect(mapStateToProps)(Table);
