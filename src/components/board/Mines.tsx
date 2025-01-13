import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Mines = () => {
  const flags = useSelector((state: RootState) => state.game.flags);

  return (
    <div className="flex items-center">
      <div className="border-[#C5441F] border-4 rounded-full w-6 h-6" />
      <span className="font-bold text-2xl text-[#000626] pl-[6px]">
        {flags}
      </span>
    </div>
  );
};

export default Mines;
