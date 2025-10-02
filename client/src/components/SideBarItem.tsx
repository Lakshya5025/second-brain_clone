import type { ReactElement } from "react";

interface SideBarItemPropType {
  name: string;
  logo: ReactElement;
  type: string;
  setVisibleContentType: (e: string) => void;
}

export function SideBarItem({
  name,
  logo,
  type,
  setVisibleContentType,
}: SideBarItemPropType) {
  return (
    <div
      onClick={() => setVisibleContentType(type)}
      className=" mx-1 mb-1 flex items-center text-black-500 p-3 font-medium box-content hover:bg-black-200 hover:cursor-pointer rounded-md">
      <div className="text-slate-950">
        <div>{logo}</div>
      </div>
      <div>
        <div className="ml-9 text-lg">{name}</div>
      </div>
    </div>
  );
}
