import React from 'react';
import { features as netherlands_regions } from "../data/netherlands_regions.json";
import { features as belgium_regions } from "../data/belgium_regions.json";
import { features as france_regions } from "../data/france_regions.json";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import { divIcon } from "leaflet";
const CovidMap = ({ regions }) => {



    const mapStyle = {
        fillColor: "orange",
        weight: 1,
        color: "gray",
        fillOpacity: 0.9

    };

    const onEachRegion = (region, layer) => {
        layer.options.fillColor = region.properties.color;
        const name = region.properties.NAME_3;
        const confirmedText = region.properties.cases;
        layer.on('mousemove', function (e) {
            layer.bindPopup(`${name} ${confirmedText}`).openPopup();
        });

    };

    return (
        <div>
            <MapContainer style={{ height: "90vh" }} zoom={6} center={[50, 10]}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                />
                {<GeoJSON style={mapStyle} data={france_regions} onEachFeature={onEachRegion} />}
                {<GeoJSON style={mapStyle} data={belgium_regions} onEachFeature={onEachRegion} />}
                {<GeoJSON style={mapStyle} data={regions} onEachFeature={onEachRegion} />}
                {<GeoJSON style={mapStyle} data={netherlands_regions} onEachFeature={onEachRegion} />}

            </MapContainer>

        </div>
    );
};

export default CovidMap;
