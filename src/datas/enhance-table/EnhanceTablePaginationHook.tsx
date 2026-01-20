import type { TableProps } from 'antd';
import { useCallback, useMemo } from 'react';
import type {
  EnhanceTablePaginationHookState,
  EnhanceTablePaginationHookType,
  EnhanceTablePaginationProps,
} from '@/datas/enhance-table/index';

export const useEnhanceTablePaginationHook: EnhanceTablePaginationHookType = <
  T extends { [K in keyof T]: unknown },
>(
  pagination: EnhanceTablePaginationProps<T> | undefined,
  config: TableProps<T>['pagination'],
  adjustScroll: () => void,
  showTotal: () => string,
): EnhanceTablePaginationHookState<T> => {
  const handleShowSizeChange = useCallback(() => {
    adjustScroll();
  }, [adjustScroll]);
  const enhancePagination = useMemo<TableProps<T>['pagination']>(() => {
    return {
      pageSizeOptions: ['10', '20', '50', '100'],
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
