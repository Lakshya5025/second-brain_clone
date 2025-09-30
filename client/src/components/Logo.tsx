import { Scholar } from "../icons/Scholar";

export function Logo() {
  return (
    <div>
      <div className="flex items-center">
        <div className="text-xs text-purple-500">
          <Scholar />
        </div>
        <div className="ml-2 text-2xl font-bold">Brainly</div>
      </div>
    </div>
  );
}
