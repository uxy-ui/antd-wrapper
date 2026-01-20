import {
  type EnhanceTableProps,
  useEnhanceTableColumnHook,
  useEnhanceTableDataHook,
  useEnhanceTableExpandingHook,
  useEnhanceTableHeaderHook,
  useEnhanceTableLayoutHook,
  useEnhanceTablePaginationHook,
  useEnhanceTableSelectionHook,
} from '@/datas/enhance-table/index';

export const useEnhanceTableHook = <T extends { [K in keyof T]: unknown }>(
  props: EnhanceTableProps<T>,
) => {
  const {
    onTableChange,
    showTotal,
    data,
    filteredData,
    selectedData,
    setSelectedData,
  } = useEnhanceTableDataHook<T>(props.data);
  const { ref, scroll, adjustScroll } = useEnhanceTableLayoutHook();
  const { title } = useEnhanceTableHeaderHook<T>(
    props.actions,
    data,
    filteredData,
    selectedData,
    setSelectedData,
  );
  const { columns } = useEnhanceTableColumnHook<T>(
    props.columns,
    props.config?.columns,
    data,
  );
  const { expandable } = useEnhanceTableExpandingHook<T>(
    props.expanding,
    props.config?.expandable,
    adjustScroll,
  );
  const { rowSelection } = useEnhanceTableSelectionHook<T>(
    props.rowKey,
    props.selection,
    props.config?.rowSelection,
    selectedData,
    setSelectedData,
  );
  const { pagination } = useEnhanceTablePaginationHook(
    props.pagination,
    props.config?.pagination,
    adjustScroll,
    showTotal,
  );
  return {
    ref,
    scroll,
    onTableChange,
    title,
    columns,
    expandable,
    rowSelection,
    pagination,
  };
};
