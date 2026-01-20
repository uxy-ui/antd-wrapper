import { useCallback, useEffect, useRef, useState } from 'react';
import type { EnhanceTableLayoutHookType } from '@/datas/enhance-table/index';

export const useEnhanceTableLayoutHook: EnhanceTableLayoutHookType = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<{
    x?: number | string;
    y?: number | string;
  }>({
    x: '100%',
  });

  // const resizeObserverRef = useRef<ResizeObserver | null>(null);
  //
  const layoutObserverRef = useRef<MutationObserver | null>(null);

  const adjustScroll = useCallback(() => {
    const container = containerRef.current;

    if (container) {
      const { width, height } = container.getBoundingClientRect();
      const x = width;
      let y = height;
      const title = container.querySelector(
        'div.ant-table > div.ant-table-title',
      );

      if (title) {
        y -= totalHeight(title);
      }
      const header = container.querySelector(
        'div.ant-table > div.ant-table-container > div > table > thead.ant-table-thead',
      );
      if (header) {
        y -= totalHeight(header);
      }
      const pagination = container.querySelector(
        'ul.ant-pagination.ant-table-pagination',
      );
      if (pagination) {
        y -= totalHeight(pagination);
      }
      const tbody = container.querySelector(
        'div.ant-table > div.ant-table-container > div > table > tbody.ant-table-tbody',
      );

      setScrollState((prev) => {
        const newScroll = { ...prev };
        if (tbody && y < tbody.getBoundingClientRect().height) {
          newScroll.y = y;
        } else {
          delete newScroll.y;
        }
        if (tbody && x < tbody.getBoundingClientRect().width) {
          newScroll.x =
            typeof newScroll.x === 'number'
              ? x
              : newScroll.x === '100%'
                ? 'max-content'
                : newScroll.x;
        } else {
          newScroll.x = 'max-content';
        }
        return newScroll;
      });
    }
  }, []);

  // const handleContainerResize = useCallback(() => {
  //   adjustScroll();
  // }, [adjustScroll]);

  const handleContainerLayout = useCallback(
    (mutations: MutationRecord[]) => {
      let shouldAdjust = false;
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          (mutation.target as HTMLElement).classList &&
          ((mutation.target as HTMLElement).classList.contains(
            'ant-table-row-expanded',
          ) ||
            (mutation.target as HTMLElement).classList.contains(
              'ant-table-row-collapsed',
            ) ||
            (mutation.target as HTMLElement).classList.contains(
              'ant-pagination',
            ))
        ) {
          shouldAdjust = true;
          break;
        }

        if (
          mutation.type === 'childList' &&
          mutation.target instanceof Element &&
          mutation.target.closest('.ant-table-tbody')
        ) {
          shouldAdjust = true;
          break;
        }
      }

      if (shouldAdjust) {
        requestAnimationFrame(() => {
          adjustScroll();
        });
      }
    },
    [adjustScroll],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      layoutObserverRef.current = new MutationObserver(handleContainerLayout);
      layoutObserverRef.current.observe(container, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['class'],
      });
    }
    return () => {
      if (layoutObserverRef.current) {
        layoutObserverRef.current.disconnect();
      }
    };
  }, [containerRef, handleContainerLayout]);

  // const [debouncingContainerResize, cancelDebouncingContainerResize] =
  //   useDebounce(handleContainerResize, 150);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container) {
  //     resizeObserverRef.current = new ResizeObserver(debouncingContainerResize);
  //     resizeObserverRef.current.observe(container);
  //     layoutObserverRef.current = new MutationObserver(handleContainerLayout);
  //     layoutObserverRef.current.observe(container, {
  //       attributes: true,
  //       childList: true,
  //       subtree: true,
  //       attributeFilter: ['class'],
  //     });
  //   }
  //   return () => {
  //     if (resizeObserverRef.current && container) {
  //       resizeObserverRef.current.disconnect();
  //     }
  //     if (layoutObserverRef.current) {
  //       layoutObserverRef.current.disconnect();
  //     }
  //     cancelDebouncingContainerResize();
  //   };
  // }, [
  //   cancelDebouncingContainerResize,
  //   containerRef,
  //   debouncingContainerResize,
  //   handleContainerLayout,
  //   handleContainerResize,
  // ]);
  return {
    ref: containerRef,
    scroll: scrollState,
    adjustScroll,
  };
};
const totalHeight = (root?: HTMLElement | Element) => {
  if (!root) return 0;
  const { height } = root.getBoundingClientRect();
  const { marginTop, marginBottom } = window.getComputedStyle(root);
  return height + parseInt(marginTop) + parseInt(marginBottom);
};
export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  const cancelDebounceFn = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return [debouncedFn, cancelDebounceFn] as const;
};
