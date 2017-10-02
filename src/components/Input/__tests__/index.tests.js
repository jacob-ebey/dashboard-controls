import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Input from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('components/Input - index.js', () => {
  test('Renders without error', () => {
    const wrapper = shallow(<Input />);

    expect(wrapper).toMatchSnapshot();
  });
});