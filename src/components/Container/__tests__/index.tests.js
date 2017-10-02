import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Container from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('components/Container - index.js', () => {
  const createProps = () => ({
    children: <h1>Hello, World</h1>,
  });

  test('Renders without error', () => {
    const props = createProps();

    const wrapper = shallow(<Container {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
