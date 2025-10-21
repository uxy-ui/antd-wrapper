import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { type TableProps } from "antd";
import { type TableRowSelection } from "antd/es/table/interface";
import {
  type EnhanceTableDataType,
  type EnhanceTableSelectionHookState,
  type EnhanceTableSelectionHookType,
  type EnhanceTableSelectionProps,
} from "@/data";

export const useEnhanceTableSelectionHook: EnhanceTableSelectionHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  rowKey: Key,
  selection: EnhanceTableSelectionProps<Key, Value, T> | undefined,
  config: TableProps<T>["rowSelection"],
  selectedData: T[],
  setSelectedData: Dispatch<SetStateAction<T[]>>,
): EnhanceTableSelectionHookState<Key, Value, T> => {
  const selectionChange = useCallback<
    Required<TableRowSelection<T>>["onChange"]
  >(
    (_selectedRowKeys, selectedRows, _info) => {
      setSelectedData(selectedRows);
    },
    [setSelectedData],
  );
  const selectedKeys = useMemo(() => {
    return selectedData.map((item) => item[rowKey]);
  }, [selectedData, rowKey]);
  const rowSelection = useMemo<TableProps<T>["rowSelection"]>(() => {
    return selection?.show
      ? ({
          ...selection.config,
          selectedRowKeys: selectedKeys,
          onChange: selectionChange,
          ...config,
        } as TableRowSelection<T>)
      : undefined;
  }, [
    config,
    selectedKeys,
    selection?.config,
    selection?.show,
    selectionChange,
  ]);
  return {
    rowSelection,
  };
};
