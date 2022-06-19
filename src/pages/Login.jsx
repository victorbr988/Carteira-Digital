import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoMdWallet } from 'react-icons/io';
import { addUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.type]: target.value,
    });
  }

  userValidation = () => {
    const { email, password } = this.state;
    const MIN_CHAR_PASSWORD = 6;

    if (email.includes('@')
      && email.includes('.com')
      && password.length >= MIN_CHAR_PASSWORD) {
      return false;
    }
    return true;
  }

  render() {
    const { history, sendEmailUser } = this.props;
    const { email } = this.state;
    return (
      <section
        className=" h-screen flex flex-col justify-center items-center
      "
      >
        <h2 className="text-2xl w-full text-zinc-200 flex justify-center mb-10">
          Acesse a plataforma Wallet
        </h2>
        <form className="flex flex-col p-2 border-2 border-blue-900 p-10">
          <IoMdWallet className="text-7xl text-green-700 flex justify-center w-full mb-2" />
          <label htmlFor="email" className="flex flex-col text-zinc-200 gap-2">
            Digite seu Email
            <input
              placeholder="Seu email"
              type="email"
              id="email"
              className="bg-zinc-100 p-1 outline-none w-80 mb-2 rounded text-gray-800"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="password" className="flex flex-col text-zinc-200 gap-2">
            Digite sua senha
            <input
              placeholder="Sua senha"
              type="password"
              id="password"
              className="bg-zinc-100 p-1 outline-none w-80 rounded text-gray-800"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="
              bg-green-700 w-20 p-2 rounded-md text-zinc-200 mt-2 disabled:opacity-70
            "
            type="button"
            disabled={ this.userValidation() }
            onClick={ () => {
              history.push('/carteira');
              sendEmailUser({ email });
            } }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmailUser: (state) => dispatch(addUser(state)),
});
Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  sendEmailUser: propTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
