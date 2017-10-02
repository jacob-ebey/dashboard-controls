import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Select from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('components/Select - index.js', () => {
  const createProps = () => ({
    children: <option value="rofl" />,
  });

  test('Renders without error', () => {
    const wrapper = shallow(<Select {...createProps()} />);

    expect(wrapper).toMatchSnapshot();
  });
});