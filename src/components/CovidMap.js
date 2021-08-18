import React from 'react';
import { features as netherlands_regions } from "../data/netherlands_regions.json";
import { features as belgium_regions } from "../data/belgium_regions.json";
import { features as france_regions } from "../data/france_regions.json";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
// import "popup.css"
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import { divIcon, Point } from "leaflet";

const CovidMap = ({ regionsGermany, regionsNetherlands }) => {
    console.log(regionsNetherlands);
    const mapStyle = {
        fillColor: "orange",
        weight: 1,
        color: "#BBBBBB",
        fillOpacity: 0.9

    };

    const onEachRegion = (region, layer) => {
        console.log(region);
        layer.options.fillColor = region.properties.color;
        const name = region.properties.NAME_3;
        const confirmedText = region.properties.cases;
        const population = region.properties.population;
        const deaths = region.properties.deaths;
        const recovered = region.properties.recovered;

        layer.on('mousemove', function (e) {

            layer.bindPopup(`<h6 style='font-size:12px;'>
            <strong>${name}</strong>
            </h6>
            
            <div>Population<h6 style='font-size:12px;'>${population}</h6></div>
            <div>Confirmed Cases<h6 style='font-size:12px;'>${confirmedText}</h6></div>
            <div>Deaths<h6 style='font-size:12px;'>${deaths}</h6></div>
            <div>Recovered<h6 style='font-size:12px;'>${recovered}</h6></div>`, { minWidth: 100 }).openPopup(e.latlng);
        });
    };

    const onEachRegionNetherlands = (region, layer) => {
        layer.options.fillColor = region.properties.color;
        const name = region.properties.NAME_2;
        const confirmedText = region.properties.cases;
        const hospital_admission = region.properties.hospital_admission;
        const deceased = region.properties.deceased;
        layer.on('mousemove', function (e) {
            layer.bindPopup(`<h6 style='font-size:12px;'>
            <strong>${name}</strong>
            </h6>
            
            <div>Confirmed Cases<h6 style='font-size:12px;'>${confirmedText}</h6></div>
            <div>Hospital Admissions<h6 style='font-size:12px;'>${hospital_admission}</h6></div>
            <div>Deaths<h6 style='font-size:12px;'>${deceased}</h6></div>`, { minWidth: 80 }).openPopup(e.latlng);
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
                {<GeoJSON style={mapStyle} data={regionsGermany} onEachFeature={onEachRegion} />}
                {<GeoJSON style={mapStyle} data={regionsNetherlands} onEachFeature={onEachRegionNetherlands} />}

            </MapContainer>

        </div>
    );
};

export default CovidMap;
