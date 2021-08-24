import "leaflet/dist/leaflet.css";
import "./CovidMap.css";

import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";
import React, { useEffect, useRef, useState } from "react";
import {
  clickToZoomFeature,
  onEachRegion,
  onEachRegionNetherlands,
} from "./CovidMap.utils";
import {
  colorCalculatorCases,
  colorCalculatorDeaths,
  colorCalculatorSevenDayCases,
  colorCalculatorSevenDayDeaths,
} from "../../tasks/ColorCalculator.js";
import { mapStyle, mapStyleBorder } from "./CovidMap.style";

import Chart from "../Chart";
import CountrySelect from "../CountrySelect";
import FilterSelect from "../FilterSelect";
import Legend from "../Legend";
// import { features as netherlands_regions } from "../data/netherlands_regions.json";
// import { features as belgium_regions } from "../data/belgium_regions.json";
// import { features as france_regions } from "../data/france_regions.json";
// import { features as germany_border } from "../data/germany_border.json";
// import { features as netherlands_border } from "../data/netherlands_border.json";
import { RadioGroup } from "@headlessui/react";
import borderData from "../../data/europe30percent.json";

const CovidMap = ({ regionsGermany, regionsNetherlands }) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  let prevDay = today.toISOString().split("T")[0];
  today.setDate(today.getDate() - 7);
  let seventhDay = today.toISOString().split("T")[0];

  let map = null;

  const setMap = (mapInstance) => {
    map = mapInstance;
  };

  let [metric, setMetric] = useState("Total Cases");
  let [zoomSelect, setZoomSelect] = useState({});

  let [chartData, setChartData] = useState({});
  let [country, setCountry] = useState("All");

  let [region, setRegion] = useState("No Region");
  let keyMap1 = React.useMemo(() => Math.random());
  let keyMap2 = React.useMemo(() => Math.random());
  let keyMap3 = React.useMemo(() => Math.random());

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
      sevenDayCases = (
        sevenDayCases / region.properties.history_deaths.length
      ).toFixed(2);
    }

    let sevenDayDeaths = 0;
    if (region.properties.history_deaths) {
      region.properties.history_deaths.forEach((item, index) => {
        sevenDayDeaths += item.deaths;
      });
      sevenDayDeaths = (
        sevenDayDeaths / region.properties.history_deaths.length
      ).toFixed(2);
    }

    if (metric == "Total Cases") {
      layer.options.fillColor = colorCalculatorCases(region.properties.cases);
    } else if (metric == "Total Deaths") {
      layer.options.fillColor = colorCalculatorDeaths(region.properties.deaths);
    } else if (metric == "Cases: 7 Day-Average") {
      layer.options.fillColor = colorCalculatorSevenDayCases(sevenDayCases);
    } else if (metric == "Deaths: 7 Day-Average") {
      layer.options.fillColor = colorCalculatorSevenDayDeaths(sevenDayDeaths);
    }

    const name = region.properties.NAME_3;
    const confirmedText = region.properties.cases;
    const population = region.properties.population;
    const deaths = region.properties.deaths;
    const recovered = region.properties.recovered;

    layer.on("mouseover", function (e) {
      layer
        .bindPopup(
          `
            <h6 class='text-base font-bold text-blue-800'>
            <strong>${name}</strong></h6>
            <div class='text-md font-bold text-gray-400'>Confirmed Cases</div><h6 class='text-base font-bold text-yellow-800'>${confirmedText}</h6>
            <div class='text-md font-bold text-gray-400'>Population</div><h6 class='text-base font-bold text-yellow-600'>${population}</h6>
            <div class='text-md font-bold text-gray-400'>Deaths</div><h6 class='text-base font-bold text-pink-500'>${deaths}</h6>
            <div class='text-md font-bold text-gray-400'>Recovered</div><h6 class='text-base font-bold text-pink-500'>${recovered}</h6>
            <hr/>
            <div class='text-lg font-medium text-gray-400'>7 Day Average</div>
            <div class='text-md font-bold text-gray-400'>Cases <span class='text-base font-bold text-gray-700'>${sevenDayCases}</span></div>
            <div class='text-md font-bold text-gray-400'>Deaths <span class='text-base font-bold text-gray-700'>${sevenDayDeaths}</span></div>`,
          { minWidth: 100 }
        )
        .openPopup(e.latlng);
    });

    layer.on("click", function (e) {
      let bounds = layer.getBounds();
      setRegion(name);
      setChartData({
        data: region.properties.history_cases,
        country: "Germany",
      });

      setZoomSelect({ center: bounds.getCenter(), zoom: 10 });
    });

    layer.on("mouseout", function (e) {
      layer.closePopup();
    });
  };

  const clickToZoomFeature = () => {
    console.log("This is clicked!");
  };

  const onEachRegionNetherlands = (region, layer) => {
    if (!region.properties["History_data"]) {
      layer.options.color = "";
      layer.options.fillOpacity = 0;
      return;
    }

    let historyData = region.properties["History_data"];

    let sevenDayCases = (
      (historyData[6]["Total_reported"] - historyData[0]["Total_reported"]) /
      7
    ).toFixed(2);
    let sevenDayDeaths = (
      (historyData[6]["Deceased"] - historyData[0]["Deceased"]) /
      7
    ).toFixed(2);

    if (metric == "Total Cases") {
      let cases = historyData[6]["Total_reported"];
      layer.options.fillColor = colorCalculatorCases(cases);
    } else if (metric == "Total Deaths") {
      let deaths = historyData[6]["Deceased"];
      layer.options.fillColor = colorCalculatorDeaths(deaths);
    } else if (metric == "Cases: 7 Day-Average") {
      layer.options.fillColor = colorCalculatorSevenDayCases(sevenDayCases);
    } else if (metric == "Deaths: 7 Day-Average") {
      layer.options.fillColor = colorCalculatorSevenDayDeaths(sevenDayDeaths);
    }

    const name = region.properties.NAME_2;
    // const cases = historyData[6]["Total_reported"]
    const confirmedText = historyData[6]["Total_reported"];
    const hospital_admission = historyData[6]["Hospital_admission"];
    const deceased = historyData[6]["Deceased"];

    layer.on("mouseover", function (e) {
      layer
        .bindPopup(
          `
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

          { minWidth: 80 }
        )
        .openPopup(e.latlng);
    });

    layer.on("click", function (e) {
      let bounds = layer.getBounds();
      setRegion(name);

      setChartData({ data: historyData, country: "Netherlands" });
      setZoomSelect({ center: bounds.getCenter(), zoom: 10 });
    });

    layer.on("mouseout", function (e) {
      layer.closePopup();
    });
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        <div className="ml-4">
          <h6 className="text-2xl text-center mt-4 font-black text-indigo-600">
            COVIS
          </h6>
          <FilterSelect setMetric={setMetric} />
          <h6 className="text-yellow-400 text-center font-semibold text-sm">
            7 Day:
          </h6>
          <h6 className="text-yellow-400 text-center font-bold text-sm">
            {seventhDay} to {prevDay}
          </h6>
          <hr />

          <CountrySelect
            setZoomSelect={setZoomSelect}
            setCountry={setCountry}
          />
          <Legend metric={metric} />
        </div>
        <div className="col-span-5">
          <MapContainer
            key={keyMap2}
            className="m-4"
            style={{ height: "60vh", width: "80vw" }}
            zoom={zoomSelect.zoom}
            center={zoomSelect.center}
            whenCreated={setMap}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            />
            <GeoJSON
              key={keyMap1}
              style={mapStyle}
              data={regionsGermany}
              onEachFeature={(region, layer) => onEachRegion(region, layer)}
            />
            <GeoJSON
              key={keyMap2}
              style={mapStyle}
              data={regionsNetherlands}
              onEachFeature={(region, layer) =>
                onEachRegionNetherlands(region, layer)
              }
            />
            <GeoJSON key={keyMap3} style={mapStyleBorder} data={borderData} />
          </MapContainer>
          <h3 className="text-base font-bold text-gray-500">
            Average Cases Forecasting: {country}
          </h3>
          <h3 className="text-sm font-bold text-yellow-500">
            Region: {region}
          </h3>
          <Chart className="h-24" chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CovidMap);
