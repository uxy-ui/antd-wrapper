import { Table } from 'antd';
import {
  type EnhanceTableProps,
  useEnhanceTableHook,
} from '@/datas/enhance-table/index';

export const EnhanceTable = <T extends { [K in keyof T]: unknown }>(
  props: EnhanceTableProps<T>,
) => {
  const {
    ref,
    scroll,
    onTableChange,
    title,
    columns,
    rowSelection,
    expandable,
    pagination,
  } = useEnhanceTableHook(props);
  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Table
        rowKey={props.rowKey}
        scroll={scroll}
        columns={columns}
        dataSource={props.data}
        title={title}
        rowSelection={rowSelection}
        expandable={expandable}
        pagination={pagination}
        onChange={onTableChange}
        {...props.config}
      />
    </div>
  );
};
