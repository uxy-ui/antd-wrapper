import { type CSSProperties, useMemo } from 'react';
import { WorkBenchHookType } from '@/layouts/work-bench/index';

export const useWorkBenchHook: WorkBenchHookType = (
  dimensions,
  templateAreas,
) => {
  const style = useMemo<CSSProperties>(() => {
    const { rootWidth, homeWidth, navHeight, pathHeight, footerHeight } = {
      rootWidth: 200,
      homeWidth: 200,
      navHeight: 50,
      pathHeight: 30,
      footerHeight: 40,
      ...dimensions,
    };
    return {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateAreas:
        templateAreas ||
        `"root nav home" "menu path path" "menu main main" "toggle footer footer"`,
      gridTemplateColumns: `${rootWidth}px 1fr ${homeWidth}px`,
      gridTemplateRows: `${navHeight}px ${pathHeight}px 1fr ${footerHeight}px`,
    };
  }, [dimensions, templateAreas]);
  return {
    style,
  };
};
