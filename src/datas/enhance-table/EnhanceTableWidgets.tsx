import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  type CheckboxChangeEvent,
  Col,
  DatePicker,
  type DatePickerProps,
  Flex,
  Input,
  type InputProps,
  Row,
  Select,
  type SelectProps,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import VirtualList from 'rc-virtual-list';
import { type ReactNode, useCallback, useMemo, useState } from 'react';
import type {
  ColumnDropDownType,
  EnhanceTableHeaderProps,
  EnhanceTableHeaderType,
} from '@/datas/enhance-table/index';

export const EnhanceTableSearchDropdown: ColumnDropDownType = ({
  setSelectedKeys,
  confirm,
}) => {
  const inputChange = useCallback<Required<InputProps>['onChange']>(
    (event) => {
      setSelectedKeys(event.target.value ? [event.target.value] : []);
    },
    [setSelectedKeys],
  );
  const inputEnter = useCallback(() => {
    confirm();
  }, [confirm]);
  return (
    <Flex>
      <Input onChange={inputChange} onPressEnter={inputEnter} />
    </Flex>
  );
};

const { Option } = Select;
export const EnhanceTableDateDropdown: ColumnDropDownType = ({
  setSelectedKeys,
  confirm,
}) => {
  const [pickerTypeState, setPickerTypeState] =
    useState<DatePickerProps['picker']>('time');
  const selectChange = useCallback<Required<SelectProps>['onChange']>(
    (value) => {
      setPickerTypeState(value);
    },
    [],
  );
  const rangeChange = useCallback<Required<RangePickerProps>['onChange']>(
    (dates) => {
      if (dates && dates[0] && dates[1]) {
        setSelectedKeys([dates[0].toISOString(), dates[1].toISOString()]);
      } else {
        setSelectedKeys([]);
      }
    },
    [setSelectedKeys],
  );
  const inputEnter = useCallback(() => {
    confirm();
  }, [confirm]);
  return (
    <Flex>
      <Select value={pickerTypeState} onChange={selectChange}>
        <Option value="time">秒</Option>
        <Option value="date">日</Option>
        <Option value="week">周</Option>
        <Option value="month">月</Option>
        <Option value="year">年</Option>
      </Select>
      <DatePicker.RangePicker
        picker={pickerTypeState}
        id={{
          start: 'startInput',
          end: 'endInput',
        }}
        onChange={rangeChange}
      />
      <Button type="primary" onClick={inputEnter}>
        筛选
      </Button>
    </Flex>
  );
};
export const EnhanceTableHeader: EnhanceTableHeaderType = <
  T extends { [K in keyof T]: unknown },
>({
  actions,
}: EnhanceTableHeaderProps<T>): ReactNode => {
  const renderActions = useMemo(() => {
    return actions?.map((action) => {
      const { key, offset, span, component, label, props, onAction } = action;
      const handleClick = onAction
        ? () => {
            onAction();
          }
        : undefined;
      return (
        <Col key={key} offset={offset} span={span}>
          {component || (
            <Button {...props} onClick={handleClick}>
              {label}
            </Button>
          )}
        </Col>
      );
    });
  }, [actions]);
  return renderActions && renderActions.length > 0 ? (
    <Row gutter={10}>{renderActions}</Row>
  ) : undefined;
};
export const SearchableCheckboxList: ColumnDropDownType = ({
  setSelectedKeys,
  confirm,
  options,
}) => {
  const [inputValueState, setInputValueState] = useState<string>('');
  const [selectedKeysState, setSelectedKeysState] = useState<string[]>([]);
  const filteredOptions = useMemo(
    () =>
      options?.filter((option) => {
        return option.text.includes(inputValueState);
      }) || [],
    [inputValueState, options],
  );

  const inputChange = useCallback<Required<InputProps>['onChange']>((event) => {
    setInputValueState(event.target.value);
  }, []);
  const checkboxChangeProxy = useCallback(
    (value: string) => (event: CheckboxChangeEvent) => {
      const checked = event.target.checked;
      if (checked) {
        setSelectedKeysState([...selectedKeysState, value]);
      } else {
        setSelectedKeysState(
          selectedKeysState.filter((item) => item !== value),
        );
      }
    },
    [selectedKeysState],
  );
  const resetAllFiltered = useCallback(() => {
    setSelectedKeysState([]);
  }, []);
  const selectAllFiltered = useCallback(() => {
    setSelectedKeysState(filteredOptions.map((item) => item.value));
  }, [filteredOptions]);
  const confirmSelected = useCallback(() => {
    setSelectedKeys(selectedKeysState);
    confirm();
  }, [setSelectedKeys, selectedKeysState, confirm]);
  return (
    <Flex vertical style={{ padding: '8px' }} gap={'5px'}>
      <Input
        prefix={<SearchOutlined />}
        value={inputValueState}
        type="text"
        onChange={inputChange}
      />
      <VirtualList data={filteredOptions} height={256} itemKey="value">
        {(item) => (
          <Checkbox
            checked={selectedKeysState.includes(item.value)}
            key={item.value}
            onChange={checkboxChangeProxy(item.value)}
          >
            {item.text}
          </Checkbox>
        )}
      </VirtualList>
      <Flex justify={'space-between'} align={'center'}>
        <Button variant={'text'} color={'primary'} onClick={resetAllFiltered}>
          取消全选
        </Button>
        <Button variant={'text'} color={'primary'} onClick={selectAllFiltered}>
          全选
        </Button>
        <Button type={'primary'} onClick={confirmSelected}>
          确定
        </Button>
      </Flex>
    </Flex>
  );
};
