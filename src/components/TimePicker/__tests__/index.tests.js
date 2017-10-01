import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import timemachine from 'timemachine';

import TimePicker from '../index';

Enzyme.configure({ adapter: new Adapter() });

global.window = global;
window.addEventListener = () => { };
window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};

timemachine.config({
  dateString: 'November 30, 1993 1:30:00'
});

describe('components/TimePicker - index.js', () => {
  const createProps = () => ({
    value: new Date(),
    onChange: jest.fn(),
  });

  test('Renders without error', () => {
    const props = createProps();

    const wrapper = shallow(<TimePicker {...props} />);

    expect(props.onChange).toHaveBeenCalledTimes(0);

    expect(wrapper).toMatchSnapshot();
  });

  test('Raises onChange if no value', () => {
    const props = {
      ...createProps(),
      value: '',
    };

    const wrapper = shallow(<TimePicker {...props} />);

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(new Date());

    expect(wrapper).toMatchSnapshot();
  });

  test('Raises onChange for valid input', () => {
    const props = createProps();

    const date = new Date();
    date.setHours(13, 45);

    const wrapper = shallow(<TimePicker {...props} />);

    const inputOnChange = wrapper.find('input').prop('onChange');
    inputOnChange({ target: { value: '1:45 pm' } });

    wrapper.update();

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(date);

    expect(wrapper).toMatchSnapshot();
  });

  test('Does not raise onChange for invalid input', () => {
    const props = createProps();

    const wrapper = shallow(<TimePicker {...props} />);

    const inputOnChange = wrapper.find('input').prop('onChange');
    inputOnChange({ target: { value: 'ROFL' } });

    expect(props.onChange).toHaveBeenCalledTimes(0);
  });

  test('Can open dialog', () => {
    const props = createProps();

    const wrapper = shallow(<TimePicker {...props} />);

    const inputOnClick = wrapper.find('input').prop('onClick');
    inputOnClick();

    wrapper.update();

    expect(wrapper.state('isOpen')).toBe(true);
  });

  test('Can select hour', () => {
    const props = createProps();

    const wrapper = shallow(<TimePicker {...props} />);

    const inputOnClick = wrapper.find('input').prop('onClick');
    inputOnClick();

    wrapper.update();

    const date = new Date();
    date.setHours(0, date.getMinutes());

    const onClickFirstHour = wrapper
      .find('.popup')
      .find('.popupList')
      .first()
      .find('.popupItem')
      .first()
      .prop('onClick');

    onClickFirstHour();

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toBeCalledWith(date);
  });

  test('Can select minute', () => {
    const props = createProps();

    const wrapper = shallow(<TimePicker {...props} />);

    const inputOnClick = wrapper.find('input').prop('onClick');
    inputOnClick();

    wrapper.update();

    const date = new Date();
    date.setHours(1, 0);

    const onClickFirstHour = wrapper
      .find('.popup')
      .find('.popupList')
      .at(1)
      .find('.popupItem')
      .first()
      .prop('onClick');

    onClickFirstHour();

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toBeCalledWith(date);
  });

  test('Can select amPm', () => {
    const props = createProps();

    const wrapper = shallow(<TimePicker {...props} />);

    const inputOnClick = wrapper.find('input').prop('onClick');
    inputOnClick();

    wrapper.update();

    const date = new Date();
    date.setHours(13, date.getMinutes());

    const onClickFirstHour = wrapper
      .find('.popup')
      .find('.popupList')
      .at(2)
      .find('.popupItem')
      .last() // PM
      .prop('onClick');

    onClickFirstHour();

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toBeCalledWith(date);
  });
});
