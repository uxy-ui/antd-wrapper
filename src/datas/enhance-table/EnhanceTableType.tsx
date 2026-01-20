import type { ButtonProps, TableColumnType, TableProps } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import type { Dispatch, ReactNode, Ref, SetStateAction } from 'react';

export interface EnhanceTableAction<T extends { [K in keyof T]: unknown }> {
  key: string;
  offset?: number;
  span?: number;
  label?: string;
  props?: ButtonProps;
  component?: ReactNode;
  onAction?: (total?: T[], filtered?: T[], selected?: T[]) => void;
  resetSelected?: boolean;
}
export const ENHANCE_TABLE_COLUMN_FILTER_TYPE = ['search', 'date'] as const;
export type EnhanceTableColumnFilterType =
  (typeof ENHANCE_TABLE_COLUMN_FILTER_TYPE)[number];
export interface EnhanceTableColumnType<T extends { [K in keyof T]: unknown }> {
  filterType?: EnhanceTableColumnFilterType;
  config: TableColumnType<T>;
}
export interface EnhanceTableExpandingProps<
  T extends { [K in keyof T]: unknown },
> {
  render?: (record: T) => ReactNode;
  config?: TableProps<T>['expandable'];
}
export interface EnhanceTableSelectionProps<
  T extends { [K in keyof T]: unknown },
> {
  show?: boolean;
  config?: TableProps<T>['rowSelection'];
}
export interface EnhanceTablePaginationProps<
  T extends { [K in keyof T]: unknown },
> {
  config?: TableProps<T>['pagination'];
}

export interface EnhanceTableProps<T extends { [K in keyof T]: unknown }> {
  rowKey: keyof T;
  columns: EnhanceTableColumnType<T>[];
  data: T[];
  actions?: EnhanceTableAction<T>[];
  selection?: EnhanceTableSelectionProps<T>;
  expanding?: EnhanceTableExpandingProps<T>;
  pagination?: EnhanceTablePaginationProps<T>;
  config?: TableProps<T>;
}

export type ColumnDropDownType = (
  props: FilterDropdownProps & { options?: { text: string; value: string }[] },
) => ReactNode;
export interface EnhanceTableHeaderProps<
  T extends { [K in keyof T]: unknown },
> {
  actions?: EnhanceTableAction<T>[];
}
export type EnhanceTableHeaderType = <T extends { [K in keyof T]: unknown }>(
  props: EnhanceTableHeaderProps<T>,
) => ReactNode;
export interface EnhanceTableDataHookState<
  T extends { [K in keyof T]: unknown },
> {
  onTableChange: TableProps<T>['onChange'];
  showTotal: () => string;
  data: T[];
  filteredData: T[];
  setFilteredData: Dispatch<SetStateAction<T[]>>;
  selectedData: T[];
  setSelectedData: Dispatch<SetStateAction<T[]>>;
}
export type EnhanceTableDataHookType = <T extends { [K in keyof T]: unknown }>(
  data: T[],
) => EnhanceTableDataHookState<T>;

export interface EnhanceTableLayoutHookState {
  ref: Ref<HTMLDivElement>;
  scroll: {
    y?: number | string;
    x?: number | string;
  };
  adjustScroll: () => void;
}
export type EnhanceTableLayoutHookType = () => EnhanceTableLayoutHookState;
export interface EnhanceTableHeaderHookState {
  title: () => ReactNode;
}
export type EnhanceTableHeaderHookType = <
  T extends { [K in keyof T]: unknown },
>(
  actions: EnhanceTableAction<T>[] | undefined,
  data: T[],
  filteredData: T[],
  selectedData: T[],
  setSelectedData: Dispatch<SetStateAction<T[]>>,
) => EnhanceTableHeaderHookState;

export interface EnhanceTableColumnHookState<
  T extends { [K in keyof T]: unknown },
> {
  columns: TableColumnType<T>[];
  setFilterColumns: Dispatch<SetStateAction<Map<string, TableColumnType<T>>>>;
}
export type EnhanceTableColumnHookType = <
  T extends { [K in keyof T]: unknown },
>(
  columns: EnhanceTableColumnType<T>[],
  config: TableProps<T>['columns'],
  data: T[],
) => EnhanceTableColumnHookState<T>;

export interface EnhanceTableExpandingHookState<
  T extends { [K in keyof T]: unknown },
> {
  expandable: TableProps<T>['expandable'];
}
export type EnhanceTableExpandingHookType = <
  T extends { [K in keyof T]: unknown },
>(
  expanding: EnhanceTableExpandingProps<T> | undefined,
  config: TableProps<T>['expandable'],
  adjustScroll: () => void,
) => EnhanceTableExpandingHookState<T>;

export interface EnhanceTableSelectionHookState<
  T extends { [K in keyof T]: unknown },
> {
  rowSelection: TableProps<T>['rowSelection'];
}
export type EnhanceTableSelectionHookType = <
  T extends { [K in keyof T]: unknown },
>(
  rowKey: keyof T,
  selection: EnhanceTableSelectionProps<T> | undefined,
  config: TableProps<T>['rowSelection'],
  selectedData: T[],
  setSelectedData: Dispatch<SetStateAction<T[]>>,
) => EnhanceTableSelectionHookState<T>;

export interface EnhanceTablePaginationHookState<
  T extends { [K in keyof T]: unknown },
> {
  pagination: TableProps<T>['pagination'];
}
export type EnhanceTablePaginationHookType = <
  T extends { [K in keyof T]: unknown },
>(
  pagination: EnhanceTablePaginationProps<T> | undefined,
  config: TableProps<T>['pagination'],
  adjustScroll: () => void,
  showTotal: () => string,
) => EnhanceTablePaginationHookState<T>;
