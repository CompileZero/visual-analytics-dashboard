import React, { useState, useEffect } from 'react';

import GermanyData from "../tasks/GermanyData";
import NetherlandsData from "../tasks/NetherlandsData";
import CovidMap from "./CovidMap";
import Legend from "./Legend";
import Loading from "./Loading";

const ParentView = () => {

    const [regionsGermany, setRegionsGermany] = useState([]);
    const [regionsNetherlands, setRegionsNetherlands] = useState([]);


    const load = () => {
        const germanyData = new GermanyData();
        germanyData.loadDailyData(setRegionsGermany);

        const netherlandsData = new NetherlandsData();
        netherlandsData.combineRegionalCovidData(setRegionsNetherlands);

    };
    useEffect(load, []);

    return (
        <div>
            {regionsGermany.length === 0 ? <Loading /> :
                <div>
                    <CovidMap regionsGermany={regionsGermany} regionsNetherlands={regionsNetherlands} />
                </div>}
        </div>
    );
};

export default ParentView;
