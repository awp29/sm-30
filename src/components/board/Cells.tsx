import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaceState, updateFace } from "../../gameSlice";
import classNames from "classnames";
import { RootState } from "../../store";
import { DifficultyType } from "../../gameUtils";

const GRID_SIZE: { [key in DifficultyType]: string } = {
  [DifficultyType.Easy]: "grid-cols-[repeat(10,_minmax(0,_1fr))]",
  [DifficultyType.Intermediate]: "grid-cols-[repeat(16,_minmax(0,_1fr))]",
  [DifficultyType.Expert]: "grid-cols-[repeat(30,_minmax(0,_1fr))]",
};

interface Props {
  children: ReactNode;
}

const Cells = (props: Props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const difficulty = useSelector((state: RootState) => state.game.difficulty);

  return (
    <div
      className={classNames(
        GRID_SIZE[difficulty.type],
        "grid gap-1 row w-max m-auto"
      )}
      onMouseOut={() => {
        dispatch(updateFace(FaceState.Idle));
      }}
    >
      {children}
    </div>
  );
};

export default Cells;
