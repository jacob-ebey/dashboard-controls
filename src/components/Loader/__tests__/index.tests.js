import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loader from '../index';

Enzyme.configure({ adapter: new Adapter() });

describe('components/Button - index.js', () => {
  const createProps = () => ({
    message: 'ROFLing',
  });

  test('Renders without error', () => {
    const props = createProps();

    const wrapper = shallow(<Loader {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('Renders with error', () => {
    const props = {
      ...createProps(),
      error: 'ROFLing error',
    };

    const wrapper = shallow(<Loader {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});