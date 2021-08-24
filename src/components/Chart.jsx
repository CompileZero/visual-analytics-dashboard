import { Line } from "react-chartjs-2";
import React from "react";
import { dateForecast } from "../tasks/dateForecast.js";
import { smaForecast } from "../tasks/smaForecast.js";

var sma = require("sma");

const Chart = ({ chartData = {} }) => {
  let data = {};
  // console.log(chartData);
  if (chartData.country == "Germany") {
    let displayData = chartData.data.map((row) => row.cases);
    let labels = chartData.data.map((row) => {
      let date = row.date.split("T")[0];
      return date;
    });

    let dateLabels = [];
    if (labels.length != 0) dateLabels = dateForecast(labels, 40);
    let smaData = smaForecast(displayData);

    data = {
      labels: dateLabels,
      datasets: [
        {
          label: "# of Reported Cases",
          data: displayData,
          fill: false,
          backgroundColor: "rgb(255, 99, 132,0.2)",
          borderColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },

        {
          label: "SMA Forecast Trend",
          data: smaData,
          fill: false,
          backgroundColor: "rgb(245, 226, 59, 0.8)",
          borderColor: "rgba(245, 177, 59, 0.9)",
          fill: false,
        },
      ],
    };
  } else if (chartData.country == "Netherlands") {
    console.log(chartData.data);
    let bufferCases = chartData.data[0]["Total_reported"];
    let displayData = chartData.data.map((row) => {
      let newCases = row["Total_reported"] - bufferCases;

      bufferCases = row["Total_reported"];
      return newCases;
    });

    let labels = chartData.data.map((row) => {
      let date = row["Date_of_report"].split(" ")[0];
      return date;
    });

    let dateLabels = [];
    if (labels.length != 0) dateLabels = dateForecast(labels, 40);
    let smaData = smaForecast(displayData);

    data = {
      labels: dateLabels,
      datasets: [
        {
          label: "# of Reported Cases",
          data: displayData,
          fill: false,
          backgroundColor: "rgb(255, 99, 132,0.2)",
          borderColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },

        {
          label: "SMA Forecast Trend",
          data: smaData,
          fill: false,
          backgroundColor: "rgb(245, 226, 59, 0.8)",
          borderColor: "rgba(245, 177, 59, 0.9)",
          fill: false,
        },
      ],
    };
  }

  const options = {
    fillColor: "rgba(255, 99, 132, 0.2)",
    tension: 0.2,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 0,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line height={50} data={data} options={options} />
    </div>
  );
};

export default Chart;
