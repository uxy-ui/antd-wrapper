import {
  type EnhanceTableDataType,
  type EnhanceTableProps,
  useEnhanceTableColumnHook,
  useEnhanceTableDataHook,
  useEnhanceTableExpandingHook,
  useEnhanceTableHeaderHook,
  useEnhanceTableLayoutHook,
  useEnhanceTablePaginationHook,
  useEnhanceTableSelectionHook,
} from "@/data";

export const useEnhanceTableHook = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  props: EnhanceTableProps<Key, Value, T>,
) => {
  const {
    onTableChange,
    showTotal,
    data,
    filteredData,
    selectedData,
    setSelectedData,
  } = useEnhanceTableDataHook<Key, Value, T>(props.data);
  const { ref, scroll, adjustScroll } = useEnhanceTableLayoutHook<
    Key,
    Value,
    T
  >();
  const { title } = useEnhanceTableHeaderHook<Key, Value, T>(
    props.actions,
    data,
    filteredData,
    selectedData,
  );
  const { columns } = useEnhanceTableColumnHook<Key, Value, T>(
    props.columns,
    props.config?.columns,
  );
  const { expandable } = useEnhanceTableExpandingHook<Key, Value, T>(
    props.expanding,
    props.config?.expandable,
    adjustScroll,
  );
  const { rowSelection } = useEnhanceTableSelectionHook<Key, Value, T>(
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
