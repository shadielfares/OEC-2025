import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


function Earthquake() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2hhZGllbGZhcmVzIiwiYSI6ImNtM2JvODd1dzFnYWoyanB4OTJzcGgxY2wifQ.yvzs3YBCnmy8gSQNDXpIyA";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/shadielfares/cm6bd1epw003x01shhy4mhhl1",
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

export default Earthquake;
