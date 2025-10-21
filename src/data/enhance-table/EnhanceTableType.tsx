import type { Dispatch, ReactNode, Ref, SetStateAction } from "react";
import type { ButtonProps, TableColumnType, TableProps } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

export type EnhanceTableDataType<Key extends string, Value> = {
  [key in Key]: Value;
};
export interface EnhanceTableAction<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  key: string;
  offset?: number;
  span?: number;
  label?: string;
  props?: ButtonProps;
  component?: ReactNode;
  onAction?: (total?: T[], filtered?: T[], selected?: T[]) => void;
}
export const ENHANCE_TABLE_COLUMN_FILTER_TYPE = ["search", "date"] as const;
export type EnhanceTableColumnFilterType =
  (typeof ENHANCE_TABLE_COLUMN_FILTER_TYPE)[number];
export interface EnhanceTableColumnType<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  dataIndex: Key;
  title?: string;
  ellipsis?: boolean;
  width?: number | string;
  render?: (value: Value, record: T, index: number) => ReactNode;
  filterType?: EnhanceTableColumnFilterType;
}
export interface EnhanceTableExpandingProps<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  render?: (record: T) => ReactNode;
  config?: TableProps<T>["expandable"];
}
export interface EnhanceTableSelectionProps<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  show?: boolean;
  config?: TableProps<T>["rowSelection"];
}
export interface EnhanceTablePaginationProps<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  config?: TableProps<T>["pagination"];
}

export interface EnhanceTableProps<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  rowKey: Key;
  columns: EnhanceTableColumnType<Key, Value, T>[];
  data: T[];
  actions?: EnhanceTableAction<Key, Value, T>[];
  selection?: EnhanceTableSelectionProps<Key, Value, T>;
  expanding?: EnhanceTableExpandingProps<Key, Value, T>;
  pagination?: EnhanceTablePaginationProps<Key, Value, T>;
  config?: TableProps<T>;
}

export type ColumnDropDownType = (props: FilterDropdownProps) => ReactNode;
export interface EnhanceTableHeaderProps<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  actions?: EnhanceTableAction<Key, Value, T>[];
}
export type EnhanceTableHeaderType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  props: EnhanceTableHeaderProps<Key, Value, T>,
) => ReactNode;
export interface EnhanceTableDataHookState<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  onTableChange: TableProps<T>["onChange"];
  showTotal: () => string;
  data: T[];
  filteredData: T[];
  setFilteredData: Dispatch<SetStateAction<T[]>>;
  selectedData: T[];
  setSelectedData: Dispatch<SetStateAction<T[]>>;
}
export type EnhanceTableDataHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  data: T[],
) => EnhanceTableDataHookState<Key, Value, T>;

export interface EnhanceTableLayoutHookState {
  ref: Ref<HTMLDivElement | null>;
  scroll: {
    y?: number | string;
    x?: number | string;
  };
  adjustScroll: () => void;
}
export type EnhanceTableLayoutHookType = <
  Key extends string,
  Value,
  _T extends EnhanceTableDataType<Key, Value>,
>() => EnhanceTableLayoutHookState;
export interface EnhanceTableHeaderHookState<
  Key extends string,
  Value,
  _T extends EnhanceTableDataType<Key, Value>,
> {
  title: () => ReactNode;
}
export type EnhanceTableHeaderHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  actions: EnhanceTableAction<Key, Value, T>[] | undefined,
  data: T[],
  filteredData: T[],
  selectedData: T[],
) => EnhanceTableHeaderHookState<Key, Value, T>;

export interface EnhanceTableColumnHookState<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  columns: TableColumnType<T>[];
}
export type EnhanceTableColumnHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  columns: EnhanceTableColumnType<Key, Value, T>[],
  config: TableProps<T>["columns"],
) => EnhanceTableColumnHookState<Key, Value, T>;

export interface EnhanceTableExpandingHookState<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  expandable: TableProps<T>["expandable"];
}
export type EnhanceTableExpandingHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  expanding: EnhanceTableExpandingProps<Key, Value, T> | undefined,
  config: TableProps<T>["expandable"],
  adjustScroll: () => void,
) => EnhanceTableExpandingHookState<Key, Value, T>;

export interface EnhanceTableSelectionHookState<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  rowSelection: TableProps<T>["rowSelection"];
}
export type EnhanceTableSelectionHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  rowKey: Key,
  selection: EnhanceTableSelectionProps<Key, Value, T> | undefined,
  config: TableProps<T>["rowSelection"],
  selectedData: T[],
  setSelectedData: Dispatch<SetStateAction<T[]>>,
) => EnhanceTableSelectionHookState<Key, Value, T>;

export interface EnhanceTablePaginationHookState<
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
> {
  pagination: TableProps<T>["pagination"];
}
export type EnhanceTablePaginationHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  pagination: EnhanceTablePaginationProps<Key, Value, T> | undefined,
  config: TableProps<T>["pagination"],
  adjustScroll: () => void,
  showTotal: () => string,
) => EnhanceTablePaginationHookState<Key, Value, T>;
