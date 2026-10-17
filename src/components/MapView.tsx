"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const places = [
  { name: "القاهرة", lat: 30.0444, lon: 31.2357, info: "المقر الرئيسي، فريق الدعم متاح ٢٤ ساعة." },
  { name: "دبي", lat: 25.2048, lon: 55.2708, info: "فرع الخليج، وقت الاستجابة أقل من ساعة." },
  { name: "لندن", lat: 51.5074, lon: -0.1278, info: "شراكات أوروبية وعملاء دوليين." },
  { name: "نيويورك", lat: 40.7128, lon: -74.006, info: "مكتب التسويق والمبيعات الأمريكي." },
];

function ResizeOnVisible() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 300);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

export default function MapView() {
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden border border-neutral-800">
      <MapContainer
        center={[30, 20]}
        zoom={2}
        scrollWheelZoom={false}
        preferCanvas={true}
        className="h-full w-full"
      >
        <ResizeOnVisible />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          updateWhenIdle={true}
          keepBuffer={2}
        />

        {places.map((place) => (
          <Marker key={place.name} position={[place.lat, place.lon]} icon={markerIcon}>
            <Popup>
              <div className="text-right">
                <h3 className="font-bold">{place.name}</h3>
                <p className="text-sm">{place.info}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}