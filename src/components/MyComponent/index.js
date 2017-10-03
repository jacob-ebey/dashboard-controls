import React from 'react';

import styles from './styles.scss';

export default class Component extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div
        className={`${styles.main} ${className || ''}`}
      />
    );
  }
}
