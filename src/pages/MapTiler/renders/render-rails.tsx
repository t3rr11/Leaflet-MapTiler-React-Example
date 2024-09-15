
import * as maptilersdk from '@maptiler/sdk';
import Railways_GDA2020 from '@app-assets/geojson/Railways_GDA2020.geojson?raw';
import { renderToString } from 'react-dom/server';

interface RailRouteMarkerProps {
  properties: {
    persistentid: number;
    track_name: string;
    track_gauge: string;
    status: string;
    track_ownership: string;
    land_ownership: string;
    access_regimes: any;
    featurecode: number;
    railcode: string;
    ontype: any;
    generalised_view: string;
    capturesource: number;
    capturemethod: number;
    featuresource: number;
    horizontalaccuracy: number;
    featurereldate: string;
    attributereldate: string;
    created_user: string;
    created_date: string;
    last_edited_user: string;
    last_edited_date: string;
    shape_Length: number;
  };
}

const RailRouteMarker = ({ properties }: RailRouteMarkerProps) => {
  return (
    <div className="py-2">
      <h1 className="text-xl font-semibold">Rail Route</h1>
      <div className="pt-1">Track name: {properties.track_name}</div>
      <div className="pt-1">Track owner: {properties.track_ownership}</div>
      <div className="pt-1">Land owner: {properties.land_ownership}</div>
      <div className="pt-1">Status: {properties.status}</div>
      <div className="pt-1">Railcode: {properties.railcode}</div>
    </div>
  );
};

function MapTilerRailRoutes({ map }: { map: maptilersdk.Map }) {
  const id = 'rail-routes';

  map.addSource(id, {
    type: 'geojson',
    data: JSON.parse(Railways_GDA2020),
  }).addLayer({
    id: id,
    type: 'line',
    source: id,
    paint: {
      "line-color": "#a7a7a7",
      "line-width": 3,
      "line-dasharray": [3, 6],
    },
  });

  map.on('click', id, (e) => {
    // Return if no features are clicked
    if(!e.features) return;

    // Get the feature's properties (p.s we love as any... but seriously i'm getting tried)
    const properties = e.features[0].properties as any;

    new maptilersdk.Popup()
      .setLngLat(e.lngLat)
      .setHTML(renderToString(<RailRouteMarker properties={properties} />))
      .addTo(map);
  });

  map.on('mouseenter', id, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', id, () => {
    map.getCanvas().style.cursor = '';
  });
}

export default MapTilerRailRoutes;