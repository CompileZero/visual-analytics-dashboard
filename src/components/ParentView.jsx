import React, { useEffect, useState } from "react";

import CovidMap from "./CovidMap";
import GermanyData from "../tasks/GermanyData";
import Legend from "./Legend";
import Loading from "./Loading";
import NetherlandsData from "../tasks/NetherlandsData";

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
      {regionsGermany.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <CovidMap
            regionsGermany={regionsGermany}
            regionsNetherlands={regionsNetherlands}
          />
        </div>
      )}
    </div>
  );
};

export default ParentView;
