import { ReactNode } from "react";
import Title from "./Ttitle";

interface Props {
  children: ReactNode;
}

const Nav = (props: Props) => {
  const { children } = props;

  return (
    <nav className="h-[72px] px-[120px] flex items-center gap-[48px] border-b border-[#00116617]">
      {children}
    </nav>
  );
};

Nav.Title = Title;

export default Nav;
