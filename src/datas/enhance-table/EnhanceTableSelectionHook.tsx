import type { TableProps } from 'antd';
import type { TableRowSelection } from 'antd/es/table/interface';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import type {
  EnhanceTableSelectionHookState,
  EnhanceTableSelectionHookType,
  EnhanceTableSelectionProps,
} from '@/datas/enhance-table/index';

export const useEnhanceTableSelectionHook: EnhanceTableSelectionHookType = <
  T extends { [K in keyof T]: unknown },
>(
  rowKey: keyof T,
  selection: EnhanceTableSelectionProps<T> | undefined,
  config: TableProps<T>['rowSelection'],
  selectedData: T[],
  setSelectedData: Dispatch<SetStateAction<T[]>>,
): EnhanceTableSelectionHookState<T> => {
  const selectionChange = useCallback<
    Required<TableRowSelection<T>>['onChange']
  >(
    (_selectedRowKeys, selectedRows) => {
      setSelectedData(selectedRows);
    },
    [setSelectedData],
  );
  const selectedKeys = useMemo(() => {
    return selectedData.map((item) => item[rowKey]);
  }, [selectedData, rowKey]);
  const rowSelection = useMemo<TableProps<T>['rowSelection']>(() => {
    if (selection && selection.show) {
      return {
        ...selection.config,
        selectedRowKeys: selectedKeys,
        onChange: selectionChange,
        ...config,
      } as TableRowSelection<T>;
    } else {
      return undefined;
    }
  }, [config, selectedKeys, selection, selectionChange]);
  return {
    rowSelection,
  };
};
