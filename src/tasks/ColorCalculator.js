function colorCalculatorDeaths(n) {

    return n > 3000 ? '#360613'
        : n > 2000 ? '#590d22'
            : n > 1000 ? '#800f2f'
                : n > 500 ? '#a4133c'
                    : n > 400 ? '#c9184a'
                        : n > 300 ? '#ff4d6d'
                            : n > 200 ? '#ff758f'
                                : n > 100 ? '#ff8fa3'
                                    : n > 50 ? '#ffb3c1'
                                        : n > 20 ? '#ffccd5'
                                            : n > 10 ? '#fff0f3'
                                                : '#ffffff';
}

function colorCalculatorCases(n) {

    return n > 30000 ? '#081c15'
        : n > 20000 ? '#1b4332'
            : n > 15000 ? '#2d6a4f'
                : n > 10000 ? '#40916c'
                    : n > 5000 ? '#52b788'
                        : n > 2000 ? '#74c69d'
                            : n > 1000 ? '#95d5b2'
                                : n > 500 ? '#b7e4c7'
                                    : n > 100 ? '#d8f3dc'
                                        : '#ffffff';
}

function colorCalculatorSevenDayCases(n) {

    return n > 20 ? '#231942'
        : n > 10 ? '#5e548e'
            : n > 2 ? '#9f86c0'
                : n > 1 ? '#be95c4'
                    : '#e0b1cb';
}

function colorCalculatorSevenDayDeaths(n) {

    return n > 20 ? '#91521a'
        : n > 10 ? '#bf702a'
            : n > 2 ? '#ed903e'
                : n > 1 ? '#ffab61'
                    : '#ffab61';
}

export { colorCalculatorCases, colorCalculatorDeaths, colorCalculatorSevenDayCases, colorCalculatorSevenDayDeaths };