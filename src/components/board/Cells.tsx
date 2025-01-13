import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { FaceState, updateFace } from "../../gameSlice";

interface Props {
  children: ReactNode;
}

const Cells = (props: Props) => {
  const { children } = props;

  const dispatch = useDispatch();

  return (
    <div
      className="grid grid-cols-[repeat(10,_minmax(0,_1fr))] gap-1 row w-max m-auto"
      onMouseOut={() => {
        dispatch(updateFace(FaceState.Idle));
      }}
    >
      {children}
    </div>
  );
};

export default Cells;
