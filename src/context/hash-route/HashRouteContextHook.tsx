import { useCallback, useEffect, useState } from "react";

export const useHashRouteContextHook = () => {
  const [routeState, setRouteState] = useState<string>("/");
  const onHashChange = useCallback(() => {
    const hashPath = window.location.hash.substring(1);
    if (hashPath !== routeState) {
      setRouteState(hashPath);
    }
  }, [routeState]);
  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [onHashChange]);
  useEffect(() => {
    const hashPath = window.location.hash.substring(1);
    if (routeState !== hashPath) {
      window.location.hash = `#${routeState}`;
    }
  }, [routeState]);

  return {
    route: routeState,
    setRoute: setRouteState,
  };
};
