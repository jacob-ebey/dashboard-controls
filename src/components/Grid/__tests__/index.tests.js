import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Grid from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('components/Grid - index.js', () => {
  const createProps = () => ({
    columns: [
      { key: 'name', label: 'Name', property: 'name' },
      { key: 'value', label: 'Value', property: 'value' },
    ],
    rowKeyProperty: 'value',
    items: [
      { name: 'Name 1', value: 'Value 1' },
      { name: 'Name 2', value: 'Value 2' },
    ],
    onRowClicked: jest.fn(),
  });

  test('Renders without error', () => {
    const props = createProps();

    const wrapper = shallow(<Grid {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('Raises onRowClicked', () => {
    const props = createProps();

    const wrapper = shallow(<Grid {...props} />);
    const dataRow = wrapper
      .find('[data-row]')
      .not('[data-header]')
      .first();

    const onRowClick = dataRow.prop('onClick');

    window.getSelection = () => ({
      toString: () => undefined,
    });

    onRowClick();

    expect(props.onRowClicked).toHaveBeenCalledTimes(1);
    expect(props.onRowClicked).toHaveBeenCalledWith(props.items[0]);
  });

  test('Can click row without onRowClicked', () => {
    const props = {
      ...createProps(),
      onRowClicked: undefined,
    };

    const wrapper = shallow(<Grid {...props} />);
    const dataRow = wrapper
      .find('[data-row]')
      .not('[data-header]')
      .first();

    const onRowClick = dataRow.prop('onClick');

    window.getSelection = () => ({
      toString: () => undefined,
    });

    onRowClick();
  });

  test('Raises onRowClicked', () => {
    const props = createProps();

    const wrapper = shallow(<Grid {...props} />);
    const dataRow = wrapper
      .find('[data-row]')
      .not('[data-header]')
      .first();

    const onRowClick = dataRow.prop('onClick');

    window.getSelection = () => ({
      toString: () => undefined,
    });

    onRowClick();

    expect(props.onRowClicked).toHaveBeenCalledTimes(1);
    expect(props.onRowClicked).toHaveBeenCalledWith(props.items[0]);
  });

  test('Does not raise onRowClicked if selection', () => {
    const props = createProps();

    const wrapper = shallow(<Grid {...props} />);
    const dataRow = wrapper
      .find('[data-row]')
      .not('[data-header]')
      .first();

    const onRowClick = dataRow.prop('onClick');

    window.getSelection = () => ({
      toString: () => 'ROFL',
    });

    onRowClick();

    expect(props.onRowClicked).toHaveBeenCalledTimes(0);
  });
});