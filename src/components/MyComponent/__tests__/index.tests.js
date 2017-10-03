import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MyComponent from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('components/MyComponent - index.js', () => {
  const createProps = () => ({
    children: 'Hello, World',
  });

  test('Renders without error', () => {
    const props = createProps();

    const wrapper = shallow(<MyComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});