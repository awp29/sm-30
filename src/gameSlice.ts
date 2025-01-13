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

export enum GameState {
  Playing,
  GameOver,
  Won,
}

export enum FaceState {
  Idle,
  Pressed,
  Worried,
  GameOver,
  Won,
}

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

export interface GameSliceState {
  gameState: GameState;
  faceState: FaceState;
  cells: Cell[][];
  flags: number;
  startTime: number | null;
}

const initialState: GameSliceState = {
  gameState: GameState.Playing,
  faceState: FaceState.Idle,
  cells: cellsWithMinesAndTouching,
  flags: defaultDifficulty.mines,
  startTime: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    newGame: () => {
      console.log("NEW GAME");
    },

    selectCell: (
      state,
      action: PayloadAction<{ rowIndex: number; columnIndex: number }>
    ) => {
      const { rowIndex, columnIndex } = action.payload;
      const cell = state.cells[rowIndex][columnIndex];

      if (cell.flagged) return;

      if (state.startTime === null) {
        state.startTime = Date.now();
      }

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

    updateFace: (state, action) => {
      if (
        state.gameState === GameState.GameOver ||
        state.gameState === GameState.Won
      ) {
        return;
      }

      state.faceState = action.payload;
    },
  },
});

export const { selectCell, flagCell, updateFace, newGame } = gameSlice.actions;
export default gameSlice.reducer;
