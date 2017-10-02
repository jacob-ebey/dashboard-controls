import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class Component extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]).isRequired,
      property: PropTypes.string.isRequired,
      label: PropTypes.string,
    })).isRequired,
    rowKeyProperty: PropTypes.string.isRequired,

    items: PropTypes.array,
    onRowClicked: PropTypes.func,
  };

  render() {
    const { className, items, columns, rowKeyProperty, children, ...rest } = this.props;

    const width = 100 / columns.length;

    return (
      <div
        className={`${styles.grid} ${className || ''}`}
        {...rest}
      >
        <div data-row data-header>
        {
          columns.map(col => (
            <div key={col.key} data-col style={{ width: `${width}%` }}>
              {col.label}
            </div>
          ))
        }
        </div>
        {
          items && items.map(item => (
            <div key={item[rowKeyProperty]} data-row onClick={this._handleRowClicked(item)}>
              {
                columns.map(col => (
                  <div key={col.key} data-col style={{ width: `${width}%` }}>
                    {item[col.property]}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    );
  }

  _handleRowClicked = item => () => {
    const { onRowClicked } = this.props;
    const selection = window.getSelection();

    if (!selection.toString()) {
      if (onRowClicked) {
        onRowClicked(item);
      }
    }
  }
}
