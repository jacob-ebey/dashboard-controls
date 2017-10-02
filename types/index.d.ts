declare module 'time-picker' {
  import * as React from 'react';

  export class Button extends React.Component<React.ButtonHTMLAttributes<Button>, any> { }

  export class Container extends React.Component<React.HTMLAttributes<Container>, any> { }

  export interface GridColumn {
    key: number | string;
    property: string;
    label?: string;
  }

  export interface GridProps extends React.HTMLAttributes<Container> {
    columns: GridColumn[];
    rowKeyProperty: string;
    items?: any[];
    onRowClicked?: (item: any) => void;
  }

  export class Grid extends React.Component<GridProps, any> { }

  export class Input extends React.Component<React.InputHTMLAttributes<Input>, any> { }

  export interface LoaderProps extends React.HtmlHTMLAttributes<Loader> {
    error?: string;
  }

  export class Loader extends React.Component<LoaderProps, any> { }

  export class Select extends React.Component<React.SelectHTMLAttributes<Select>, any> { }

  export type TimeValue = number | string | Date;

  export interface TimePickerProps {
    value?: TimeValue;
    onChange?: (date: Date) => void;
  }

  export class TimePicker extends React.Component<TimePickerProps, any> { }
}
