import { ReactNode } from "react";
import Title from "./Ttitle";
import Link from "./Link";
import Links from "./Links";

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
Nav.Link = Link;
Nav.Links = Links;

export default Nav;
