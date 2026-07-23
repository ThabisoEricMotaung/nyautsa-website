"use client";

import "leaflet/dist/leaflet.css";

import { useMemo, useRef, useState } from "react";
import L, { type LatLngBoundsExpression, type LatLngTuple, type Map as LeafletMap, type Marker as LeafletMarker } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { ProjectLocation } from "@/lib/projects";

type ProjectMapCanvasProps = {
  locations: ProjectLocation[];
};

function createMarkerIcon(label: string, active: boolean) {
  const badgeClasses = active
    ? "bg-[#9d4e31] text-[#fffdfa] border-[#fffdfa]"
    : "bg-[#191a16] text-[#fffdfa] border-[#f7f4ee]";
  const tailClass = active ? "border-t-[#9d4e31]" : "border-t-[#191a16]";

  return L.divIcon({
    className: "nyautsa-map-marker",
    html: `
      <div class="flex flex-col items-center">
        <div class="${badgeClasses} flex h-9 min-w-9 items-center justify-center rounded-full border-2 px-2 text-[10px] font-semibold uppercase tracking-[0.1em] shadow-md transition-colors">
          ${label}
        </div>
        <div class="${tailClass} -mt-px h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent"></div>
      </div>
    `,
    iconSize: [40, 46],
    iconAnchor: [20, 46],
    popupAnchor: [0, -42],
  });
}

export function ProjectMapCanvas({ locations }: ProjectMapCanvasProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRefs = useRef<Record<string, LeafletMarker | null>>({});

  const bounds = useMemo<LatLngBoundsExpression>(
    () => locations.map((location) => [location.coordinates.latitude, location.coordinates.longitude] as LatLngTuple),
    [locations]
  );

  function focusProject(slug: string) {
    setActiveSlug(slug);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function focusOnMap(location: ProjectLocation) {
    setActiveSlug(location.projectSlug);
    mapRef.current?.flyTo(
      [location.coordinates.latitude, location.coordinates.longitude],
      14,
      { duration: 0.6 }
    );
    markerRefs.current[location.projectSlug]?.openPopup();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(320px,0.35fr)] lg:items-start">
      <div
        aria-label="Approximate project locations across Gauteng"
        className="relative mt-9 min-h-[360px] overflow-hidden rounded-sm border border-[#ddd7cb] bg-[#ebe6dc] sm:min-h-[480px] lg:mt-0"
      >
        <MapContainer
          ref={mapRef}
          bounds={bounds}
          boundsOptions={{ padding: [48, 48] }}
          scrollWheelZoom={false}
          className="h-[360px] w-full sm:h-[480px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="nyautsa-tile"
          />
          {locations.map((location) => (
            <Marker
              key={location.projectSlug}
              position={[location.coordinates.latitude, location.coordinates.longitude]}
              icon={createMarkerIcon(
                location.locationLabel.slice(0, 4),
                activeSlug === location.projectSlug
              )}
              ref={(marker) => {
                markerRefs.current[location.projectSlug] = marker;
              }}
              eventHandlers={{
                click: () => focusProject(location.projectSlug),
              }}
            >
              <Popup>
                <p className="font-serif text-sm text-[#191a16]">{location.projectTitle}</p>
                <p className="mt-1 text-xs text-[#65645b]">
                  {location.locationLabel}, {location.region} &middot; approximate area
                </p>
                <a
                  className="mt-2 inline-block text-xs font-medium text-[#526b38] underline underline-offset-2"
                  href={`#${location.projectSlug}`}
                  onClick={() => setActiveSlug(location.projectSlug)}
                >
                  View project details
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <ProjectLocationList activeSlug={activeSlug} locations={locations} onSelect={focusOnMap} />
    </div>
  );
}

function ProjectLocationList({
  locations,
  activeSlug,
  onSelect,
}: {
  locations: ProjectLocation[];
  activeSlug: string | null;
  onSelect: (location: ProjectLocation) => void;
}) {
  return (
    <div className="border-t border-[#ddd7cb] pt-6 lg:mt-[104px]">
      <h3 className="font-serif text-xl font-normal text-[#161713]">
        Approximate project areas
      </h3>
      <ul className="mt-6 divide-y divide-[#ddd7cb]">
        {locations.map((location) => {
          const isActive = activeSlug === location.projectSlug;
          return (
            <li key={location.projectSlug}>
              <a
                className={`block border-l-2 py-4 pl-3 transition-colors hover:text-[#526b38] focus-visible:text-[#526b38] ${
                  isActive
                    ? "border-[#9d4e31] text-[#526b38]"
                    : "border-transparent text-[#161713]"
                }`}
                href={`#${location.projectSlug}`}
                onClick={() => onSelect(location)}
              >
                <span className="block text-sm font-medium">{location.locationLabel}</span>
                <span className="mt-1 block text-xs leading-5 text-[#65645b]">
                  {location.projectTitle} / {location.region} / approximate area
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
