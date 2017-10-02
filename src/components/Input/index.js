import React from 'react';

import styles from './styles.scss';

export default class Component extends React.Component {
  render() {
    const { className, children, ...rest } = this.props;
    return (
      <input
        className={`${styles.input} ${className || ''}`}
        {...rest}
      />
    );
  }
}
