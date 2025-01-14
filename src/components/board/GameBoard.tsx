import { ReactNode } from "react";
import Header from "./Header";
import Mines from "./Mines";
import Timer from "./Timer";
import FaceButton from "./FaceButton";
import Cells from "./Cells";

interface Props {
  children: ReactNode;
}

const GameBoard = (props: Props) => {
  const { children } = props;

  return <div className="mx-auto w-fit mt-[32px]">{children}</div>;
};

GameBoard.Header = Header;
GameBoard.Mines = Mines;
GameBoard.Timer = Timer;
GameBoard.FaceButton = FaceButton;
GameBoard.Cells = Cells;

export default GameBoard;
