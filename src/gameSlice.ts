import { createSlice } from "@reduxjs/toolkit";

export enum CellType {
  Empty,
  Touching,
  Mine,
}

export interface Cell {
  visible: boolean;
  type: CellType;
  touching: number;
  flagged: boolean;
  rowIndex: number;
  columnIndex: number;
}

const generateCells = (rows = 10, columns = 10) => {
  const cells: Cell[][] = [];
  for (let i = 0; i < rows; i++) {
    cells.push(new Array(columns));

    for (let j = 0; j < columns; j++) {
      cells[i][j] = {
        visible: true,
        type: CellType.Empty,
        touching: 0,
        flagged: false,
        rowIndex: i,
        columnIndex: j,
      };
    }
  }

  return cells;
};

const placeMines = (cells: Cell[][], mines = 10, rows = 10, columns = 10) => {
  let minesToPlace = mines;

  while (minesToPlace > 0) {
    const randomRowIndex = Math.floor(Math.random() * rows);
    const randomColumnIndex = Math.floor(Math.random() * columns);

    const cell = cells[randomRowIndex][randomColumnIndex];

    if (cell.type !== CellType.Mine) {
      cell.type = CellType.Mine;
      minesToPlace--;
    }
  }

  return [...cells];
};

const cells = generateCells();
const cellsWithMines = placeMines(cells);
console.log("cellsWithMines", cellsWithMines);

const initialState = {
  cells: cellsWithMines,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectCell: () => {
      console.log("select cell");
    },
  },
});

export const { selectCell } = gameSlice.actions;
export default gameSlice.reducer;
