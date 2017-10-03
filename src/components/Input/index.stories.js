import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from './index';

import { action } from '@storybook/addon-actions';

storiesOf('Input', module)
  .add('default', () => (
    <Input onChange={action('Input: onChange')} />
  ));
