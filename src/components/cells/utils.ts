import { DifficultyType } from "../../gameUtils";

export const CELL_SIZE: { [key in DifficultyType]: string } = {
  [DifficultyType.Easy]: "w-[40px] h-[40px]",
  [DifficultyType.Intermediate]: "w-[32px] h-[32px]",
  [DifficultyType.Expert]: "w-[28px] h-[28px]",
};
