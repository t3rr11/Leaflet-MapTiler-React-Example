import L from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import TrafficSignals_GDA2020 from '@app-assets/geojson/TrafficSignals_GDA2020.geojson?raw';

interface TrafficSignalMarkerProps {
  properties: {
    site_type: string;
    ts_no: string;
    ts_desc: string;
    resp: string;
    road_no: string;
    rrd_ul: string;
    rrd_r: string;
  };
}

const TrafficSignalMarker = ({ properties }: TrafficSignalMarkerProps) => {
  return (
    <div className="py-2">
      <h1 className="text-xl font-semibold">Traffic Signal</h1>
      <div className="pt-1">Signal No: {properties.ts_no}</div>
      <div className="pt-1">Description: {properties.ts_desc}</div>
    </div>
  );
};

function TrafficSignalRoutes() {
  return (
    <GeoJSON
      data={JSON.parse(TrafficSignals_GDA2020)}
      style={{ color: 'red' }}
      pointToLayer={(_feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: '#ff6c62',
          color: '#000',
          weight: 1,
          opacity: 0.5,
          fillOpacity: 0.8,
        });
      }}
      onEachFeature={(feature, layer) => {
        layer.on('click', () => {
          layer.bindPopup(renderToString(<TrafficSignalMarker properties={feature.properties} />)).openPopup();
        });
      }}
    />
  );
}

export default TrafficSignalRoutes;
