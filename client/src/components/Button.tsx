import type { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  customCSS?: string;
  isActive?: boolean;
}

const varientColor = {
  primary: "bg-purple-500 text-purple-200",
  secondary: "bg-purple-100 text-purple-500",
};

const activeCSS = "bg-white border-2";
export function Button({
  varient,
  text,
  startIcon,
  onClick,
  isActive,
  customCSS,
}: ButtonProps) {
  let startIconStyle: string;
  if (startIcon) startIconStyle = "mr-3";
  else startIconStyle = "";

  return (
    <button
      onClick={onClick}
      className={` ${isActive ? activeCSS : ""} ${customCSS} ${
        varientColor[varient]
      }  font-normal rounded-lg px-3 py-2 hover:cursor-pointer hover:shadow-xl/3 hover:shadow-back-800`}>
      <div className="flex items-center">
        <div className={startIconStyle}>{startIcon}</div>
        {text}
      </div>
    </button>
  );
}
