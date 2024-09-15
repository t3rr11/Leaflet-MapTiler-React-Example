import 'leaflet/dist/leaflet.css';
import { MapContainer, Popup, TileLayer } from 'react-leaflet';
import CustomMarker from './renders/custom-marker';
// import TrafficSignalRoutes from './renders/traffic-signal-routes';
import TrafficEstimateRoutes from './renders/traffic-routes';
import RailRoutes from './renders/rail-routes';

function Page() {
  return (
    <main className="block flex-1 overflow-hidden">
      <MapContainer center={[-35.0146, 138.5707]} zoom={13} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomMarker position={[-35.0146, 138.5707]}>
          <Popup>You are here, at least this is where i've put you.</Popup>
        </CustomMarker>
        <TrafficEstimateRoutes />
        {/* <TrafficSignalRoutes /> */}
        <RailRoutes />
      </MapContainer>
    </main>
  );
}

export default Page;
