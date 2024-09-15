import { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import MapTilerRailRoutes from './renders/render-rails';
import MapTilerTrafficRoutes from './renders/render-traffic';
import '@maptiler/sdk/dist/maptiler-sdk.css';

function Page() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<maptilersdk.Map | null>(null);
  const tonsley = { lng: 138.5707, lat: -35.0146 };
  const zoom = 13;
  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  useEffect(() => {
    if (mapRef.current) return; // stops map from intializing more than once

    const map = new maptilersdk.Map({
      container: mapContainerRef.current!,
      style: maptilersdk.MapStyle.STREETS,
      center: [tonsley.lng, tonsley.lat],
      zoom: zoom,
    });

    map.on('load', () => {
      console.log('Finished loading');

      MapTilerTrafficRoutes({ map });
      MapTilerRailRoutes({ map });

      new maptilersdk.Marker().setLngLat([138.5707, -35.0146]).addTo(map);
    });

    mapRef.current = map;
  }, [tonsley.lng, tonsley.lat, zoom]);

  return (
    <main className="block flex-1 overflow-hidden">
      <div className="relative w-full h-screen">
        <div ref={mapContainerRef} className="absolute top-0 left-0 w-full h-full" />
      </div>
    </main>
  );
}

export default Page;
