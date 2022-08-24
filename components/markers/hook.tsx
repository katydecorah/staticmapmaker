import { useState } from "react";

export default function useMarkers<Marker>(initialMarker: Marker) {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const removeMarker = (index: number) => {
    setMarkers((prevMarkers) => prevMarkers.filter((_, i) => i !== index));
  };

  function addMarker(): void {
    setMarkers((prevMarkers) => [...prevMarkers, initialMarker]);
  }

  const updateMarker = (
    value: string | boolean,
    index: number,
    label: string
  ) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker, markerIndex) => {
        return {
          ...marker,
          ...(index === markerIndex && { [label]: value }),
        };
      })
    );
  };

  return { markers, addMarker, updateMarker, removeMarker };
}
