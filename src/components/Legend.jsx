
import React from 'react';

const Legend = ({ metric }) => {

    let legendData = {
        'Total Cases': [
            { text: "> 100", color: "#d8f3dc" },
            { text: "> 500", color: "#b7e4c7" },
            { text: "> 1000", color: "#95d5b2" },
            { text: "> 2000", color: "#74c69d" },
            { text: "> 5000", color: "#52b788" },
            { text: "> 10000", color: "#40916c" },
            { text: "> 15000", color: "#2d6a4f" },
            { text: "> 20000", color: "#1b4332" },
            { text: "> 30000", color: "#081c15" },
        ],
        'Total Deaths': [
            { text: "> 10", color: "#fff0f3" },
            { text: "> 20", color: "#ffccd5" },
            { text: "> 50", color: "#ffb3c1" },
            { text: "> 100", color: "#ff8fa3" },
            { text: "> 200", color: "#ff758f" },
            { text: "> 300", color: "#ff4d6d" },
            { text: "> 400", color: "#c9184a" },
            { text: "> 500", color: "#a4133c" },
            { text: "> 1000", color: "#800f2f" },
            { text: "> 2000", color: "#590d22" },
            { text: "> 3000", color: "#360613" },
        ],
        'Cases: 7 Day-Average': [
            { text: "0", color: "#e0b1cb" },
            { text: "1", color: "#be95c4" },
            { text: "> 2", color: "#9f86c0" },
            { text: "> 10", color: "#5e548e" },
            { text: "> 20", color: "#231942" },

        ],
        'Deaths: 7 Day-Average': [
            { text: "0", color: "#ffab61" },
            { text: "1", color: "#ffab61" },
            { text: "> 2", color: "#ed903e" },
            { text: "> 10", color: "#bf702a" },
            { text: "> 20", color: "#91521a" },
        ]

    };

    return (

        <div className="w-full p-4 justify-center font-sans" >
            <h3 className="text-sm">{metric}</h3>
            <div className="border-2 rounded-md">
                {
                    legendData[metric].map(item => (
                        <div key={item.text} className="grid grid-cols-5 gap-4 border-b p-1">
                            <div className="col-span-4">
                                {item.text}</div>
                            <div className="rounded-md py-2 w-4 px-3" style={{ background: item.color }}></div>
                            {/* <span className="rounded-md py-2 ml-8 px-3 " style={{ background: item.color }}> </span> */}
                        </div>))
                }
            </div>
        </div >

    );
};

export default Legend;
