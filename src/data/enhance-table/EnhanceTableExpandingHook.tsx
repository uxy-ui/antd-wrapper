import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useMemo,
} from "react";
import { type TableProps, Tooltip } from "antd";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import type {
  EnhanceTableDataType,
  EnhanceTableExpandingHookState,
  EnhanceTableExpandingHookType,
  EnhanceTableExpandingProps,
} from "@/data";

export const useEnhanceTableExpandingHook: EnhanceTableExpandingHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  expanding: EnhanceTableExpandingProps<Key, Value, T> | undefined,
  config: TableProps<T>["expandable"],
  adjustScroll: () => void,
): EnhanceTableExpandingHookState<Key, Value, T> => {
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
  const expandable = useMemo<TableProps["expandable"]>(() => {
    return expanding?.render
      ? {
          ...expanding.config,
          expandedRowRender,
          expandIcon: ({ expanded, onExpand, record }) => (
            <Tooltip title={"点击展开/折叠"}>
              <span onClick={handleExpand(expanded, onExpand, record)}>
                {expanded ? <DownOutlined /> : <RightOutlined />}
              </span>
            </Tooltip>
          ),
          ...config,
        }
      : undefined;
  }, [
    config,
    expandedRowRender,
    expanding?.config,
    expanding?.render,
    handleExpand,
  ]);

  return {
    expandable,
  };
};
