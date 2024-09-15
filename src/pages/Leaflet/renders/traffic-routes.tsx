import { GeoJSON } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import { renderToString } from 'react-dom/server';
import TrafficVolumeEstimates_GDA2020 from '@app-assets/geojson/TrafficVolumeEstimates_GDA2020.geojson?raw';

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

function mapVolumeToPathOptions(volume: number): PathOptions {
  switch (true) {
    case volume >= 0 && volume <= 100: {
      return {
        color: 'lime',
      };
    }
    case volume >= 101 && volume <= 500: {
      return {
        color: 'green',
      };
    }
    case volume >= 501 && volume <= 3000: {
      return {
        color: 'yellow',
      };
    }
    case volume >= 3001 && volume <= 10000: {
      return {
        color: 'orange',
      };
    }
    case volume >= 10001 && volume <= 20000: {
      return {
        color: '#F9B498',
      };
    }
    case volume >= 20001 && volume <= 50000: {
      return {
        opacity: 0.6,
        color: '#3f96e7',
      };
    }
    case volume >= 50001 && volume <= 100000: {
      return {
        opacity: 0.8,
        weight: 6,
        color: 'red',
      };
    }
    default: {
      return {
        color: 'black',
      };
    }
  }
}

function TrafficEstimateRoutes() {
  return (
    <GeoJSON
      data={JSON.parse(TrafficVolumeEstimates_GDA2020)}
      style={(feature) => {
        return {
          weight: 5,
          opacity: 0.8,
          ...mapVolumeToPathOptions(feature?.properties.tesecn_volume)
        }
      }}
      onEachFeature={(feature, layer) => {
        layer.on('click', () => {
          layer.bindPopup(renderToString(<TrafficEstimateMarker properties={feature.properties} />)).openPopup();
        });
      }}
    />
  );
}

export default TrafficEstimateRoutes;
