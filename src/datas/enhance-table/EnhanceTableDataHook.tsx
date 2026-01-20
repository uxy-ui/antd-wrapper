import type { TableProps } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import type {
  EnhanceTableDataHookState,
  EnhanceTableDataHookType,
} from '@/datas/enhance-table/index';

export const useEnhanceTableDataHook: EnhanceTableDataHookType = <
  T extends { [K in keyof T]: unknown },
>(
  data: T[],
): EnhanceTableDataHookState<T> => {
  const [dataState, setDataState] = useState<T[]>(data);
  const [filteredState, setFilteredState] = useState<T[]>([]);
  const [selectedState, setSelectedState] = useState<T[]>([]);

  const handleTableChange = useCallback<Required<TableProps<T>>['onChange']>(
    (_pagination, _filters, _sorter, extra) => {
      const { currentDataSource, action } = extra;
      if (action === 'filter') {
        setFilteredState(currentDataSource);
      }
    },
    [],
  );
  const showTotal = useCallback(
    () =>
      `当前 ${filteredState.length > 0 ? filteredState.length : dataState.length} 条记录，已筛选过滤 ${filteredState.length > 0 ? dataState.length - filteredState.length : 0} 条记录，共 ${dataState.length} 条记录`,
    [dataState.length, filteredState.length],
  );

  useEffect(() => {
    setDataState(data);
  }, [data]);
  return {
    onTableChange: handleTableChange,
    showTotal,
    data: dataState,
    filteredData: filteredState,
    setFilteredData: setFilteredState,
    selectedData: selectedState,
    setSelectedData: setSelectedState,
  };
};
