import { GeoJSON } from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import Railways_GDA2020 from '@app-assets/geojson/Railways_GDA2020.geojson?raw';

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

function RailRoutes() {
  return (
    <GeoJSON
      data={JSON.parse(Railways_GDA2020)}
      style={{
        color: '#a7a7a7',
        weight: 3,
        dashArray: '3, 6',
        dashOffset: '10',
      }}
      onEachFeature={(feature, layer) => {
        layer.on('click', () => {
          layer.bindPopup(renderToString(<RailRouteMarker properties={feature.properties} />)).openPopup();
        });
      }}
    />
  );
}

export default RailRoutes;
