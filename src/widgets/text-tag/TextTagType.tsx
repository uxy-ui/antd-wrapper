import type { TagProps } from 'antd';
import type { ReactNode } from 'react';

export interface TextTagItem {
  text: string;
  config?: TagProps;
}

export interface TextTagProps {
  items: TextTagItem[];
}
export type TextTagType = (props: TextTagProps) => ReactNode;
export interface TextTagHookState {
  content: ReactNode;
}
export type TextTagHookType = (props: TextTagProps) => TextTagHookState;
