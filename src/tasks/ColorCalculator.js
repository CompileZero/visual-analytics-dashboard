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

    return n > 30000 ? '#360613'
        : n > 20000 ? '#000000'
            : n > 15000 ? '#190f00'
                : n > 10000 ? '#331e00'
                    : n > 7000 ? '#4c2d00'
                        : n > 4000 ? '#663c00'
                            : n > 2000 ? '#804b00'
                                : n > 1000 ? '#b36800'
                                    : n > 500 ? '#cc7700'
                                        : n > 250 ? '#e68600'
                                            : n > 100 ? '#ff9500'
                                                : '#ffffff';
}

export { colorCalculatorCases, colorCalculatorDeaths };