import { useMemo } from "react";
import type { TableColumnType, TableProps } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type {
  EnhanceTableColumnHookType,
  EnhanceTableColumnType,
  EnhanceTableDataType,
} from "@/data";
import { EnhanceTableDateDropdown, EnhanceTableSearchDropdown } from "@/data";

export const useEnhanceTableColumnHook: EnhanceTableColumnHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  columns: EnhanceTableColumnType<Key, Value, T>[],
  config: TableProps<T>["columns"],
) => {
  const { columnFilterDropdown, columnFilter, columnSorter } = useMemo(() => {
    const columnFilterDropdown = (
      column: EnhanceTableColumnType<Key, Value, T>,
    ) => {
      const FilterComponent = (filterProps: FilterDropdownProps) => {
        if (column.filterType === "date") {
          return <EnhanceTableDateDropdown {...filterProps} />;
        } else {
          return <EnhanceTableSearchDropdown {...filterProps} />;
        }
      };

      FilterComponent.displayName = `Filter${column.filterType === "date" ? "Date" : "Search"}Dropdown`;
      return FilterComponent;
    };

    const columnFilter = (column: EnhanceTableColumnType<Key, Value, T>) => {
      return (value: string, record: T) => {
        const columnValue = record[column.dataIndex];
        if (column.filterType === "date") {
          let columnValueStringify = "";
          if (columnValue !== undefined && columnValue !== null) {
            columnValueStringify = columnValue.toString();
          }
          const date = new Date(value);
          const recordDate = new Date(columnValueStringify);
          return recordDate.getTime() === date.getTime();
        } else {
          let columnValueStringify = "";
          if (columnValue !== undefined && columnValue !== null) {
            columnValueStringify = columnValue.toString();
          }
          return columnValueStringify
            .toLowerCase()
            .includes(value.toLowerCase());
        }
      };
    };

    const columnSorter = (column: EnhanceTableColumnType<Key, Value, T>) => {
      return (a: T, b: T) => {
        const columnValueA = a[column.dataIndex];
        const columnValueB = b[column.dataIndex];
        let columnValueAStringify = "";
        let columnValueBStringify = "";
        if (columnValueA !== undefined && columnValueA !== null) {
          columnValueAStringify = columnValueA.toString();
        }
        if (columnValueB !== undefined && columnValueB !== null) {
          columnValueBStringify = columnValueB.toString();
        }
        if (column.filterType === "date") {
          const dateA = new Date(columnValueAStringify);
          const dateB = new Date(columnValueBStringify);
          return dateA.getTime() - dateB.getTime();
        } else {
          return columnValueAStringify.localeCompare(columnValueBStringify);
        }
      };
    };
    return {
      columnFilterDropdown,
      columnFilter,
      columnSorter,
    };
  }, []);
  const enhanceColumns = useMemo<TableColumnType[]>(() => {
    const configColumnMap = config?.reduce(
      (acc, column) => {
        if ("dataIndex" in column) {
          acc[column.dataIndex as string] = column;
        }
        return acc;
      },
      {} as Record<string, TableColumnType<T>>,
    );
    return columns.map((column) => {
      const customColumn = {
        ellipsis: true,
        ...column,
        filterDropdown: columnFilterDropdown(column),
        onFilter: columnFilter(column),
        sorter: columnSorter(column),
      } as TableColumnType<T>;
      if (configColumnMap && column.dataIndex) {
        const configColumn = configColumnMap[column.dataIndex as string];
        if (configColumn) {
          return {
            ...customColumn,
            ...configColumn,
          } as TableColumnType<T>;
        }
      }
      return customColumn;
    });
  }, [columnFilter, columnFilterDropdown, columnSorter, columns, config]);
  return {
    columns: enhanceColumns,
  };
};
