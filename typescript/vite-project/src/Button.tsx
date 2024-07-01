import { MouseEventHandler } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLDivElement>;
  type?:string |undefined
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  onClick}) => (
  <div
    onClick={onClick}

  >
    <div>{children}</div>
  </div>
);