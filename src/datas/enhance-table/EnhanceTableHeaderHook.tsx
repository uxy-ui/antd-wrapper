import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type {
  EnhanceTableAction,
  EnhanceTableHeaderHookState,
  EnhanceTableHeaderHookType,
} from '@/datas/enhance-table/index';
import { EnhanceTableHeader } from '@/datas/enhance-table/index';

export const useEnhanceTableHeaderHook: EnhanceTableHeaderHookType = <
  T extends { [K in keyof T]: unknown },
>(
  actions: EnhanceTableAction<T>[] | undefined,
  data: T[],
  filteredData: T[],
  selectedData: T[],
  setSelectedData: Dispatch<SetStateAction<T[]>>,
): EnhanceTableHeaderHookState => {
  const dataRef = useRef({ data, filteredData, selectedData });
  useEffect(() => {
    dataRef.current = { data, filteredData, selectedData };
  }, [data, filteredData, selectedData]);
  const injectedDataCallback = useCallback(
    (
      callback: (total?: T[], filtered?: T[], selected?: T[]) => void,
      resetSelected?: boolean,
    ) =>
      () => {
        const { data, filteredData, selectedData } = dataRef.current;
        callback(data, filteredData, selectedData);
        if (resetSelected) {
          setSelectedData([]);
        }
      },
    [setSelectedData],
  );
  const injectedActions = useMemo(
    () =>
      actions?.map(
        (action) =>
          ({
            ...action,
            onAction: action.onAction
              ? injectedDataCallback(action.onAction, action.resetSelected)
              : undefined,
          }) as EnhanceTableAction<T>,
      ),
    [actions, injectedDataCallback],
  );
  const title = useCallback(
    () => <EnhanceTableHeader<T> actions={injectedActions} />,
    [injectedActions],
  );
  return {
    title,
  };
};
