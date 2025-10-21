import { type ReactNode, useCallback, useMemo, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  type DatePickerProps,
  Flex,
  Input,
  type InputProps,
  Row,
  Select,
  type SelectProps,
} from "antd";
import type {
  ColumnDropDownType,
  EnhanceTableDataType,
  EnhanceTableHeaderProps,
  EnhanceTableHeaderType,
} from "@/data";
import type { RangePickerProps } from "antd/es/date-picker";

export const EnhanceTableSearchDropdown: ColumnDropDownType = ({
  setSelectedKeys,
  confirm,
}) => {
  const inputChange = useCallback<Required<InputProps>["onChange"]>(
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
    useState<DatePickerProps["picker"]>("time");
  const selectChange = useCallback<Required<SelectProps>["onChange"]>(
    (value) => {
      setPickerTypeState(value);
    },
    [],
  );
  const rangeChange = useCallback<Required<RangePickerProps>["onChange"]>(
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
          start: "startInput",
          end: "endInput",
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
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>({
  actions,
}: EnhanceTableHeaderProps<Key, Value, T>): ReactNode => {
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
  return <Row gutter={10}>{renderActions}</Row>;
};
