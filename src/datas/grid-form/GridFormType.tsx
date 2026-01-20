import type {
  AutoCompleteProps,
  ButtonProps,
  CascaderProps,
  CheckboxProps,
  ColorPickerProps,
  DatePickerProps,
  FormItemProps,
  FormProps,
  InputNumberProps,
  InputProps,
  MentionProps,
  RadioProps,
  RateProps,
  SelectProps,
  SwitchProps,
  TimePickerProps,
  TransferProps,
  TreeSelectProps,
  UploadProps,
} from 'antd';
import type { ReactNode } from 'react';

export type GridFormDataType<Key extends string, Value> = {
  [key in Key]: Value;
};

export interface GridFormItemProps<
  Key extends string,
  Value,
  T extends GridFormDataType<Key, Value>,
> {
  row: number;
  col: number;
  span: number;
  tooltip?: string;
  config?: FormItemProps<Key>;
  type:
    | 'auto-complete'
    | 'cascader'
    | 'checkbox'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'mentions'
    | 'radio'
    | 'rate'
    | 'select'
    | 'switch'
    | 'time-picker'
    | 'transfer'
    | 'tree-select'
    | 'upload';
  props?:
    | AutoCompleteProps
    | CascaderProps
    | CheckboxProps
    | ColorPickerProps
    | DatePickerProps
    | InputProps
    | InputNumberProps
    | MentionProps
    | RadioProps
    | RateProps
    | SelectProps
    | SwitchProps
    | TimePickerProps
    | TransferProps
    | TreeSelectProps
    | (UploadProps & {
        buttonText?: string;
        buttonProps?: Omit<ButtonProps, 'icon'> & { icon?: string };
      });
  data?: T;
  children?: ReactNode;
}
export interface GridFormAction<
  Key extends string,
  Value,
  T extends GridFormDataType<Key, Value>,
> {
  label?: string;
  props?: ButtonProps;
  validated?: boolean;
  onAction?: (data?: T) => void;
}
export interface GridFormProps<
  Key extends string,
  Value,
  T extends GridFormDataType<Key, Value>,
> {
  items: GridFormItemProps<Key, Value, T>[];
  value?: T;
  actions?: GridFormAction<Key, Value, T>[];
  config?: FormProps;
}

export interface GridFormHookState<
  Key extends string,
  Value,
  T extends GridFormDataType<Key, Value>,
> {
  form: FormProps['form'];
  layout: ReactNode;
  initial?: T;
}

export type GridFormHookType = <
  Key extends string,
  Value,
  T extends GridFormDataType<Key, Value>,
>(
  props: GridFormProps<Key, Value, T>,
) => GridFormHookState<Key, Value, T>;
