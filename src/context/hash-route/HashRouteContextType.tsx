import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface HashRouteContextType {
  route: string;
  setRoute: Dispatch<SetStateAction<string>>;
}

export interface HashRouteContextProviderProps {
  children: ReactNode;
}
export type RouteContextProviderType = (
  props: HashRouteContextProviderProps,
) => ReactNode;
