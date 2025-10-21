import { createContext, useContext } from "react";
import type { HashRouteContextType } from "@/context";

export const HashRouteContext = createContext<HashRouteContextType>({
  route: "",
  setRoute: () => {
    /* empty */
  },
});

export const useRouteContext = () => {
  try {
    return useContext(HashRouteContext);
  } catch {
    throw new Error("`useRouteContext`必须在`HashRouteContextProvider`内使用");
  }
};
