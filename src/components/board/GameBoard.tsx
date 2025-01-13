import { ReactNode } from "react";
import Header from "./Header";
import Mines from "./Mines";

interface Props {
  children: ReactNode;
}

const GameBoard = (props: Props) => {
  const { children } = props;

  return <div className="mx-auto w-fit">{children}</div>;
};

GameBoard.Header = Header;
GameBoard.Mines = Mines;

export default GameBoard;
