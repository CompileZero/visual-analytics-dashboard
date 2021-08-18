function colorCalculator(n) {

    return n > 30000 ? '#360613'
        : n > 20000 ? '#590d22'
            : n > 15000 ? '#800f2f'
                : n > 10000 ? '#a4133c'
                    : n > 7000 ? '#c9184a'
                        : n > 4000 ? '#ff4d6d'
                            : n > 2000 ? '#ff758f'
                                : n > 1000 ? '#ff8fa3'
                                    : n > 500 ? '#ffb3c1'
                                        : n > 250 ? '#ffccd5'
                                            : n > 100 ? '#fff0f3'
                                                : '#ffffff';
}

export default colorCalculator;
