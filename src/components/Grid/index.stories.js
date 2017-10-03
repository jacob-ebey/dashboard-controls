import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Grid from './index';

const createProps = () => ({
  columns: [
    { key: 'name', label: 'Name', property: 'name' },
    { key: 'value', label: 'Value', property: 'value' },
  ],
  rowKeyProperty: 'value',
  items: [
    { name: 'Name 1', value: 'Value 1' },
    { name: 'Name 2', value: 'Value 2' },
  ],
  onRowClicked: action('Grid: rowClicked'),
});

storiesOf('Grid', module)
  .add('default', () => (
    <Grid {...createProps()}/>
  ))
  .add('text-align default', () => (
    <div style={{ textAlign: 'left' }}>
      <Grid {...createProps()}/>
    </div>
  ));
