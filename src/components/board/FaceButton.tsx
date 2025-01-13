import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { FaceState, newGame, updateFace } from "../../gameSlice";

const FACE_TYPE = {
  0: "🙂",
  1: "😘",
  2: "😬",
  3: "😵",
  4: "😎",
};

const FaceButton = () => {
  const dispatch = useDispatch();
  const faceState = useSelector((state: RootState) => state.game.faceState);

  return (
    <div className="absolute flex left-0 right-0 justify-around">
      <button
        className="border-[#C5441F] border-2 rounded-[4px] bg-[#D9CAB8] text-2xl px-4 py-1 hover:bg-[#C5441F1A] active:bg-[#C5441F33] drop-shadow-md"
        onMouseDown={() => {
          dispatch(updateFace(FaceState.Pressed));
        }}
        onMouseUp={() => {
          dispatch(updateFace(FaceState.Idle));
        }}
        onMouseOut={() => {
          dispatch(updateFace(FaceState.Idle));
        }}
        onClick={() => {
          dispatch(newGame());
        }}
      >
        {FACE_TYPE[faceState]}
      </button>
    </div>
  );
};

export default FaceButton;
