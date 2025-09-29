import type { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
}

const varientColor = {
  primary: "bg-purple-500 text-purple-200",
  secondary: "bg-purple-100 text-purple-500",
};

export function Button({ varient, text, startIcon }: ButtonProps) {
  return (
    <button
      className={`${varientColor[varient]} font-normal rounded-lg px-3 py-2`}>
      <div className="flex items-center">
        <div className="mr-3">{startIcon}</div>
        {text}
      </div>
    </button>
  );
}
