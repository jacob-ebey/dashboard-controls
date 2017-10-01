declare module 'time-picker' {
  import * as React from 'react';

  export type TimeValue = number | string | Date;

  export interface TimePickerProps {
    value?: TimeValue;
    onChange?: (date: Date) => void;
  }

  export class TimePicker extends React.Component<TimePickerProps, any> { }
}
