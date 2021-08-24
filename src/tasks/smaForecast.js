var sma = require('sma');

const smaForecast = (data) => {
    let smaData = sma(data, 3, (n) => Math.floor(n));
    let finalSmaData = smaData;
    for (let i = 0; i <= 2; i++) {
        smaData = [...finalSmaData];
        smaData = sma(smaData, 3, (n) => Math.floor(n));
        finalSmaData.push(...smaData);
    }
    return finalSmaData;
};
export { smaForecast };