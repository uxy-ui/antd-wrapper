import type { CSSProperties, ReactNode } from 'react';

export interface WorkBenchAreas {
  root?: ReactNode;
  nav?: ReactNode;
  home?: ReactNode;
  menu?: ReactNode;
  path?: ReactNode;
  main?: ReactNode;
  toggle?: ReactNode;
  footer?: ReactNode;
}
export interface WorkBenchDimensions {
  rootWidth?: number;
  homeWidth?: number;
  navHeight?: number;
  pathHeight?: number;
  footerHeight?: number;
}
export interface WorkBenchProps {
  areas?: WorkBenchAreas;
  dimensions?: WorkBenchDimensions;
  templateAreas?: string;
}

export type WorkBenchComponent = (props: WorkBenchProps) => ReactNode;

export interface WorkBenchHookState {
  style: CSSProperties;
}
export type WorkBenchHookType = (
  dimensions?: WorkBenchDimensions,
  templateAreas?: string,
) => WorkBenchHookState;
