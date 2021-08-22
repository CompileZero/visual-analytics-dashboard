import React, { useState, useEffect } from 'react';
// import { features as netherlands_regions } from "../data/netherlands_regions.json";
// import { features as belgium_regions } from "../data/belgium_regions.json";
// import { features as france_regions } from "../data/france_regions.json";
// import { features as germany_border } from "../data/germany_border.json";
// import { features as netherlands_border } from "../data/netherlands_border.json";
import { RadioGroup } from '@headlessui/react';

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
// import "popup.css"
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
// import { divIcon, Point } from "leaflet";
import FilterSelect from "./FilterSelect";
import { colorCalculatorDeaths, colorCalculatorCases, colorCalculatorSevenDayCases, colorCalculatorSevenDayDeaths } from "../tasks/ColorCalculator.js";

const CovidMap = ({ regionsGermany, regionsNetherlands }) => {

    const today = new Date();
    today.setDate(today.getDate() - 1);
    let prevDay = today.toISOString().split("T")[0];
    today.setDate(today.getDate() - 7);
    let seventhDay = today.toISOString().split("T")[0];




    let [metric, setMetric] = useState('Cases');


    let keyMap1 = Math.random();
    let keyMap2 = Math.random();

    const mapStyle = {
        weight: 0.8,
        color: "#FFFFFF",
        fillOpacity: 0.9
    };

    const mapStyleBorder = {
        color: "#0b0038",

        weight: 1,
        fillOpacity: 0
    };

    const onEachRegion = (region, layer) => {

        if (!region.properties.cases) {
            layer.options.color = "";
            layer.options.fillOpacity = 0;
            return;
        }

        let sevenDayCases = 0;
        if (region.properties.history_cases) {
            region.properties.history_cases.forEach((item, index) => {
                sevenDayCases += item.cases;
            });
            sevenDayCases = (sevenDayCases / region.properties.history_deaths.length).toFixed(2);
        }

        let sevenDayDeaths = 0;
        if (region.properties.history_deaths) {
            region.properties.history_deaths.forEach((item, index) => {

                sevenDayDeaths += item.deaths;
            });
            sevenDayDeaths = (sevenDayDeaths / region.properties.history_deaths.length).toFixed(2);
        }


        if (metric == "Total Cases") {
            layer.options.fillColor = colorCalculatorCases(region.properties.cases);
        }
        else if (metric == "Total Deaths") {
            layer.options.fillColor = colorCalculatorDeaths(region.properties.deaths);
        }

        else if (metric == "Cases: 7 Day-Average") {
            layer.options.fillColor = colorCalculatorSevenDayCases(sevenDayCases);
        }
        else if (metric == "Deaths: 7 Day-Average") {
            layer.options.fillColor = colorCalculatorSevenDayDeaths(sevenDayDeaths);

        }

        const name = region.properties.NAME_3;
        const confirmedText = region.properties.cases;
        const population = region.properties.population;
        const deaths = region.properties.deaths;
        const recovered = region.properties.recovered;

        layer.on('mouseover', function (e) {

            layer.bindPopup(`
            <h6 class='text-base font-bold text-blue-800'>
            <strong>${name}</strong></h6>
            <div class='text-md font-bold text-gray-400'>Confirmed Cases</div><h6 class='text-base font-bold text-yellow-800'>${confirmedText}</h6>
            <div class='text-md font-bold text-gray-400'>Population</div><h6 class='text-base font-bold text-yellow-600'>${population}</h6>
            <div class='text-md font-bold text-gray-400'>Deaths</div><h6 class='text-base font-bold text-pink-500'>${deaths}</h6>
            <div class='text-md font-bold text-gray-400'>Recovered</div><h6 class='text-base font-bold text-pink-500'>${recovered}</h6>
            <hr/>
            <div class='text-lg font-medium text-gray-400'>7 Day Average</div>
            <div class='text-md font-bold text-gray-400'>Cases <span class='text-base font-bold text-gray-700'>${sevenDayCases}</span></div>
            <div class='text-md font-bold text-gray-400'>Deaths <span class='text-base font-bold text-gray-700'>${sevenDayDeaths}</span></div>`
                , { minWidth: 100 }).openPopup(e.latlng);
        });

    };

    const onEachRegionNetherlands = (region, layer) => {

        if (!region.properties["History_data"]) {
            layer.options.color = "";
            layer.options.fillOpacity = 0;
            return;
        }

        let historyData = region.properties["History_data"];


        let sevenDayCases = ((historyData[6]["Total_reported"] - historyData[0]["Total_reported"]) / 7).toFixed(2);
        let sevenDayDeaths = ((historyData[6]["Deceased"] - historyData[0]["Deceased"]) / 7).toFixed(2);

        if (metric == "Total Cases") {

            let cases = historyData[6]["Total_reported"];
            layer.options.fillColor = colorCalculatorCases(cases);

        }
        else if (metric == "Total Deaths") {

            let deaths = historyData[6]["Deceased"];
            layer.options.fillColor = colorCalculatorDeaths(deaths);

        }

        else if (metric == "Cases: 7 Day-Average") {

            layer.options.fillColor = colorCalculatorSevenDayCases(sevenDayCases);
        }
        else if (metric == "Deaths: 7 Day-Average") {
            layer.options.fillColor = colorCalculatorSevenDayDeaths(sevenDayDeaths);
        }

        const name = region.properties.NAME_2;
        // const cases = historyData[6]["Total_reported"]
        const confirmedText = historyData[6]["Total_reported"];
        const hospital_admission = historyData[6]["Hospital_admission"];
        const deceased = historyData[6]["Deceased"];
        layer.on('mouseover', function (e) {
            layer.bindPopup(`
            <h6 class='text-base font-bold text-blue-800'>
            <strong>${name}</strong></h6>
            <div class='text-md font-bold text-gray-400'>Confirmed Cases</div><h6 class='text-base font-bold text-yellow-800'>${confirmedText}</h6>
            <div class='text-md font-bold text-gray-400'>Hospital Admissions</div><h6 class='text-base font-bold text-yellow-600'>${hospital_admission}</h6>
            <div class='text-md font-bold text-gray-400'>Deaths</div><h6 class='text-base font-bold text-pink-500'>${deceased}</h6>
            <hr/>
            <div class='text-lg font-medium text-gray-400'>7 Day Average</div>
            <div class='text-md font-bold text-gray-400'>Cases <span class='text-base font-bold text-gray-700'>${sevenDayCases}</span></div>
            <div class='text-md font-bold text-gray-400'>Deaths <span class='text-base font-bold text-gray-700'>${sevenDayDeaths}</span></div>
            `,

                { minWidth: 80 }).openPopup(e.latlng);
        });

    };

    return (
        <div>
            <div className="grid grid-cols-6 gap-4">
                <div className="ml-4">
                    <h6 className="text-2xl text-center mt-4 font-black text-indigo-600">COVIS</h6>
                    <FilterSelect setMetric={setMetric} />
                    <h6 className="text-yellow-400 text-center font-semibold text-sm">7 Day:</h6>
                    <h6 className="text-yellow-400 text-center font-bold text-sm">{seventhDay} to {prevDay}</h6>
                    <hr />
                </div>
                <div className="col-span-5">
                    <MapContainer style={{ height: "100vh" }} zoom={6} center={[50, 10]}>

                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                        />


                        {/* {<GeoJSON style={mapStyle} data={france_regions} onEachFeature={onEachRegion} />} */}
                        {/* {<GeoJSON style={mapStyle} data={belgium_regions} onEachFeature={onEachRegion} />} */}
                        {/* {<GeoJSON style={mapStyleBorder} data={germany_border} />}
                        {<GeoJSON style={mapStyleBorder} data={netherlands_border} />} */}

                        <GeoJSON key={keyMap1} style={mapStyle} data={regionsGermany} onEachFeature={onEachRegion} />
                        <GeoJSON key={keyMap2} style={mapStyle} data={regionsNetherlands} onEachFeature={onEachRegionNetherlands} />
                        {/* {metric == "Cases" ? <GeoJSON key={1} style={mapStyle} data={regionsGermany} onEachFeature={onEachRegion} /> : <GeoJSON key={2} style={mapStyle} data={regionsNetherlands} onEachFeature={onEachRegionNetherlands} />} */}

                        {/* {<GeoJSON key={2} style={mapStyle} data={regionsNetherlands} onEachFeature={onEachRegionNetherlands} />} */}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default CovidMap;
