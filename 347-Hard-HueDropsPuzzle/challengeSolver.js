const puzzleSolver = require('./puzzleSolver');

const challenge = {
    rows: 12,
    columns: 10,
    puzzle: [
        [ 'W', 'Y', 'O', 'B', 'V', 'G', 'V', 'O', 'Y', 'B'],
        [ 'G', 'O', 'O', 'V', 'R', 'V', 'R', 'G', 'O', 'R'],
        [ 'V', 'V', 'R', 'R', 'R', 'B', 'R', 'B', 'G', 'Y'],
        [ 'B', 'O', 'Y', 'R', 'R', 'G', 'Y', 'V', 'O', 'V'],
        [ 'V', 'O', 'B', 'O', 'R', 'G', 'B', 'R', 'G', 'R'],
        [ 'B', 'O', 'G', 'Y', 'Y', 'G', 'O', 'V', 'R', 'V'],
        [ 'O', 'O', 'G', 'O', 'Y', 'R', 'O', 'V', 'G', 'G'],
        [ 'B', 'O', 'O', 'V', 'G', 'Y', 'V', 'B', 'Y', 'G'],
        [ 'R', 'B', 'G', 'V', 'O', 'R', 'Y', 'G', 'G', 'G'],
        [ 'Y', 'R', 'Y', 'B', 'R', 'O', 'V', 'O', 'B', 'V'],
        [ 'O', 'B', 'O', 'B', 'Y', 'O', 'Y', 'V', 'B', 'O'],
        [ 'V', 'R', 'R', 'G', 'V', 'V', 'G', 'V', 'V', 'G']
    ],
    target: 'V'
};

puzzleSolver(challenge);
