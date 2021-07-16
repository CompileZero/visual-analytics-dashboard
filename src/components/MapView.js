import React, { useState, useEffect } from 'react';

import LoadRegionalData from "../tasks/LoadRegionalData";
import CovidMap from "./CovidMap";
import Legend from "./Legend";
import Loading from "./Loading";

const MapView = () => {

    const [regions, setRegions] = useState([]);


    const load = () => {
        const loadRegionalData = new LoadRegionalData();
        loadRegionalData.load(setRegions);

    };
    useEffect(load, []);

    return (
        <div>
            {regions.length === 0 ? <Loading /> :
                <div>
                    <CovidMap regions={regions} />
                    <Legend />
                </div>}
        </div>
    );
};

export default MapView;
