import React, { Component } from 'react';
import { FiCheckSquare, FiX } from 'react-icons/fi';
import PropTypes from 'prop-types';

class Status extends Component {
  render() {
    const { message, isVisibleStatus } = this.props;
    return (
      <div
        className="
        absolute flex w-screen justify-center items-center bg-black/60 h-screen"
      >
        <div className="bg-white w-96 h-80 flex flex-col items-center pt-5">
          <div className="w-full flex justify-end cursor-pointer">
            <FiX
              className="mr-7 text-xl"
              onClick={ isVisibleStatus('', false) }
            />
          </div>
          <header className="flex justify-center items-center h-36 w-36">
            <FiCheckSquare className="text-green-700 text-4xl" />
          </header>
          <p className="text-lg">{ message }</p>
        </div>
      </div>
    );
  }
}

Status.propTypes = {
  message: PropTypes.string.isRequired,
  isVisibleStatus: PropTypes.func.isRequired,
};
export default Status;
