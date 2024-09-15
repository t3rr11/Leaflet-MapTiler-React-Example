import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import Leaflet from './pages/Leaflet';
import MapTiler from './pages/MapTiler';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/leaflet" element={<App Component={<Leaflet />} />} />
        <Route path="/maptiler" element={<App Component={<MapTiler />} />} />
        <Route path={'*'} element={<Navigate to={'/leaflet'} replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

