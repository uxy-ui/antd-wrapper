import { useCallback, useMemo } from "react";
import { type TableProps } from "antd";
import type {
  EnhanceTableDataType,
  EnhanceTablePaginationHookState,
  EnhanceTablePaginationHookType,
  EnhanceTablePaginationProps,
} from "@/data";

export const useEnhanceTablePaginationHook: EnhanceTablePaginationHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  pagination: EnhanceTablePaginationProps<Key, Value, T> | undefined,
  config: TableProps<T>["pagination"],
  adjustScroll: () => void,
  showTotal: () => string,
): EnhanceTablePaginationHookState<Key, Value, T> => {
  const handleShowSizeChange = useCallback(() => {
    adjustScroll();
  }, [adjustScroll]);
  const enhancePagination = useMemo<TableProps<T>["pagination"]>(() => {
    return {
      pageSizeOptions: ["10", "20", "50", "100"],
      defaultPageSize: 10,
      showSizeChanger: true,
      ...pagination?.config,
      showTotal,
      onShowSizeChange: handleShowSizeChange,
      ...config,
    };
  }, [config, handleShowSizeChange, pagination?.config, showTotal]);
  return {
    pagination: enhancePagination,
  };
};
