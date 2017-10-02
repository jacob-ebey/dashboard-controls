import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from './index';

storiesOf('Select', module)
  .add('default', () => (
    <Select>
      <option value="lol">LOL</option>
      <option value="rofl">ROFL</option>
    </Select>
  ));
