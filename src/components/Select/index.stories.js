import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Select from './index';

storiesOf('Select', module)
  .add('default', () => (
    <Select onChange={action('Select: onChange')}>
      <option value="lol">LOL</option>
      <option value="rofl">ROFL</option>
    </Select>
  ));
