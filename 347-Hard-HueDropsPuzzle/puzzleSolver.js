const { paintPuzzle } = require('./painter');

module.exports = ({ rows, columns, puzzle, target }) => {
    console.log(`Receive as input:\n${rows} ${columns}\n${puzzle.map(row => row.join(' ')).join('\n')}\n${target}`);

    const colorOptions = ['R', 'O', 'Y', 'G', 'B', 'V'];

    const maxSteps = 25;

    const winningStrategy = {
        solution: [],
        history: []
    };

    const exploredStrategy = {
        deadEnds: 0,
        solutions: 0
    };


    function getUniquesInPuzzle(puzzle) {
        return puzzle.reduce((uniques, row) => [
            ...uniques,
            ...(row
                .reduce((rowUniques, cell) => !rowUniques.includes(cell) ?
                    [
                        ...rowUniques,
                        cell
                    ] :
                    rowUniques, [])
                .filter(unique => !uniques.includes(unique)))
        ], []);
    }

    function getCurrentMax() {
        return winningStrategy.solution.length ?
            winningStrategy.solution.length - 1 :
            maxSteps;
    }

    function solve(history, paintedCells = [], solution = []) {
        const lastStep = history[history.length - 1]
            .map(row => row.map(cell => cell));

        // Identify solutions
        if (paintedCells.length === rows * columns && lastStep[0][0] === target) {
            winningStrategy.solution = [...solution];
            winningStrategy.history = history;
            exploredStrategy.solutions ++;
            return;
        }

        // Identify dead ends
        if (solution.length >= getCurrentMax()) {
            exploredStrategy.deadEnds ++;
            return; 
        }

        const nextSteps = colorOptions 
            .filter(color => color !== solution[solution.length - 1])
            .map(color => {
                const { paintedCells: newPaintedCells, step } = paintPuzzle(lastStep, color);
                return {
                    history: [...history, step],
                    paintedCells: newPaintedCells,
                    solution: [...solution, color],
                    gain: newPaintedCells.length - paintedCells.length,
                    uniques: getUniquesInPuzzle(step)
                };
            });

        nextSteps 
            .filter(({uniques}) => getCurrentMax() - solution.length >= uniques.length)
            .sort((a, b) => b.gain - a.gain)
            .forEach(next => solve(next.history, next.paintedCells, next.solution));
    }

    console.time('puzzle solving took');
    solve([puzzle]);
    console.log(
        "Evaluated %f % of possibilities, %d dead ends, %d solutions",
        (exploredStrategy.solutions + exploredStrategy.deadEnds) / Math.pow(colorOptions.length - 1, maxSteps) * 100,
        exploredStrategy.deadEnds,
        exploredStrategy.solutions
    );
    console.log(`Winning solution is ${winningStrategy.solution.join(' ')} and was found in ${winningStrategy.solution.length} steps.`);
    console.timeEnd('puzzle solving took');
};
