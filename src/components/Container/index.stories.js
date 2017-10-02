import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from './index';

storiesOf('Container', module)
  .add('default', () => (
    <Container style={{ backgroundColor: 'pink' }}>
      <h1>Hello</h1>
    </Container>
  ));
