import React from 'react';
import { storiesOf } from '@storybook/react';

import TimePicker from './index';

class TimePickerWrapper extends React.Component {
  state = {
    value: undefined,
  };

  render() {
    const { value } = this.state;

    return <TimePicker {...this.props} value={value} onChange={this._handleOnChange} />;
  }

  _handleOnChange = value => {
    console.log(value);

    this.setState({ value });
  }
}

storiesOf('TimePicker', module)
  .add('default', () => (
    <TimePickerWrapper />
  ))
  .add('can set time', () => (
    <TimePicker value="2:34 am" />
  ));
