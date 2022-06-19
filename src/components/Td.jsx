import React, { Component } from 'react';
import propTypes from 'prop-types';

class Td extends Component {
  render() {
    const { children } = this.props;
    return (
      <td className="p-1 text-zinc-200 text-center">
        {children}
      </td>
    );
  }
}
Td.propTypes = {
  children: propTypes.string.isRequired,
};
export default Td;
