import { useCallback, useEffect, useRef, useState } from "react";
import type { EnhanceTableLayoutHookType } from "@/data";

export const useEnhanceTableLayoutHook: EnhanceTableLayoutHookType = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    x: "max-content",
  });

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const layoutObserverRef = useRef<MutationObserver | null>(null);

  const adjustScroll = useCallback(() => {
    const container = containerRef.current;

    if (container) {
      const { height } = container.getBoundingClientRect();
      let y = height;
      const title = container.querySelector(
        "div.ant-table > div.ant-table-title",
      );

      if (title) {
        y -= totalHeight(title);
      }
      const header = container.querySelector(
        "div.ant-table > div.ant-table-container > div > table > thead.ant-table-thead",
      );
      if (header) {
        y -= totalHeight(header);
      }
      const pagination = container.querySelector(
        "ul.ant-pagination.ant-table-pagination",
      );
      if (pagination) {
        y -= totalHeight(pagination);
      }
      const tbody = container.querySelector(
        "div.ant-table > div.ant-table-container > div > table > tbody.ant-table-tbody",
      );

      if (tbody && y < tbody.getBoundingClientRect().height) {
        setScrollState((prevent) => ({ ...prevent, y }));
      } else {
        setScrollState((prevent) => ({ x: prevent.x }));
      }
    }
  }, [containerRef]);

  const handleContainerResize = useCallback(() => {
    adjustScroll();
  }, [adjustScroll]);

  const handleContainerLayout = useCallback(
    (mutations: MutationRecord[]) => {
      let shouldAdjust = false;
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          (mutation.target as HTMLElement).classList &&
          ((mutation.target as HTMLElement).classList.contains(
            "ant-table-row-expanded",
          ) ||
            (mutation.target as HTMLElement).classList.contains(
              "ant-table-row-collapsed",
            ) ||
            (mutation.target as HTMLElement).classList.contains(
              "ant-pagination",
            ))
        ) {
          shouldAdjust = true;
          break;
        }

        if (
          mutation.type === "childList" &&
          mutation.target instanceof Element &&
          mutation.target.closest(".ant-table-tbody")
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
  const [debouncingContainerResize, cancelDebouncingContainerResize] =
    useDebounce(handleContainerResize, 150);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      resizeObserverRef.current = new ResizeObserver(debouncingContainerResize);
      resizeObserverRef.current.observe(container);
      layoutObserverRef.current = new MutationObserver(handleContainerLayout);
      layoutObserverRef.current.observe(container, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ["class"],
      });
    }
    return () => {
      if (resizeObserverRef.current && container) {
        resizeObserverRef.current.disconnect();
      }
      if (layoutObserverRef.current) {
        layoutObserverRef.current.disconnect();
      }
      cancelDebouncingContainerResize();
    };
  }, [
    cancelDebouncingContainerResize,
    containerRef,
    debouncingContainerResize,
    handleContainerLayout,
    handleContainerResize,
  ]);
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
export const useDebounce = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay: number,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
