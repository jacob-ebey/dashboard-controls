import React from 'react';
import { storiesOf } from '@storybook/react';

import Loader from './index';

storiesOf('Loader', module)
  .add('default', () => (
    <Loader />
  ))
  .add('error', () => (
    <Loader error="ROFLing error" />
  ));
