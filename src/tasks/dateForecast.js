
const dateForecast = (dateLabels, daysToForecast) => {

    let finalDates = [];

    dateLabels.forEach(item => {
        let [year, month, day] = item.split("-");
        finalDates.push(`${day}-${month}`);
    });

    console.log(dateLabels, daysToForecast);
    let dateString = dateLabels[dateLabels.length - 1];
    console.log(dateString);
    let [year, month, day] = dateString.split("-");
    console.log(year, month, day);
    let today = new Date(year, month - 1, day);

    for (let i = 1; i < daysToForecast; i++) {
        today.setDate(today.getDate() + 1);
        let todayString = today.toISOString().split("T")[0];
        let [year, month, day] = todayString.split("-");
        finalDates.push(`${day}-${month}`);
    }
    console.log(finalDates);
    return finalDates;
};

export { dateForecast };