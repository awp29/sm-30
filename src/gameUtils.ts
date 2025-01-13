import { Cell, CellType } from "./gameSlice";

export const defaultDifficulty = { rows: 10, columns: 10, mines: 10 };

export const generateCells = (difficulty = defaultDifficulty) => {
  const { rows, columns } = difficulty;

  const cells: Cell[][] = [];
  for (let i = 0; i < rows; i++) {
    cells.push(new Array(columns));

    for (let j = 0; j < columns; j++) {
      cells[i][j] = {
        visible: false,
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

export const placeMines = (cells: Cell[][], difficulty = defaultDifficulty) => {
  const { rows, columns, mines } = difficulty;
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

  return cells;
};

const checkForConnections = (
  rowIndex: number,
  columnIndex: number,
  cells: Cell[][],
  difficulty = defaultDifficulty
) => {
  const { rows, columns } = difficulty;

  if (rowIndex < 0 || rowIndex >= rows) return false;
  if (columnIndex < 0 || columnIndex >= columns) return false;
  if (cells[rowIndex][columnIndex].type !== CellType.Mine) return false;

  return true;
};

export const calculateTouching = (
  cells: Cell[][],
  difficulty = defaultDifficulty
) => {
  const { rows, columns } = defaultDifficulty;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = cells[i][j];

      if (cell.type === CellType.Mine) continue;

      // check for connections
      // 3 cells above
      if (checkForConnections(i - 1, j - 1, cells, difficulty)) cell.touching++;
      if (checkForConnections(i - 1, j, cells, difficulty)) cell.touching++;
      if (checkForConnections(i - 1, j + 1, cells, difficulty)) cell.touching++;

      // left cell and right cell
      if (checkForConnections(i, j - 1, cells, difficulty)) cell.touching++;
      if (checkForConnections(i, j + 1, cells, difficulty)) cell.touching++;

      // 3 cells below
      if (checkForConnections(i + 1, j - 1, cells, difficulty)) cell.touching++;
      if (checkForConnections(i + 1, j, cells, difficulty)) cell.touching++;
      if (checkForConnections(i + 1, j + 1, cells, difficulty)) cell.touching++;

      if (cell.touching > 0) {
        cell.type = CellType.Touching;
      }
    }
  }

  return cells;
};

const displayConnectedCells = (
  rowIndex: number,
  columnIndex: number,
  cells: Cell[][],
  difficulty = defaultDifficulty
) => {
  const { rows, columns } = difficulty;

  if (rowIndex < 0 || rowIndex >= rows) return;
  if (columnIndex < 0 || columnIndex >= columns) return;

  const cell = cells[rowIndex][columnIndex];

  if (cell.flagged) return;
  if (cell.visible) return;

  cell.visible = true;

  if (cell.type === CellType.Touching) return;

  // 3 cells above
  displayConnectedCells(rowIndex - 1, columnIndex - 1, cells, difficulty);
  displayConnectedCells(rowIndex - 1, columnIndex, cells, difficulty);
  displayConnectedCells(rowIndex - 1, columnIndex + 1, cells, difficulty);

  // left cell and right cell
  displayConnectedCells(rowIndex, columnIndex - 1, cells, difficulty);
  displayConnectedCells(rowIndex, columnIndex + 1, cells, difficulty);

  // 3 cells below
  displayConnectedCells(rowIndex + 1, columnIndex - 1, cells, difficulty);
  displayConnectedCells(rowIndex + 1, columnIndex, cells, difficulty);
  displayConnectedCells(rowIndex + 1, columnIndex + 1, cells, difficulty);
};

export const selectEmptyCell = (
  cell: Cell,
  cells: Cell[][],
  difficulty = defaultDifficulty
) => {
  displayConnectedCells(cell.rowIndex, cell.columnIndex, cells, difficulty);
};

export const selectTouchingCell = (cell: Cell) => {
  cell.visible = true;
};

export const selectMineCell = (cell: Cell) => {
  cell.visible = true;
};
