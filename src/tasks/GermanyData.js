import { features } from "../data/germany_regions.json";
import colorCalculator from "./ColorCalculator";


class GermanyData {

    setState = null;
    covidData = [];
    mapRegions = features;
    getCovidData = async (url) => {
        const response = await fetch(url);
        let data = await response.json();

        this.covidData = data.data;
        //console.log(Object.keys(this.covidData).length);
    };

    load = async (setRegions) => {
        await this.getCovidData("https://api.corona-zahlen.org/districts");
        let arr = Object.values(this.covidData);
        let max_cases = Math.max.apply(Math, arr.map(function (o) { return o.cases; }));
        console.log(max_cases);

        // console.log(typeof (this.covidData));
        console.log(this.covidData);
        // console.log(Object.values(this.covidData)[50].name);
        let countRegions = 0;
        for (let i = 0; i < this.mapRegions.length; i++) {
            const mapDataRegion = this.mapRegions[i];

            const covidDataRegion = arr.find((region) => {

                if (region.name.normalize("NFD").replace(/\p{Diacritic}/gu, "") == mapDataRegion.properties.NAME_3.normalize("NFD").replace(/\p{Diacritic}/gu, "")
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
                countRegions += 1;
                // let randomNum = Math.floor(covidDataRegion.cases / 1000);
                //var regionColor = "#400000".replace(/0/g, function () { return (~~((covidDataRegion.cases / max_cases) * 16)).toString(16); });
                // var regionColor = "#D0A0FF".replace(/0/g, function () { return (~~((randomNum / 20) * 16)).toString(16); });
                //let regionColor = "#" + (covidDataRegion.cases / max_cases).toString(16).slice(2, 8);
                //let regionColor = "#" + (randomNum / 100).toString(16).slice(2, 8);
                let regionColor = colorCalculator(covidDataRegion.cases);
                this.mapRegions[i].properties.color = regionColor;
                this.mapRegions[i].properties.cases = covidDataRegion.cases;
                this.mapRegions[i].properties.population = covidDataRegion.population;
                this.mapRegions[i].properties.deaths = covidDataRegion.deaths;
                this.mapRegions[i].properties.recovered = covidDataRegion.recovered;

            }
            // const specificRegion = germanyRegions.features.find((specificRegion) => { specificRegion.properties.NAME_3 === specificRegion.});
        }
        console.log("Count is", countRegions);

        setRegions(this.mapRegions);
        //setCovidData(this.covidData.data);
    };
}

export default GermanyData;