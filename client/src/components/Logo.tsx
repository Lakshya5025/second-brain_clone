import { Scholar } from "../icons/Scholar";

export function Logo({
  setVisibleContentType,
}: {
  setVisibleContentType: (e: string) => void;
}) {
  function onclickhandler() {
    setVisibleContentType("");
  }
  return (
    <div onClick={onclickhandler}>
      <div className="flex items-center">
        <div className="flex items-cener hover:cursor-pointer">
          <div className="text-xs text-purple-500 ">
            <Scholar />
          </div>
          <div className="ml-2 text-2xl font-bold">Brainly</div>
        </div>
      </div>
    </div>
  );
}
