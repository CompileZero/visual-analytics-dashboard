import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ chartData = [] }) => {

    console.log(chartData);
    const data = {

        labels: chartData.map(row => row.date),
        datasets: [
            {
                label: '# of Votes',
                data: chartData.map(row => row.cases),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export default Chart;
