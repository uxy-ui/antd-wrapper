import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { type TableProps, Tooltip } from 'antd';
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useMemo,
} from 'react';
import type {
  EnhanceTableExpandingHookState,
  EnhanceTableExpandingHookType,
  EnhanceTableExpandingProps,
} from '@/datas/enhance-table/index';

export const useEnhanceTableExpandingHook: EnhanceTableExpandingHookType = <
  T extends { [K in keyof T]: unknown },
>(
  expanding: EnhanceTableExpandingProps<T> | undefined,
  config: TableProps<T>['expandable'],
  adjustScroll: () => void,
): EnhanceTableExpandingHookState<T> => {
  const expandedRowRender = useCallback(
    (record: T) => {
      return <>{expanding?.render?.(record)}</>;
    },
    [expanding],
  );
  const handleExpand = useCallback(
    (
      _expanded: boolean,
      onExpand: (record: T, event: ReactMouseEvent<HTMLSpanElement>) => void,
      record: T,
    ) =>
      (e: ReactMouseEvent<HTMLSpanElement>) => {
        onExpand(record, e);
        adjustScroll();
      },
    [adjustScroll],
  );
  const expandIcon = useCallback(
    ({
      expanded,
      onExpand,
      record,
    }: {
      expanded: boolean;
      onExpand: (record: T, event: ReactMouseEvent<HTMLSpanElement>) => void;
      record: T;
    }) => (
      <Tooltip title={'点击展开/折叠'}>
        <span onClick={handleExpand(expanded, onExpand, record)}>
          {expanded ? <DownOutlined /> : <RightOutlined />}
        </span>
      </Tooltip>
    ),
    [handleExpand],
  );
  const expandable = useMemo<TableProps['expandable']>(() => {
    if (expanding && expanding.render) {
      return {
        ...expanding.config,
        expandedRowRender,
        expandIcon,
        ...config,
      };
    } else {
      return undefined;
    }
  }, [config, expandIcon, expandedRowRender, expanding]);

  return {
    expandable,
  };
};
