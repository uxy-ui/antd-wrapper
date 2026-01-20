import { Flex } from 'antd';
import { type TextTagType, useTextTagHook } from '@/widgets';

export const TextTag: TextTagType = (props) => {
  const { content } = useTextTagHook(props);
  return <Flex gap={'10px'}>{content}</Flex>;
};
