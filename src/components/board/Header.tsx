import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Header = (props: Props) => {
  const { children } = props;

  return (
    <div className="relative flex items-center bg-[#D9CAB8] mb-2 px-3 py-4 rounded-[4px] justify-between shadow-lg">
      {children}
    </div>
  );
};

export default Header;
