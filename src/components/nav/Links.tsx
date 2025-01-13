import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Links = (props: Props) => {
  const { children } = props;

  return <div className="flex">{children}</div>;
};

export default Links;
