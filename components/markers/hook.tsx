import { useState } from "react";

const useMarkers = (initialMarker) => {
  const [markers, setMarkers] = useState([]);

  const removeMarker = (index: number) => {
    setMarkers((prevMarkers) => prevMarkers.filter((_, i) => i !== index));
  };

  const addMarker = () => {
    setMarkers((prevMarkers) => [...prevMarkers, initialMarker]);
  };

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
};

export default useMarkers;
