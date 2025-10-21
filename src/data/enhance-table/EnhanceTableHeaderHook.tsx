import { useCallback, useEffect, useMemo, useRef } from "react";
import type {
  EnhanceTableAction,
  EnhanceTableDataType,
  EnhanceTableHeaderHookState,
  EnhanceTableHeaderHookType,
} from "@/data";
import { EnhanceTableHeader } from "@/data";

export const useEnhanceTableHeaderHook: EnhanceTableHeaderHookType = <
  Key extends string,
  Value,
  T extends EnhanceTableDataType<Key, Value>,
>(
  actions: EnhanceTableAction<Key, Value, T>[] | undefined,
  data: T[],
  filteredData: T[],
  selectedData: T[],
): EnhanceTableHeaderHookState<Key, Value, T> => {
  const dataRef = useRef({ data, filteredData, selectedData });
  useEffect(() => {
    dataRef.current = { data, filteredData, selectedData };
  }, [data, filteredData, selectedData]);
  const injectedDataCallback = useCallback(
    (callback: (total?: T[], filtered?: T[], selected?: T[]) => void) => () => {
      const { data, filteredData, selectedData } = dataRef.current;
      callback(data, filteredData, selectedData);
    },
    [],
  );
  const injectedActions = useMemo(
    () =>
      actions?.map(
        (action) =>
          ({
            ...action,
            onAction: action.onAction
              ? injectedDataCallback(action.onAction)
              : undefined,
          }) as EnhanceTableAction<Key, Value, T>,
      ),
    [actions, injectedDataCallback],
  );
  const title = useCallback(
    () => <EnhanceTableHeader<Key, Value, T> actions={injectedActions} />,
    [injectedActions],
  );
  return {
    title,
  };
};
