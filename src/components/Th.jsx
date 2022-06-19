import React, { Component } from 'react';
import propTypes from 'prop-types';

class Th extends Component {
  render() {
    const { children } = this.props;
    return (
      <th className="border-2 border-zinc-300 p-2">
        {children}
      </th>
    );
  }
}
Th.propTypes = {
  children: propTypes.string.isRequired,
};
export default Th;
