import { Cell } from "../../gameSlice";

interface Props {
  cell: Cell;
}

const TouchingCell = (props: Props) => {
  const { cell } = props;

  if (cell.visible) {
    return (
      <div
        className={`w-[40px] h-[40px] bg-[#D9CAB8] rounded-[4px] flex items-center justify-center`}
      >
        <span className="font-bold text-2xl">{cell.touching}</span>
      </div>
    );
  }

  return (
    <div className="bg-[#40341F] rounded-[4px]">
      <button
        className={`w-[40px] h-[40px] hover:bg-[#F07032] hover:opacity-90 rounded-[4px] flex items-center justify-center text-white`}
      >
        {/* {cell.flagged ? <Flag /> : null} */}
      </button>
    </div>
  );
};

export default TouchingCell;
