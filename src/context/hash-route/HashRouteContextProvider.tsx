import {
  HashRouteContext,
  type RouteContextProviderType,
  useHashRouteContextHook,
} from "@/context";

export const HashRouteContextProvider: RouteContextProviderType = (props) => {
  const { route, setRoute } = useHashRouteContextHook();
  return (
    <HashRouteContext.Provider
      value={{
        route,
        setRoute,
      }}
    >
      {props.children}
    </HashRouteContext.Provider>
  );
};
