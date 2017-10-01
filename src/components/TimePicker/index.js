import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

const hours = Array(12)
  .fill()
  .map((_, index) => index);
hours[0] = 12;

const minutes = Array(60)
  .fill()
  .map((_, index) => pad(index));

const amPm = ['AM', 'PM'];

export default class TimePicker extends React.PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    onChange: PropTypes.func,
  };

  state = {
    popupWidth: undefined,
    isOpen: false,
    internalValue: new Date(),
    internalError: undefined,
  };

  componentDidMount() {
    const { value, onChange } = this.props;

    document.addEventListener('mousedown', this._handleClickOutside);

    const mainNode = ReactDOM.findDOMNode(this.mainRef);
    if (mainNode) {
      const popupWidth = mainNode.getBoundingClientRect().width;
      this.setState({ popupWidth });
    }

    if (!value && onChange) {
      onChange(new Date());
    }

    this.setState({ internalValue: value });
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (nextProps.value !== value) {
      this.setState({ internalValue: nextProps.value });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside);
  }

  render() {
    const { popupWidth, isOpen, internalError } = this.state;
    const tempDate = this._value;
    const date = typeof tempDate === 'object' ? tempDate : {};
    const formattedDate = typeof tempDate === 'object' ? `${tempDate.hour}:${tempDate.minute} ${tempDate.amPm}` : tempDate;

    return (
      <div
        className={styles.main}
        ref={this._storeMainRef}
      >
        <input
          className={`${styles.input} ${isOpen ? styles.highlightBoarder : ''} ${internalError ? styles.errorHighlight : ''}`}
          onChange={this._handleOnInputChange}
          onClick={this._toggleOpen}
          value={formattedDate}
        />
        {
          !isOpen && internalError && (
            <span
              className={styles.error}
              style={{
                width: popupWidth,
              }}
            >
              {internalError}
            </span>
          )
        }
        {
          isOpen && (
            <div
              className={`${styles.popup} ${internalError ? styles.errorHighlight : ''}`}
              style={{
                width: popupWidth,
              }}
            >
              <div className={styles.popupList}>
                {
                  hours.map(hour => (
                    <span
                      key={hour}
                      className={`${styles.popupItem} ${hour === date.hour ? styles.activeItem : ''}`}
                      onClick={this._onHourClicked(hour)}
                    >
                      {hour}
                    </span>
                  ))
                }
              </div>
              <div className={styles.popupList}>
                {
                  minutes.map(minute => (
                    <span
                      key={minute}
                      className={`${styles.popupItem} ${minute === date.minute ? styles.activeItem : ''}`}
                      onClick={this._onMinuteClicked(minute)}
                    >
                      {minute}
                    </span>
                  ))
                }
              </div>
              <div className={styles.popupList}>
                {
                  amPm.map(option => (
                    <span
                      key={option}
                      className={`${styles.popupItem} ${option === date.amPm ? styles.activeItem : ''}`}
                      onClick={this._onAmPmClicked(option)}
                    >
                      {option}
                    </span>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }

  get _value() {
    const { internalValue } = this.state;

    const date = new Date(internalValue);
    if (!isNaN(date.getHours()) && !isNaN(date.getMinutes())) {
      const pureHours = date.getHours();

      let hours = pureHours;
      if (hours === 0) {
        hours = 12;
      } if (hours > 12) {
        hours = hours - 12;
      }
      const minute = pad(date.getMinutes());

      const tempDate = {
        minute,
        hour: hours,
        amPm: pureHours >= 12 ? 'PM' : 'AM',
      };
      return tempDate;
    }

    return internalValue;
  }

  _handleOnInputChange = event => {
    const { onChange } = this.props;

    const split = event.target.value.split(':');

    if (split.length === 2) {
      const split2 = split[1].split(' ');

      if (split2.length === 2) {
        let hour = parseInt(split[0].trim(), 10);
        const minute = parseInt(split2[0].trim(), 10);
        const amPm = split2[1].trim().toLowerCase();

        if (!isNaN(hour) && hour <= 12 && !isNaN(minute) && minute <= 60 && (amPm === 'am' || amPm === 'pm')) {
          if (amPm === 'am') {
            if (hour === 12) {
              hour = 0;
            }
          } else if (hour !== 12) {
            hour = hour + 12;
          }

          const date = new Date();
          date.setHours(hour, minute);

          if (onChange) {
            onChange(date);
          }

          this.setState({
            internalValue: date,
            internalError: undefined,
          });
          return;
        }
      }
    }

    this.setState({
      internalValue: event.target.value,
      internalError: 'Must be in format 12:00 pm'
    });
  }

  _onHourClicked = hour => () => {
    const { onChange } = this.props;
    const { internalValue } = this.state;

    let date = new Date(internalValue);
    if (!isNaN(date.getTime())) {
      let hours = date.getHours();
      if (!isNaN(hours) && hours >= 12) {
        hours = hour === 12 ? 12 : hour + 12;
      } else {
        hours = hour === 12 ? 0 : hour;
      }

      const minutes = date.getMinutes();

      date.setHours(hours, !isNaN(minutes) ? minutes : 0);
    } else {
      date = new Date();
      date.setHours(hour, 0);
    }

    if (onChange) {
      onChange(date);
    }

    this.setState({
      internalValue: date,
      internalError: undefined,
    });
  }

  _onMinuteClicked = minute => () => {
    const { onChange } = this.props;
    const { internalValue } = this.state;

    let date = new Date(internalValue);
    if (!isNaN(date.getTime())) {
      const hours = date.getHours();
      date.setHours(!isNaN(hours) ? hours : 12, minute);
    } else {
      date = new Date();
      date.setHours(12, minute);
    }

    if (onChange) {
      onChange(date);
    }

    this.setState({
      internalValue: date,
      internalError: undefined,
    });
  }

  _onAmPmClicked = amPm => () => {
    const { onChange } = this.props;
    const { internalValue } = this.state;

    let date = new Date(internalValue);

    if (!isNaN(date.getTime())) {
      let hours = date.getHours();
      const minutes = date.getMinutes();

      if (!isNaN(hours) && !isNaN(minutes)) {
        hours = hours > 12 ? hours - 12 : hours;
        if (amPm === 'AM') {
          date.setHours(hours === 12 ? 0 : hours, minutes);
        } else {
          date.setHours(hours === 12 ? 12 : hours + 12, minutes);
        }
      }
    } else {
      if (amPm === 'AM') {
        date = new Date();
        date.setHours(0, 0);
      } else {
        date = new Date();
        date.setHours(12, 0);
      }
    }

    if (onChange) {
      onChange(date);
    }

    this.setState({
      internalValue: date,
      internalError: undefined,
    });
  }

  _handleClickOutside = event => {
    if (this.mainRef && !this.mainRef.contains(event.target)) {
      this._dismiss();
    }
  }

  _dismiss = event => {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(new Event().initEvent('blur', false, false));
    }

    this.setState({ isOpen: false });
  }

  _toggleOpen = () => {
    const { isOpen, onBlur, onFocus } = this.state;

    if (isOpen && onBlur) {
      onBlur(new Event().initEvent('blur', false, false));
    } else if (onFocus) {
      onFocus(new Event().initEvent('focus', false, false));
    }

    this.setState({ isOpen: !isOpen });
  }

  _storeMainRef = mainRef => {
    this.mainRef = mainRef;
  }
}
