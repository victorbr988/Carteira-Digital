import React from 'react';
import { connect } from 'react-redux';
import { FiCreditCard } from 'react-icons/fi';
import propTypes from 'prop-types';
import updateCurrency from '../actions';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(updateCurrency());
  }

  totalExpenditure = () => {
    const { expensesState } = this.props;

    function convert({ value, currency, exchangeRates }) {
      return Number(value) * exchangeRates[currency].ask;
    }

    const value = expensesState
      .map((data) => convert(data));
    const totalExpenditure = value.reduce((prev, curr) => prev + curr, 0);
    return totalExpenditure;
  }

  render() {
    const { userMail } = this.props;
    return (
      <section>
        <header className="bg-gray-800 text-zinc-200  p-2">
          <div className="flex justify-between items-center md:mx-2">
            <div className="flex gap-2 text-xl items-center">
              Trybe Wallet
              <FiCreditCard className="text-green-700 text-2xl" />
            </div>
            <h2
              data-testid="email-field"
              className="w-1/3 text-center"
            >
              {`E-mail: ${userMail}`}
            </h2>
            <div className="p-1">
              <h2
                data-testid="total-field"
              >
                {`${this.totalExpenditure()
                  .toLocaleString('pt-br',
                    { style: 'currency', currency: 'BRL' })}
                `}
              </h2>
            </div>
            <div className="p-1">
              {/* <h2 data-testid="header-currency-field">Moeda: BRL</h2> */}
            </div>
          </div>
        </header>
        <main>
          <section>
            <Form totalExpenditure={ this.totalExpenditure } />
          </section>
          <section className="p-2 flex justify-center">
            <Table />
          </section>
        </main>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  userMail: state.user.email,
  expensesState: state.wallet.expenses,
});

Wallet.propTypes = {
  userMail: propTypes.string.isRequired,
  dispatch: propTypes.func.isRequired,
  expensesState: propTypes.arrayOf(Object).isRequired,
};
export default connect(mapStateToProps)(Wallet);
