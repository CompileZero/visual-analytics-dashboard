import { features } from '../data/germany_regions.json';
export const loadGermanyData = async () => {

    let setState = null;
    let covidData = [];
    let covidDataCases = [];
    let covidDataDeaths = [];
    let mapRegions = features;

    const getCovidData = async (url) => {
        const response = await fetch(url);
        let data = await response.json();
        covidData = data.data;
        //console.log(Object.keys(covidData).length);
    };

    const getCovidDataCases = async (url) => {
        const response = await fetch(url);
        let data = await response.json();

        covidDataCases = data.data;
        //console.log(Object.keys(covidData).length);
    };

    const getCovidDataDeaths = async (url) => {
        const response = await fetch(url);
        let data = await response.json();

        covidDataDeaths = data.data;
        //console.log(Object.keys(covidData).length);
    };


    await getCovidData("https://api.corona-zahlen.org/districts");
    await getCovidDataCases("https://api.corona-zahlen.org/districts/history/cases/30");
    await getCovidDataDeaths("https://api.corona-zahlen.org/districts/history/deaths/30");

    let arrCovidData = Object.values(covidData);
    let arrCovidDataCases = Object.values(covidDataCases);
    let arrCovidDataDeaths = Object.values(covidDataDeaths);
    let max_cases = Math.max.apply(Math, arrCovidData.map(function (o) { return o.cases; }));
    console.log(max_cases);

    // console.log(typeof (covidData));
    console.log(covidData);
    // console.log(Object.values(covidData)[50].name);
    let countRegions = 0;
    for (let i = 0; i < mapRegions.length; i++) {
        const mapDataRegion = mapRegions[i];

        const covidDataRegion = arrCovidData.find((region) => {

            if (region.name.normalize("NFD").replace(/\p{Diacritic}/gu, "") === mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, "")
                || region.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, ""), 0)
                || mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(region.name.normalize("NFD").replace(/\p{Diacritic}/gu, ""), 0)
            ) {
                return true;
            }
            else {
                return false;
            };
        }
        );
        if (covidDataRegion) {


            // console.log(arrCovidDataDeaths);

            let covidDataRegionCases = arrCovidDataCases.find((region) => {
                if (region.name.normalize("NFD").replace(/\p{Diacritic}/gu, "") === mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, "")
                    || region.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, ""), 0)
                    || mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(region.name.normalize("NFD").replace(/\p{Diacritic}/gu, ""), 0)
                ) {
                    return true;
                }
                else {
                    return false;
                };
            });

            let covidDataRegionDeaths = arrCovidDataDeaths.find((region) => {
                if (region.name.normalize("NFD").replace(/\p{Diacritic}/gu, "") === mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, "")
                    || region.name.normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, ""), 0)
                    || mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(region.name.normalize("NFD").replace(/\p{Diacritic}/gu, ""), 0)
                ) {
                    return true;
                }
                else {
                    return false;
                };
            });

            if (covidDataRegionCases) {
                mapRegions[i].properties.history_cases = covidDataRegionCases.history;
            }

            if (covidDataRegionDeaths) {
                mapRegions[i].properties.history_deaths = covidDataRegionDeaths.history;
            }


            countRegions += 1;
            mapRegions[i].properties.cases = covidDataRegion.cases;
            mapRegions[i].properties.population = covidDataRegion.population;
            mapRegions[i].properties.deaths = covidDataRegion.deaths;
            mapRegions[i].properties.recovered = covidDataRegion.recovered;

        }
        // const specificRegion = germanyRegions.features.find((specificRegion) => { specificRegion.properties.NAME_3 === specificRegion.});
    }
    console.log("Count is", countRegions);

    console.log(mapRegions);
    return mapRegions;
    //setCovidData(covidData.data);
};