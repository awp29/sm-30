import classNames from "classnames";
import { useSelect, UseSelectSelectedItemChange } from "downshift";
import { Difficulty, DIFFICULTY_MAP } from "../../gameUtils";
import { useDispatch, useSelector } from "react-redux";
import { selectDifficulty } from "../../gameSlice";
import { RootState } from "../../store";
import { twMerge } from "tailwind-merge";
import ChevronDownIcon from "../../assets/icons/chevronDown.svg";
import ChevronUpIcon from "../../assets/icons/chevronUp.svg";

const DifficultySelect = () => {
  const difficulties = Object.values(DIFFICULTY_MAP);

  const dispatch = useDispatch();
  const selectedDifficulty = useSelector(
    (state: RootState) => state.game.difficulty
  );

  const handleSelectItem = (item: UseSelectSelectedItemChange<Difficulty>) => {
    const difficulty = item.selectedItem;
    dispatch(selectDifficulty(difficulty.type));
  };

  function Select() {
    const { isOpen, getToggleButtonProps, getMenuProps, getItemProps } =
      useSelect({
        onSelectedItemChange: handleSelectItem,
        items: difficulties,
      });

    return (
      <div>
        <label className="block text-[12px] font-bold text-[#000933A3] mb-2 font-mono">
          DIFFICULTY
        </label>
        <div className="w-72 flex flex-col gap-1 mb-[16px]">
          <div
            className="bg-white w-[160px] text-sm   h-[32px] rounded-[4px] py-2 cursor-pointer justify-between flex items-center px-3  shadow-sm"
            {...getToggleButtonProps()}
          >
            <span className="text-[#000626E3]">{selectedDifficulty.name}</span>
            {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </div>
        </div>
        <ul
          className={classNames(
            !isOpen && "hidden",
            "absolute z-10 bg-white w-[200px] rounded-[4px] py-2 shadow-sm"
          )}
          {...getMenuProps()}
        >
          {isOpen &&
            difficulties.map((item, index) => (
              <li
                className={twMerge(
                  "flex flex-col items-start border-l-4 border-transparent hover:bg-[#C5441F0D] hover:border-[#C5441F] px-3 py-4 w-full",
                  selectedDifficulty === item &&
                    "border-[#C5441F] bg-[#C5441F0D] border-l-4"
                )}
                key={item.name}
                {...getItemProps({ item, index })}
              >
                <span
                  className={twMerge(
                    "text-[#000626E3]",
                    selectedDifficulty === item && "font-semibold"
                  )}
                >
                  {item.name}
                </span>
                <span className="text-sm text-[#000933A3]">
                  {item.rows}x{item.columns} - {item.mines} mines
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  return <Select />;
};

export default DifficultySelect;
