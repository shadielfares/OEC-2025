import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import "./App.css";

function Fire() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2hhZGllbGZhcmVzIiwiYSI6ImNtM2JvODd1dzFnYWoyanB4OTJzcGgxY2wifQ.yvzs3YBCnmy8gSQNDXpIyA";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/shadielfares/cm6bc5z3b00ag01qr0mtr3pn5",
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default Fire;
