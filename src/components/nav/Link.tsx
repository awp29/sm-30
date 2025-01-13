import { ReactNode } from "react";
import { NavLink } from "react-router";

interface Props {
  to: string;
  children: ReactNode;
}

const Link = (props: Props) => {
  const { to, children } = props;
  return (
    <NavLink
      end
      to={to}
      className={(linkProps) => {
        const { isActive } = linkProps;

        console.log("STYLE", linkProps);

        // AP-TODO: TIDY UP THIS IF
        if (isActive) {
          return "text-[#000626E3] h-[72px] flex items-center px-4 border-b-4 border-[#C5441F]";
        }
        return "text-[#000626E3] h-[72px] flex items-center px-4 border-b-4 border-transparent";
      }}
    >
      <span>{children}</span>
    </NavLink>
  );
};

export default Link;
