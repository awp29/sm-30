import { useEffect, useState } from "react";
import ClockIcon from "../../assets/icons/clock.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { GameState } from "../../gameSlice";

let intervalId: number;

const Timer = () => {
  const [time, setTime] = useState(0);

  const startTime = useSelector((state: RootState) => state.game.startTime);
  const gameState = useSelector((state: RootState) => state.game.gameState);
  const difficulty = useSelector((state: RootState) => state.game.difficulty);

  useEffect(() => {
    if (startTime === null) {
      setTime(0);
      return;
    }

    intervalId = setInterval(function () {
      const delta = Date.now() - startTime; // milliseconds elapsed since start
      const time = Math.floor(delta / 1000);
      setTime(time);
    }, 100);

    return () => clearInterval(intervalId);
  }, [startTime]);

  useEffect(() => {
    if (gameState === GameState.GameOver || gameState === GameState.Won) {
      clearInterval(intervalId);
    }
  }, [gameState]);

  useEffect(() => {
    clearInterval(intervalId);
  }, [difficulty.type]);

  return (
    <div className="flex gap-2 items-center">
      <ClockIcon />
      <span className="font-bold text-2xl text-[#000626] w-[50px]">
        {time.toString().padStart(3, "0")}
      </span>
    </div>
  );
};

export default Timer;
