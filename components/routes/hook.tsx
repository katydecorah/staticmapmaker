import { useState } from "react";

export default function useRoute<Leg>(initialRoute: Leg[]) {
  const [route, setRoutes] = useState<Leg[]>([]);

  const removeRoute = () => {
    setRoutes([]);
  };

  function addRoute(): void {
    setRoutes((prevRoutes) => [...prevRoutes, ...initialRoute]);
  }

  const updateRoute = (
    value: string | boolean,
    index: number,
    label: string
  ) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((leg, legIndex) => {
        return {
          ...leg,
          ...(index === legIndex && { [label]: value }),
        };
      })
    );
  };

  return { route, addRoute, updateRoute, removeRoute };
}
