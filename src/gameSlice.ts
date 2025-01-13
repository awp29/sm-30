import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  calculateTouching,
  defaultDifficulty,
  generateCells,
  placeMines,
  selectEmptyCell,
  selectMineCell,
  selectTouchingCell,
} from "./gameUtils";

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

const cells = generateCells();
const cellsWithMines = placeMines(cells);
const cellsWithMinesAndTouching = calculateTouching(cellsWithMines);

export interface GameState {
  cells: Cell[][];
  flags: number;
}

const initialState: GameState = {
  cells: cellsWithMinesAndTouching,
  flags: defaultDifficulty.mines,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectCell: (
      state,
      action: PayloadAction<{ rowIndex: number; columnIndex: number }>
    ) => {
      const { rowIndex, columnIndex } = action.payload;
      const cell = state.cells[rowIndex][columnIndex];

      if (cell.flagged) return;

      switch (cell.type) {
        case CellType.Empty:
          selectEmptyCell(cell, state.cells);
          break;

        case CellType.Touching:
          selectTouchingCell(cell);
          break;

        case CellType.Mine:
          selectMineCell(cell);
          break;
      }
    },

    flagCell: (
      state,
      action: PayloadAction<{ rowIndex: number; columnIndex: number }>
    ) => {
      const { rowIndex, columnIndex } = action.payload;
      const cell = state.cells[rowIndex][columnIndex];

      if (!cell.flagged) {
        cell.flagged = true;
        state.flags--;
      } else {
        cell.flagged = false;
        state.flags++;
      }
    },
  },
});

export const { selectCell, flagCell } = gameSlice.actions;
export default gameSlice.reducer;
