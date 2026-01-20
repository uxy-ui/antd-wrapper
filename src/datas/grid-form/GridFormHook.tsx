import type {
  AutoCompleteProps,
  ButtonProps,
  CascaderProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  RateProps,
  SelectProps,
  SwitchProps,
  TimePickerProps,
  TransferProps,
  TreeSelectProps,
  UploadProps,
} from 'antd';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Rate,
  Row,
  Select,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import type {
  GridFormDataType,
  GridFormHookType,
  GridFormItemProps,
  GridFormProps,
} from '@/datas/grid-form/index';

export const useGridFormHook: GridFormHookType = <
  Key extends string,
  Value,
  T extends GridFormDataType<Key, Value>,
>(
  props: GridFormProps<Key, Value, T>,
) => {
  const { items, actions, value } = props;
  const [form] = Form.useForm<T>();
  const formatValue = useMemo<T | undefined>(() => {
    const keys = items
      .filter((item) => ['date-picker'].includes(item.type))
      .map((item) => item.config?.name);
    const formatedValue = {
      ...value,
    } as T;
    for (const key of keys) {
      formatedValue[key as Key] = dayjs(
        value?.[key as Key] as string,
      ) as T[Key];
    }
    return formatedValue;
  }, [items, value]);
  const handleClickAction = useCallback(
    (callback?: (data?: T) => void, validated?: boolean) => {
      return () => {
        if (!callback) {
          return;
        }
        if (validated) {
          form
            .validateFields()
            .then((values) => {
              const keys = items
                .filter((item) => ['date-picker'].includes(item.type))
                .map((item) => item.config?.name);

              const formattedValues = { ...value, ...values };

              for (const key of keys) {
                const value = formattedValues[key as Key] as dayjs.Dayjs;
                formattedValues[key as Key] = value.format() as T[Key];
              }

              callback?.(formattedValues as T);
            })
            .catch((error) => {
              console.log('校验失败:', error);
              message.error(error).then();
            });
        } else {
          callback?.();
        }
      };
    },
    [form, items, value],
  );
  const renderItemInput = useCallback(
    (item: GridFormItemProps<Key, Value, T>) => {
      const { type } = item;

      switch (type) {
        case 'auto-complete': {
          const props = item.props as AutoCompleteProps;

          return (
            <AutoComplete style={{ width: '100%' }} allowClear {...props} />
          );
        }
        case 'cascader': {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const props = item.props as CascaderProps<any, any>;

          return <Cascader style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'checkbox': {
          const props = item.props as CheckboxGroupProps;
          return <Checkbox.Group style={{ width: '100%' }} {...props} />;
        }
        case 'color-picker': {
          const props = item.props as InputProps;
          return <Input style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'date-picker': {
          const props = item.props as DatePickerProps;
          return <DatePicker style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'input': {
          const props = item.props as InputProps;

          return <Input style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'input-number': {
          const props = item.props as InputNumberProps;
          return <InputNumber style={{ width: '100%' }} {...props} />;
        }
        case 'mentions': {
          const props = item.props as InputProps;
          return <Input style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'radio': {
          const props = item.props as RadioProps;
          return <Radio.Group style={{ width: '100%' }} {...props} />;
        }
        case 'rate': {
          const props = item.props as RateProps;
          return <Rate style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'select': {
          const props = item.props as SelectProps;
          return <Select style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'switch': {
          const props = item.props as SwitchProps;
          return <Switch style={{ width: '100%' }} {...props} />;
        }
        case 'time-picker': {
          const props = item.props as TimePickerProps;
          return <TimePicker style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'transfer': {
          const props = item.props as TransferProps;
          return <Transfer style={{ width: '100%' }} {...props} />;
        }
        case 'tree-select': {
          const props = item.props as TreeSelectProps;
          return <TreeSelect style={{ width: '100%' }} allowClear {...props} />;
        }
        case 'upload': {
          const props = item.props as UploadProps & {
            buttonText?: string;
            buttonProps?: ButtonProps;
          };
          return (
            <Upload {...props}>
              <Button {...props.buttonProps}>{props.buttonText}</Button>
            </Upload>
          );
        }
      }
    },
    [],
  );
  const layout = useMemo(() => {
    const gridItems = gridArray<Key, Value, T>(
      items.filter((item) => item.row > 0 && item.col > 0),
    );
    const filteredItems = items.filter(
      (item) => item.row === 0 || item.col === 0,
    );
    return (
      <>
        {filteredItems.map((item, index) => {
          return (
            <Form.Item key={index} {...item.config} hidden>
              {renderItemInput(item)}
            </Form.Item>
          );
        })}
        {gridItems.map((row, rowIndex) => {
          return (
            <Row key={rowIndex} gutter={10}>
              {row.map((item, colIndex) => {
                return (
                  <Col key={colIndex} span={item.span}>
                    <Form.Item {...item.config}>
                      {renderItemInput(item)}
                    </Form.Item>
                  </Col>
                );
              })}
            </Row>
          );
        })}
        <Flex justify="center" align="center" gap="10px">
          {actions?.map((action) => {
            return (
              <Button
                key={action.label}
                {...action.props}
                onClick={handleClickAction(action.onAction, action.validated)}
              >
                {action.label}
              </Button>
            );
          })}
        </Flex>
      </>
    );
  }, [actions, handleClickAction, items, renderItemInput]);
  return {
    form,
    layout,
    initial: formatValue,
  };
};
const gridArray = <
  Key extends string,
  Value,
  T extends GridFormDataType<Key, Value>,
>(
  array: GridFormItemProps<Key, Value, T>[],
): GridFormItemProps<Key, Value, T>[][] => {
  const result: GridFormItemProps<Key, Value, T>[][] = [];

  for (const item of array) {
    if (item.row === 0 || item.col === 0) {
      continue;
    }

    if (item.row >= 1 && item.col >= 1) {
      const rowIndex = item.row - 1;
      const colIndex = item.col - 1;

      if (!result[rowIndex]) {
        result[rowIndex] = [];
      }
      result[rowIndex][colIndex] = item;
    }
  }

  return result
    .filter((row) => row && row.length > 0)
    .map((row) => row.filter((item) => item !== undefined));
};
