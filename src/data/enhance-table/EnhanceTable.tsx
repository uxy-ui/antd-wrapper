import { Table } from "antd";
import {
  type EnhanceTableDataType,
  type EnhanceTableProps,
  useEnhanceTableHook,
} from "@/data";

export const EnhanceTable = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  props: EnhanceTableProps<Key, Value, T>,
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
        width: "100%",
        height: "100%",
        overflow: "hidden",
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
      />
    </div>
  );
};
/*
* Array.from({ length: 500 }).map((_, i) => ({
          key: i,
          name: "李四",
          age: 18,
          sex: "男",
          phone: "12345678901",
          email: "12345678901@qq.com",
          address: "北京",
          createdAt: "2021-01-01",
          updatedAt: "2021-01-01",
        }))*/
/*
*
* [
          {
            title: "姓名",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "年龄",
            dataIndex: "age",
            key: "age",
          },
          {
            title: "性别",
            dataIndex: "sex",
            key: "sex",
          },
          {
            title: "手机号",
            dataIndex: "phone",
            key: "phone",
          },
          {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "地址",
            dataIndex: "address",
            key: "address",
          },
          {
            title: "创建时间",
            dataIndex: "createdAt",
            key: "createdAt",
          },
          {
            title: "更新时间",
            dataIndex: "updatedAt",
            key: "updatedAt",
          },
        ]*/
