
import * as maptilersdk from '@maptiler/sdk';
import TrafficVolumeEstimates_GDA2020 from '@app-assets/geojson/TrafficVolumeEstimates_GDA2020.geojson?raw';
import { renderToString } from 'react-dom/server';

interface TrafficEstimateRoutesProps {
  properties: {
    road_no: string;
    rlcwy_code: string;
    tesecn_start_rrd: number;
    tesecn_end_rrd: number;
    tesecn_id: number;
    tesecn_volume: number;
    tesecn_base_year: string;
    tesecn_projected_year: string;
    cv_percent: number;
    number_cvs: number;
    class3to5: number;
    class6to9: number;
    class10: number;
    class11: number;
    traffic_score: number;
    shape_Length: number;
  };
}

const TrafficEstimateMarker = ({ properties }: TrafficEstimateRoutesProps) => {
  console.log(properties);
  return (
    <div className="py-2">
      <h1 className="text-xl font-semibold">Road Route</h1>
      <div className="pt-1">Road no: {properties.road_no}</div>
      <div className="pt-1">Traffic Score: {properties.traffic_score}</div>
      <div className="pt-1">Traffic Volume: {properties.tesecn_volume}</div>
      <div className="pt-1">CV Percent: {properties.cv_percent}%</div>
      <div className="pt-1">Number of CVs: {properties.number_cvs}</div>
    </div>
  );
};

function MapTilerTrafficRoutes({ map }: { map: maptilersdk.Map }) {
  const id = 'traffic-routes';

  map.addSource(id, {
    type: 'geojson',
    data: JSON.parse(TrafficVolumeEstimates_GDA2020),
  }).addLayer({
    id: id,
    type: 'line',
    source: id,
    paint: {
      "line-color": [
        'case',
        ['<', ['get', 'tesecn_volume'], 101], 'lime', 
        ['<', ['get', 'tesecn_volume'], 501], 'green',
        ['<', ['get', 'tesecn_volume'], 3001], 'green',
        ['<', ['get', 'tesecn_volume'], 10001], 'orange',
        ['<', ['get', 'tesecn_volume'], 20001], '#F9B498',
        ['<', ['get', 'tesecn_volume'], 50001], '#3f96e7',
        ['<', ['get', 'tesecn_volume'], 100001], 'red',
        '#000000'
      ],
      "line-width": [
        'case',
        ['>', ['get', 'tesecn_volume'], 50000], 6,
        3
      ],
      "line-opacity": [
        'case',
        ['>', ['get', 'tesecn_volume'], 50000], 0.8,
        0.6
      ],
    },
  });

  map.on('click', id, (e) => {
    // Return if no features are clicked
    if(!e.features) return;

    // Get the feature's properties (p.s we love as any... but seriously i'm getting tried)
    const properties = e.features[0].properties as any;

    new maptilersdk.Popup()
      .setLngLat(e.lngLat)
      .setHTML(renderToString(<TrafficEstimateMarker properties={properties} />))
      .addTo(map);
  });

  map.on('mouseenter', id, () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', id, () => {
    map.getCanvas().style.cursor = '';
  });
}

export default MapTilerTrafficRoutes;