import { features as regionData } from "../data/netherlands_regions.json";

class NetherlandsData {

    async getCovidData(url) {

        const response = await fetch(url);
        let data = response.json();
        // console.log(data);
        return data;
        //console.log(Object.keys(this.covidData).length);
    };

    async combineRegionalCovidData(setRegionsNetherlands) {
        // let covidData = [];
        let covidData = await this.getCovidData("https://va-dashboard-backend-compilezero.vercel.app/");
        let countRegions = 0;

        let combinedData = JSON.parse(JSON.stringify(regionData));
        for (let i = 0; i < regionData.length; i++) {
            let currentRegion = regionData[i];

            let currentCovidData = covidData.find((covidData) => {
                if (covidData["Municipality_name"] === currentRegion.properties["NAME_2"]) {
                    return true;
                }
                else {
                    return false;
                }
            });

            if (currentCovidData) {

                countRegions += 1;
                // let randomNum = Math.floor(currentCovidData["Total_reported"] / 1000);
                // var regionColor = "#003040".replace(/0/g, function () { return (~~((randomNum / 20) * 16)).toString(16); });
                // let regionColor = colorCalculator(currentCovidData["Total_reported"]);
                // combinedData[i].properties.color = regionColor;
                combinedData[i].properties["History_data"] = currentCovidData["History_data"];
                // combinedData[i].properties.cases = currentCovidData["Total_reported"];
                // combinedData[i].properties.hospital_admission = currentCovidData["Hospital_admission"];
                // combinedData[i].properties.deceased = currentCovidData["Deceased"];

                // console.log(combinedData[i]);
            }

        }
        console.log(countRegions);
        setRegionsNetherlands(combinedData);
        // Returns combineddata
    }
}
export default NetherlandsData;
