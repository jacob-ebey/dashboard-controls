import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class Component extends React.Component {
  static propTypes = {
    error: PropTypes.string,
  };

  static defaultProps = {
    error: undefined,
  }

  render() {
    const { className, error, children, ...rest } = this.props;
    return (
      <div
        className={`${styles.loader} ${className || ''}`}
        {...rest}
      >
        <span>&#123;</span><span>&#125;</span>
        {error && <br />}
        {error && <p>{error}</p>}
      </div>
    );
  }
}
