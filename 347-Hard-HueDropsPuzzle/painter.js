exports.paintPuzzle = (puzzle, newColor) => {
    let i = 0;
    let cellsToPaint = [[0, 0]];
    const lastColor = puzzle[0][0];

    while(cellsToPaint.length > i) {
        const currentCell = cellsToPaint[i];
        cellsToPaint = [...cellsToPaint, ...getPaintableNeighbours(puzzle, lastColor, newColor, currentCell, cellsToPaint)];
        i ++;
    }

    return {
        paintedCells: cellsToPaint,
        step: cellsToPaint.reduce((pastPartialPaint, [row, column]) => paintCell(pastPartialPaint, row, column, newColor), puzzle)
    };
};

function paintCell(puzzle, rowNeedle, columnNeedle, color) {
    return puzzle.map((row, rowIndex) => rowIndex === rowNeedle ?
        row.map((value, columnIndex) => columnIndex === columnNeedle ?
            color :
            value
        ) :
        row
    );
}

function getPaintableNeighbours(puzzle, lastColor, newColor, [currentRow, currentColumn], cellsToPaint) {
    const paintableNeighbours = [];
    const isPaintableCell = (row, column) => (
        [lastColor, newColor].includes(puzzle[row][column]) &&
        !cellsToPaint.find(([cursorRow, cursorColumn]) => cursorRow === row && cursorColumn === column)
    );
    if (currentRow > 0 && isPaintableCell(currentRow - 1, currentColumn)) {
        paintableNeighbours.push([currentRow - 1, currentColumn]);
    }
    if (currentRow < puzzle.length - 1 && isPaintableCell(currentRow + 1, currentColumn)) {
        paintableNeighbours.push([currentRow + 1, currentColumn]);
    }
    if (currentColumn > 0 && isPaintableCell(currentRow, currentColumn - 1)) {
        paintableNeighbours.push([currentRow, currentColumn - 1]);
    }
    if (currentColumn < puzzle[0].length - 1 && isPaintableCell(currentRow, currentColumn + 1)) {
        paintableNeighbours.push([currentRow, currentColumn + 1]);
    }
    return paintableNeighbours;
}
