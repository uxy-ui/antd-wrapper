import { Tag } from 'antd';
import { useMemo } from 'react';
import { textToColor } from '@/utils';
import type { TextTagHookType } from '@/widgets';

export const useTextTagHook: TextTagHookType = ({ items }) => {
  const calculateTags = useMemo(
    () =>
      items.map(({ text, config }, index) => (
        <Tag
          key={`${index}-${text}`}
          color={config?.color ?? textToColor(text)}
        >
          {text}
        </Tag>
      )),
    [items],
  );
  return {
    content: calculateTags,
  };
};
