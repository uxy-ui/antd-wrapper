import type { TableColumnType, TableProps } from 'antd';
import { useMemo, useState } from 'react';
import {
  type EnhanceTableColumnHookType,
  type EnhanceTableColumnType,
  SearchableCheckboxList,
} from '@/datas/enhance-table/index';

export const useEnhanceTableColumnHook: EnhanceTableColumnHookType = <
  T extends { [K in keyof T]: unknown },
>(
  columns: EnhanceTableColumnType<T>[],
  _config: TableProps<T>['columns'],
  data: T[],
) => {
  const [extraFilterColumnsState, setExtraFilterColumnsState] = useState<
    Map<string, TableColumnType<T>>
  >(new Map());
  const columnOptionsMap = useMemo<
    Map<string, { text: string; value: string }[]>
  >(() => {
    const columnToValues = new Map<string, Set<string>>();
    data.forEach((record) => {
      Object.entries(record).forEach(([columnName, columnValue]) => {
        if (columnValue !== undefined && columnValue !== null) {
          const columnValueStringify = columnValue.toString();
          if (!columnToValues.has(columnName)) {
            columnToValues.set(columnName, new Set());
          }
          columnToValues.get(columnName)?.add(columnValueStringify);
        }
      });
    });
    const filtersMap = new Map<string, { text: string; value: string }[]>();
    Array.from(columnToValues.keys()).forEach((columnName) => {
      const columnValues = columnToValues.get(columnName);
      if (columnValues) {
        filtersMap.set(
          columnName,
          Array.from(columnValues).map((value) => ({
            text: value,
            value,
          })),
        );
      }
    });
    return filtersMap;
  }, [data]);

  const enhanceColumns = useMemo<TableColumnType[]>(() => {
    const baseColumns = columns.map((column) => {
      let customColumn: TableColumnType<T> = {
        ellipsis: true,
        showSorterTooltip: { target: 'sorter-icon' },
        sorter: (a: T, b: T) => {
          const columnValueA = a[column.config.dataIndex as keyof T];
          const columnValueB = b[column.config.dataIndex as keyof T];
          let columnValueAStringify = '';
          let columnValueBStringify = '';
          if (columnValueA !== undefined && columnValueA !== null) {
            columnValueAStringify = columnValueA.toString();
          }
          if (columnValueB !== undefined && columnValueB !== null) {
            columnValueBStringify = columnValueB.toString();
          }
          if (column.filterType === 'date') {
            const dateA = new Date(columnValueAStringify);
            const dateB = new Date(columnValueBStringify);
            return dateA.getTime() - dateB.getTime();
          } else {
            return columnValueAStringify.localeCompare(columnValueBStringify);
          }
        },
      };
      const filters = columnOptionsMap.get(column.config.dataIndex as string);
      if (filters) {
        customColumn = {
          ...customColumn,
          onFilter: (value, record) => {
            return record[column.config.dataIndex as keyof T] === value;
          },
          filterDropdown: (props) => (
            <SearchableCheckboxList options={filters} {...props} />
          ),
        };
      }
      customColumn = {
        ...customColumn,
        ...column.config,
      };
      return customColumn;
    });
    return [...baseColumns, ...Array.from(extraFilterColumnsState.values())];
  }, [columnOptionsMap, columns, extraFilterColumnsState]);
  return {
    columns: enhanceColumns,
    setFilterColumns: setExtraFilterColumnsState,
  };
};
